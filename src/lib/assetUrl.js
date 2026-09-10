// Content-driven image paths (hero photo, event/project photos, uploaded
// faculty photo) are stored root-relative ("/uploads/xyz.jpg") since that's
// what the admin panel's upload endpoint returns. Route them through this so
// they still resolve once the site is served from a subpath — same reason
// Logo.jsx builds its own src off BASE_URL instead of a hard-coded "/".
export function assetUrl(imagePath) {
  if (!imagePath) return imagePath;
  if (/^https?:\/\//.test(imagePath)) return imagePath;
  const base = import.meta.env.BASE_URL;
  return imagePath.startsWith("/") ? base + imagePath.slice(1) : base + imagePath;
}

// Online database (Supabase). Visitors only ever READ the content row, with a
// plain fetch — the heavy client library is loaded lazily, for the admin only.
const url = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/+$/, "");
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const cloudEnabled = Boolean(url && anonKey);
export const CLOUD_URL = url;
export const CLOUD_ANON_KEY = anonKey;
export const UPLOAD_BUCKET = "uploads";

// -> { data, updated_at } or null when the database has no content saved yet.
export async function fetchCloudContent() {
  const res = await fetch(`${url}/rest/v1/site_content?id=eq.1&select=data,updated_at`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}`, Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Database read failed (${res.status})`);
  const rows = await res.json();
  return rows[0] ?? null;
}

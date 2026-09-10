// The TRS BVM mark and the BVM college seal are real brand assets — always
// rendered as-is from /brand, never redrawn, re-typeset, or recolored.
//
// Paths are built off BASE_URL (not a hard-coded leading "/") so they still
// resolve when the site is served from a subpath — the GitHub Pages preview
// at /TRS_Website/, and later the production deploy at /TRS/.
const base = import.meta.env.BASE_URL;

export function TrsLogo({ className = "h-9 w-auto" }) {
  return (
    <img
      src={`${base}brand/trs-logo.png`}
      alt="TRS BVM — Technology & Robotics Society"
      className={className}
      width={120}
      height={120}
    />
  );
}

export function BvmLogo({ className = "h-9 w-auto", dark = false }) {
  return (
    <img
      src={`${base}brand/${dark ? "bvm-college-logo-dark.png" : "bvm-college-logo.png"}`}
      alt="Birla Vishvakarma Mahavidyalaya, Vallabh Vidyanagar"
      className={className}
      width={120}
      height={120}
    />
  );
}

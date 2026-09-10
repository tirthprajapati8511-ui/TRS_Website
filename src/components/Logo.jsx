// The TRS BVM mark and the BVM college seal are real brand assets — always
// rendered as-is from /brand, never redrawn, re-typeset, or recolored.

export function TrsLogo({ className = "h-9 w-auto" }) {
  return (
    <img
      src="/brand/trs-logo.png"
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
      src={dark ? "/brand/bvm-college-logo-dark.png" : "/brand/bvm-college-logo.png"}
      alt="Birla Vishvakarma Mahavidyalaya, Vallabh Vidyanagar"
      className={className}
      width={120}
      height={120}
    />
  );
}

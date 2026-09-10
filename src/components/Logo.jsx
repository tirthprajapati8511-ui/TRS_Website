// The TRS BVM mark and the BVM college seal are real brand assets — always
// rendered as-is, never redrawn, re-typeset, or recolored. Which files get
// rendered is editable in /admin (Branding tab), not hard-coded here.
import { useContent } from "../lib/ContentContext";
import { useTheme } from "../lib/ThemeContext";
import { assetUrl } from "../lib/assetUrl";

export function TrsLogo({ className = "h-9 w-auto" }) {
  const { brand } = useContent();
  return (
    <img
      src={assetUrl(brand.trsLogo)}
      alt="TRS BVM — Technology & Robotics Society"
      className={className}
      width={120}
      height={120}
    />
  );
}

// The BVM seal has a solid (non-transparent) background, so the wrong
// variant shows as a visible white or black box depending on the theme —
// pick the one that matches the page's resolved theme automatically.
export function BvmLogo({ className = "h-9 w-auto" }) {
  const { brand } = useContent();
  const { resolvedTheme } = useTheme();
  const src = resolvedTheme === "dark" ? brand.bvmLogoDark : brand.bvmLogoLight;
  return (
    <img
      src={assetUrl(src)}
      alt="Birla Vishvakarma Mahavidyalaya, Vallabh Vidyanagar"
      className={className}
      width={120}
      height={120}
    />
  );
}

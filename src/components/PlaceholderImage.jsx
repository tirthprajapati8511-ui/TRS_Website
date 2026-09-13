import { ImageIcon } from "lucide-react";
import { assetUrl } from "../lib/assetUrl";

/**
 * Honest stand-in for a photo we don't have yet. Deliberately plain — a
 * muted tile with an icon, not a generated "robot" image standing in for
 * real event/project photography. Swap `src` in the content data once a
 * real photo exists; this never renders once that happens.
 *
 * Shows the full image rather than cropping it to fill the frame — event
 * "photos" are often a competition badge or logo (square, with text right
 * up to the edges), and cropping those to a fixed aspect ratio slices off
 * exactly the part that matters. Any empty space around a non-matching
 * image is filled with the same muted background as the placeholder state,
 * so it reads as intentional rather than as a bug.
 */
export default function PlaceholderImage({ src, alt = "", className = "", aspect = "aspect-[4/3]" }) {
  if (src) {
    return (
      <div className={`${aspect} w-full overflow-hidden bg-bg-elevated flex items-center justify-center`}>
        <img
          src={assetUrl(src)}
          alt={alt}
          className={`h-full w-full object-contain ${className}`}
        />
      </div>
    );
  }
  return (
    <div
      className={`${aspect} w-full flex flex-col items-center justify-center gap-2 bg-bg-elevated text-ink-faint ${className}`}
    >
      <ImageIcon size={22} strokeWidth={1.5} />
      <span className="mono-label text-[10px]">Image placeholder</span>
    </div>
  );
}

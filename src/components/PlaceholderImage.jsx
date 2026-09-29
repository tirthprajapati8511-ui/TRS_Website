import { ImageIcon } from "lucide-react";
import { assetUrl } from "../lib/assetUrl";

/**
 * Honest stand-in for a photo we don't have yet. Deliberately plain — a
 * muted tile with an icon, not a generated "robot" image standing in for
 * real event/project photography. Swap `src` in the content data once a
 * real photo exists; this never renders once that happens.
 *
 * Crops to fill the frame by default (`fit="cover"`) — real photos come in
 * every aspect ratio (portrait phone shots next to landscape ones), and
 * letting each one show at its own size looks far more inconsistent side by
 * side in a grid than a centred crop does. Pass `fit="contain"` for the rare
 * case where nothing can be cropped — a badge or logo with text right up to
 * the edges — which then letterboxes into the same muted background as the
 * empty-placeholder state instead.
 */
export default function PlaceholderImage({
  src,
  alt = "",
  className = "",
  aspect = "aspect-[4/3]",
  fit = "cover",
}) {
  if (src) {
    if (fit === "contain") {
      return (
        <div className={`${aspect} w-full overflow-hidden bg-bg-elevated flex items-center justify-center`}>
          <img src={assetUrl(src)} alt={alt} className={`h-full w-full object-contain ${className}`} />
        </div>
      );
    }
    return <img src={assetUrl(src)} alt={alt} className={`${aspect} w-full object-cover ${className}`} />;
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

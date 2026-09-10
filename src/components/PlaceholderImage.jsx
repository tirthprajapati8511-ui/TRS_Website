import { ImageIcon } from "lucide-react";

/**
 * Honest stand-in for a photo we don't have yet. Deliberately plain — a
 * muted tile with an icon, not a generated "robot" image standing in for
 * real event/project photography. Swap `src` in the content data once a
 * real photo exists; this never renders once that happens.
 */
export default function PlaceholderImage({ src, alt = "", className = "", aspect = "aspect-[4/3]" }) {
  if (src) {
    return <img src={src} alt={alt} className={`${aspect} w-full object-cover ${className}`} />;
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

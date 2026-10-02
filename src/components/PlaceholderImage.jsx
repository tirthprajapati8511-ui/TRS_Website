import { ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { assetUrl } from "../lib/assetUrl";

/**
 * Every photo slot is a 1:1 frame. The photo is shown whole (never cropped);
 * whatever space is left over is filled with a blurred, enlarged copy of the
 * same photo instead of a flat colour. With no `src` it renders a plain
 * placeholder tile.
 */
export default function PlaceholderImage({ src, alt = "", className = "", aspect = "aspect-square" }) {
  if (src) {
    const url = assetUrl(src);
    return (
      <div className={`relative ${aspect} w-full overflow-hidden bg-bg-elevated ${className}`}>
        <motion.img
          src={url}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl"
        />
        <motion.img
          src={url}
          alt={alt}
          initial={{ opacity: 0, scale: 1.07 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full object-contain"
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

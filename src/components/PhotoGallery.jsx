import { motion } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";
import { assetUrl } from "../lib/assetUrl";

// Each thumbnail opens the untouched original in a new tab rather than a JS
// lightbox, so there's no extra dependency for it.
export default function PhotoGallery({ photos }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
      {photos.map((photo, i) => (
        <motion.a
          key={i}
          href={assetUrl(photo)}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: Math.min(i, 10) * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="block rounded-lg overflow-hidden border border-line transition-shadow duration-300 hover:shadow-lg"
        >
          <PlaceholderImage
            src={photo}
            aspect="aspect-square"
            className="transition-transform duration-300 hover:scale-105"
          />
        </motion.a>
      ))}
    </div>
  );
}

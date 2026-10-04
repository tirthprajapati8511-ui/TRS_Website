import { useState } from "react";
import { motion } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";
import Lightbox from "./Lightbox";

// Thumbnails open a full-screen viewer with next/previous, swipe and keyboard
// support.
export default function PhotoGallery({ photos }) {
  const [current, setCurrent] = useState(null);

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
        {photos.map((photo, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Open photo ${i + 1} of ${photos.length}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: Math.min(i, 10) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="block cursor-zoom-in rounded-lg overflow-hidden border border-line transition-shadow duration-300 hover:shadow-lg"
          >
            <PlaceholderImage
              src={photo}
              aspect="aspect-square"
              className="transition-transform duration-300 hover:scale-105"
            />
          </motion.button>
        ))}
      </div>
      <Lightbox photos={photos} index={current} onClose={() => setCurrent(null)} onIndex={setCurrent} />
    </>
  );
}

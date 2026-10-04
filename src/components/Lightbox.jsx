import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { assetUrl } from "../lib/assetUrl";

const SWIPE = 70;

// Full-screen photo viewer. Rendered in a portal so no animated/transformed
// ancestor can shrink "fixed" to a box. Closes on Escape, the backdrop or
// the X; arrow keys, the side buttons and swiping move between photos.
export default function Lightbox({ photos, index, onClose, onIndex }) {
  const open = index !== null && index !== undefined;
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  const count = photos.length;

  const go = useCallback(
    (dir) => onIndex((index + dir + count) % count),
    [index, count, onIndex]
  );

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && count > 1) go(-1);
      else if (e.key === "ArrowRight" && count > 1) go(1);
      else if (e.key === "Tab") {
        const nodes = document.querySelectorAll("[data-lightbox] button, [data-lightbox] a");
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus?.();
    };
  }, [open, count, go, onClose]);

  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 cursor-pointer";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} of ${count}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 print:hidden"
        >
          <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-4 text-white">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[13px] tabular-nums backdrop-blur">
              {index + 1} / {count}
            </span>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <a
                href={assetUrl(photos[index])}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the original photo in a new tab"
                className={btn}
              >
                <ExternalLink size={18} />
              </a>
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo viewer" className={btn}>
                <X size={20} />
              </button>
            </div>
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className={`${btn} absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex`}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className={`${btn} absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex`}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={index}
              src={assetUrl(photos[index])}
              alt=""
              drag={count > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE) go(1);
                else if (info.offset.x > SWIPE) go(-1);
              }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[82vh] max-w-[94vw] select-none rounded-md object-contain shadow-2xl"
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

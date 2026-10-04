import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin "power rail" across the very top edge that fills with scroll
 * progress — doubles as an actual progress indicator, not pure decoration.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="print:hidden fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-accent via-accent-dim to-accent"
    />
  );
}

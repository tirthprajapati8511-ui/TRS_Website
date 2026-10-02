import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function SectionHeader({ title, viewAllHref, viewAllLabel = "View all" }) {
  return (
    <Reveal className="flex items-center justify-between gap-4 mb-6">
      <h2 className="relative pl-3.5 font-display text-xl sm:text-2xl font-semibold text-ink">
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 top-1 bottom-1 w-1 origin-top bg-accent"
        />
        {title}
      </h2>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="inline-flex items-center gap-1 text-[13px] font-medium text-accent hover:text-accent-dim transition-colors shrink-0"
        >
          {viewAllLabel}
          <ArrowRight size={14} strokeWidth={2.25} />
        </Link>
      )}
    </Reveal>
  );
}

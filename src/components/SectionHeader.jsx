import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function SectionHeader({ title, viewAllHref, viewAllLabel = "View all" }) {
  return (
    <Reveal className="flex items-center justify-between gap-4 mb-6">
      <h2 className="relative pl-3.5 font-display text-xl sm:text-2xl font-semibold text-ink before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-accent">
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

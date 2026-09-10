import { GraduationCap } from "lucide-react";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { useContent } from "../lib/ContentContext";

export default function WorkshopsPreview() {
  const { workshops } = useContent();
  if (!workshops.items.length) return null;

  return (
    <Reveal className="mt-8 rounded-lg border border-line bg-bg-muted p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <GraduationCap size={20} strokeWidth={2} />
        </span>
        <div className="flex-1 min-w-0">
          <span className="mono-label text-[10.5px] text-ink-faint">Workshops</span>
          {workshops.items.map((w) => (
            <div key={w.id} className="mt-1">
              <span className="font-display text-[15px] font-semibold text-ink">{w.title}</span>
              <span className="ml-2 text-[12.5px] text-ink-faint">{w.dateLabel}</span>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-dim">{w.description}</p>
            </div>
          ))}
        </div>
        <Button
          href={workshops.items[0].formHref || "/workshops"}
          variant="outline"
          size="sm"
          className="shrink-0"
        >
          {workshops.items[0].formHref ? "Register" : "View Workshops"}
        </Button>
      </div>
    </Reveal>
  );
}

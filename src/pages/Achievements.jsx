import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ChevronDown, Trophy } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PlaceholderImage from "../components/PlaceholderImage";
import PhotoGallery from "../components/PhotoGallery";
import { useContent } from "../lib/ContentContext";
import { assetUrl } from "../lib/assetUrl";

function YearSection({ entry, index, open, onToggle }) {
  return (
    <Reveal delay={index * 0.06} className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
      >
        <span className="flex items-baseline gap-3">
          <h2 className="font-display text-xl font-semibold text-ink">{entry.year}</h2>
          <span className="mono-label text-[11px] text-ink-faint">
            {entry.items.length} {entry.items.length === 1 ? "result" : "results"}
          </span>
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-ink-dim transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
      {entry.items.length > 0 ? (
        <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {entry.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col rounded-lg border border-line bg-bg-panel overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
            >
              {item.image && (
                <PlaceholderImage src={item.image} alt={item.title} />
              )}
              <div className="flex gap-3.5 p-5">
                <Trophy size={18} strokeWidth={2} className="shrink-0 mt-0.5 text-accent transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
                <div>
                  <h3 className="font-display text-[15px] font-semibold text-ink">{item.title}</h3>
                  {item.detail && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-dim">{item.detail}</p>
                  )}
                </div>
              </div>
              {item.video && (
                <div className="px-5 pb-5">
                  <video
                    src={assetUrl(item.video)}
                    controls
                    className="w-full rounded border border-line"
                  />
                </div>
              )}
              {item.gallery?.length > 0 && (
                <div className="px-5 pb-5">
                  <PhotoGallery photos={item.gallery} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="pt-4 text-[13.5px] text-ink-faint">Nothing recorded for this year yet.</p>
      )}
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export default function Achievements() {
  const { achievements } = useContent();
  // The newest year that has results is open by default, the rest collapsed.
  // Only the viewer's clicks are stored (as flips from that default), so it
  // stays correct when content finishes loading after the first render.
  const currentYear = achievements.archive.find((e) => e.items.length > 0)?.year;
  const [flipped, setFlipped] = useState(() => new Set());
  const isOpen = (year) => (year === currentYear) !== flipped.has(year);
  const toggleYear = (year) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });

  return (
    <section className="bg-bg py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">Achievements</span>
          <h1 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl font-semibold text-ink leading-tight">
            Results, by academic year
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">
            {achievements.description}
          </p>
        </Reveal>

        {achievements.archive.length > 0 ? (
          <div className="mt-12">
            {achievements.archive.map((entry, i) => (
              <YearSection
                key={entry.year}
                entry={entry}
                index={i}
                open={isOpen(entry.year)}
                onToggle={() => toggleYear(entry.year)}
              />
            ))}
          </div>
        ) : (
          <Reveal
            delay={0.08}
            className="mt-12 flex flex-col items-center gap-3 rounded-lg border border-dashed border-line py-16 text-center"
          >
            <Award size={28} strokeWidth={1.5} className="text-ink-faint" />
            <p className="text-[14px] text-ink-faint max-w-sm">
              The achievements archive hasn't been added yet — check back soon.
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

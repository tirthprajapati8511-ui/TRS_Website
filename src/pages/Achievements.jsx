import { useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ChevronDown, Printer, Search, Trophy, X } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PlaceholderImage from "../components/PlaceholderImage";
import PhotoGallery from "../components/PhotoGallery";
import { useContent } from "../lib/ContentContext";
import { assetUrl } from "../lib/assetUrl";

const ease = [0.16, 1, 0.3, 1];

function itemMatches(item, query) {
  const hay = `${item.title} ${item.detail ?? ""}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
}

// Quick-filter chips: the competition name from each title ("GUJCOST
// Robofest 5.0 — First Runner-up" becomes "Robofest"), for names that
// show up more than once.
function deriveChips(archive) {
  const counts = new Map();
  for (const entry of archive) {
    for (const item of entry.items) {
      const name = item.title
        .split(/\s[—–-]\s/)[0]
        .replace(/gujcost/i, "")
        .replace(/['’]?\d+(\.\d+)?/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (!name) continue;
      const key = name.toLowerCase();
      const prev = counts.get(key);
      counts.set(key, { label: prev?.label ?? name, n: (prev?.n ?? 0) + 1 });
    }
  }
  return [...counts.values()]
    .filter((c) => c.n >= 2)
    .sort((a, b) => b.n - a.n)
    .slice(0, 6)
    .map((c) => c.label);
}

function ItemCard({ item, index, instant }) {
  return (
    <motion.div
      initial={instant ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.05, ease }}
      className="group flex flex-col break-inside-avoid rounded-lg border border-line bg-bg-panel shadow-sm overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
    >
      {item.image && <PlaceholderImage src={item.image} alt={item.title} />}
      <div className="flex gap-3.5 p-5">
        <Trophy
          size={18}
          strokeWidth={2}
          className="shrink-0 mt-0.5 text-accent transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125"
        />
        <div>
          <h3 className="font-display text-[15px] font-semibold text-ink">{item.title}</h3>
          {item.detail && <p className="mt-1.5 text-[13px] leading-relaxed text-ink-dim">{item.detail}</p>}
        </div>
      </div>
      {item.video && (
        <div className="px-5 pb-5 print:hidden">
          <video src={assetUrl(item.video)} controls className="w-full rounded border border-line" />
        </div>
      )}
      {item.gallery?.length > 0 && (
        <div className="px-5 pb-5 print:hidden">
          <PhotoGallery photos={item.gallery} />
        </div>
      )}
    </motion.div>
  );
}

function YearBody({ entry, instant }) {
  if (entry.items.length === 0) {
    return <p className="pt-4 text-[13.5px] text-ink-faint">Nothing recorded for this year yet.</p>;
  }
  return (
    <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {entry.items.map((item, i) => (
        <ItemCard key={i} item={item} index={i} instant={instant} />
      ))}
    </div>
  );
}

function YearSection({ entry, index, open, onToggle, printing }) {
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
          className={`shrink-0 text-ink-dim transition-transform duration-300 print:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>

      {printing ? (
        <YearBody entry={entry} instant />
      ) : (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="overflow-hidden"
            >
              <YearBody entry={entry} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Reveal>
  );
}

export default function Achievements() {
  const { achievements } = useContent();
  const [query, setQuery] = useState("");
  const [flipped, setFlipped] = useState(() => new Set());
  const [printing, setPrinting] = useState(false);

  // Printing (the button or Ctrl+P) expands every year first.
  useEffect(() => {
    const before = () => flushSync(() => setPrinting(true));
    const after = () => setPrinting(false);
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  const q = query.trim();
  const chips = useMemo(() => deriveChips(achievements.archive), [achievements.archive]);
  const visible = useMemo(() => {
    if (!q) return achievements.archive;
    return achievements.archive
      .map((e) => ({ ...e, items: e.items.filter((it) => itemMatches(it, q)) }))
      .filter((e) => e.items.length > 0);
  }, [achievements.archive, q]);
  const matchCount = visible.reduce((sum, e) => sum + e.items.length, 0);

  // Default: the newest year with results is open, the rest collapsed. While
  // searching, every year with a match is open. Only the viewer's clicks are
  // stored (as flips from that default), so it stays correct when content
  // finishes loading after the first render.
  const currentYear = achievements.archive.find((e) => e.items.length > 0)?.year;
  const isOpen = (year) => printing || (q ? true : year === currentYear) !== flipped.has(year);
  const toggleYear = (year) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });

  return (
    <section className="bg-bg page-glow py-10 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">Achievements</span>
          <h1 className="mt-3 max-w-2xl font-display text-[26px] sm:text-4xl font-semibold text-ink leading-tight">
            Results, by academic year
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">{achievements.description}</p>
        </Reveal>

        {achievements.archive.length > 0 ? (
          <>
            <Reveal delay={0.05} className="mt-8 print:hidden">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <label className="relative block flex-1 max-w-md">
                  <span className="sr-only">Search achievements</span>
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                  />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search results, e.g. robofest winner"
                    className="w-full rounded-md border border-line-strong bg-bg-panel py-2.5 pl-10 pr-10 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-ink-faint hover:text-ink cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  )}
                </label>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:border-accent hover:text-accent cursor-pointer"
                >
                  <Printer size={15} />
                  Print / Save as PDF
                </button>
              </div>

              {chips.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Quick filters">
                  {chips.map((chip) => {
                    const active = q.toLowerCase() === chip.toLowerCase();
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setQuery(active ? "" : chip)}
                        aria-pressed={active}
                        className={`rounded-full border px-3 py-1 text-[12.5px] transition-colors cursor-pointer ${
                          active
                            ? "border-accent bg-accent text-on-accent"
                            : "border-line-strong text-ink-dim hover:border-accent hover:text-accent"
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              )}

              <p className="mt-3 min-h-5 text-[12.5px] text-ink-dim" aria-live="polite">
                {q ? `${matchCount} ${matchCount === 1 ? "result" : "results"} for “${q}”` : ""}
              </p>
            </Reveal>

            {visible.length > 0 ? (
              <div className="mt-4">
                {visible.map((entry, i) => (
                  <YearSection
                    key={entry.year}
                    entry={entry}
                    index={i}
                    open={isOpen(entry.year)}
                    onToggle={() => toggleYear(entry.year)}
                    printing={printing}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-lg border border-dashed border-line py-12 text-center text-[14px] text-ink-faint">
                Nothing matches &ldquo;{q}&rdquo;. Try a shorter word, like the competition name.
              </p>
            )}
          </>
        ) : (
          <Reveal
            delay={0.08}
            className="mt-8 sm:mt-12 flex flex-col items-center gap-3 rounded-lg border border-dashed border-line py-16 text-center"
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

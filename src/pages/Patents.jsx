import { FileBadge, Calendar, ExternalLink, Users } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PlaceholderImage from "../components/PlaceholderImage";
import StatusPill from "../components/StatusPill";
import Lightbox from "../components/Lightbox";
import { useState } from "react";
import { useContent } from "../lib/ContentContext";
import { safeUrl } from "../lib/safeUrl";

function patentTone(status) {
  const s = String(status ?? "").toLowerCase();
  if (/(issued|granted)/.test(s)) return "good";
  return "accent";
}

function PatentCard({ patent: p, index, onOpenImage }) {
  const link = safeUrl(p.link);
  return (
    <Reveal
      delay={Math.min(index, 6) * 0.06}
      className="flex flex-col overflow-hidden rounded-lg border border-line bg-bg-panel shadow-sm"
    >
      {p.image && (
        <button
          type="button"
          onClick={onOpenImage}
          aria-label={`Open the certificate for ${p.title}`}
          className="relative block cursor-zoom-in"
        >
          <PlaceholderImage src={p.image} alt={`${p.title} certificate`} aspect="aspect-[4/3]" />
        </button>
      )}
      <div className="flex flex-1 flex-col p-6">
        <StatusPill tone={patentTone(p.status)} className="self-start">
          {p.status}
        </StatusPill>
        <h2 className="mt-3 font-display text-[17px] font-semibold text-ink">{p.title}</h2>
        {p.number && <p className="mono-label mt-1.5 text-[11.5px] text-accent">{p.number}</p>}
        <div className="mt-3 space-y-1.5 text-[13px] text-ink-dim">
          {p.dateLabel && (
            <p className="flex items-center gap-1.5">
              <Calendar size={13} strokeWidth={2} className="shrink-0 text-ink-faint" />
              {p.dateLabel}
            </p>
          )}
          {p.inventors && (
            <p className="flex items-start gap-1.5">
              <Users size={13} strokeWidth={2} className="mt-0.5 shrink-0 text-ink-faint" />
              {p.inventors}
            </p>
          )}
        </div>
        {p.description && <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-dim">{p.description}</p>}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 self-start text-[13px] font-medium text-accent hover:text-accent-dim hover:underline underline-offset-4"
          >
            View record
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </Reveal>
  );
}

export default function Patents() {
  const { patents } = useContent();
  const [open, setOpen] = useState(null);
  const withImages = patents.items.map((p) => p.image).filter(Boolean);
  const issued = patents.items.filter((p) => patentTone(p.status) === "good").length;

  return (
    <section className="bg-bg page-glow py-10 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">Patents</span>
          <h1 className="mt-3 max-w-2xl font-display text-[26px] sm:text-4xl font-semibold text-ink leading-tight">
            {patents.heading}
          </h1>
          {patents.description && (
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">{patents.description}</p>
          )}
          {issued > 0 && (
            <p className="mt-4 inline-block rounded-full bg-good-soft px-3.5 py-1.5 text-[13px] font-medium text-good">
              {issued} {issued === 1 ? "patent" : "patents"} issued
            </p>
          )}
        </Reveal>

        {patents.items.length > 0 ? (
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {patents.items.map((p, i) => (
              <PatentCard
                key={p.id}
                patent={p}
                index={i}
                onOpenImage={() => setOpen(withImages.indexOf(p.image))}
              />
            ))}
          </div>
        ) : (
          <Reveal
            delay={0.08}
            className="mt-8 sm:mt-12 flex flex-col items-center gap-3 rounded-lg border border-dashed border-line py-16 px-6 text-center"
          >
            <FileBadge size={28} strokeWidth={1.5} className="text-ink-faint" />
            <p className="max-w-sm text-[14px] text-ink-faint">
              Patent details haven't been added yet — check back soon.
            </p>
          </Reveal>
        )}
      </Container>
      <Lightbox photos={withImages} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}

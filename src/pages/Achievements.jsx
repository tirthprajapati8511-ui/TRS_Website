import { Award, Trophy } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PlaceholderImage from "../components/PlaceholderImage";
import PhotoGallery from "../components/PhotoGallery";
import { useContent } from "../lib/ContentContext";

function YearSection({ entry, index }) {
  return (
    <Reveal delay={index * 0.06} className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl font-semibold text-ink">{entry.year}</h2>

      {entry.items.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {entry.items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col rounded-lg border border-line bg-bg-panel overflow-hidden"
            >
              {item.image && (
                <PlaceholderImage src={item.image} alt={item.title} aspect="aspect-[16/9]" />
              )}
              <div className="flex gap-3.5 p-5">
                <Trophy size={18} strokeWidth={2} className="shrink-0 mt-0.5 text-accent" />
                <div>
                  <h3 className="font-display text-[15px] font-semibold text-ink">{item.title}</h3>
                  {item.detail && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-dim">{item.detail}</p>
                  )}
                </div>
              </div>
              {item.gallery?.length > 0 && (
                <div className="px-5 pb-5">
                  <PhotoGallery photos={item.gallery} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-[13.5px] text-ink-faint">Nothing recorded for this year yet.</p>
      )}
    </Reveal>
  );
}

export default function Achievements() {
  const { achievements } = useContent();

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
              <YearSection key={entry.year} entry={entry} index={i} />
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

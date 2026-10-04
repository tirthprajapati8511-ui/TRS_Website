import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import StatValue from "../components/CountUp";
import { useContent } from "../lib/ContentContext";
import { deriveStats } from "../lib/stats";

function InfoList({ title, items }) {
  if (!items?.length) return null;
  return (
    <Reveal className="rounded-lg border border-line bg-bg-panel shadow-sm p-6">
      <h3 className="font-display text-[15px] font-semibold text-ink">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-[13.5px] leading-snug text-ink-dim">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function Explore() {
  const { explore, achievements } = useContent();
  const stats = [...deriveStats(achievements.archive), ...(explore.stats ?? [])];
  const milestones = achievements.archive.filter((e) => e.items.length > 0);

  return (
    <section className="bg-bg page-glow py-10 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">{explore.eyebrow}</span>
          <h1 className="mt-3 max-w-3xl font-display text-[26px] sm:text-4xl lg:text-5xl font-semibold text-ink leading-tight">
            {explore.heading}
          </h1>
          {explore.motto && (
            <p className="mt-5 inline-block rounded-full bg-accent-soft px-3.5 py-1.5 mono-label text-[11px] text-accent-dim">
              {explore.motto}
            </p>
          )}
        </Reveal>

        {explore.about?.length > 0 && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-5 max-w-5xl">
            {explore.about.map((para, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-[15px] leading-relaxed text-ink-dim">{para.text}</p>
              </Reveal>
            ))}
          </div>
        )}

        {stats.length > 0 && (
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-lg border border-line bg-line">
            {stats.map((s, i) => (
              <Reveal key={`${s.label}-${i}`} delay={i * 0.06} className="bg-bg-panel p-6 text-center">
                <p className="font-display text-[26px] sm:text-4xl font-semibold text-accent">
                  <StatValue value={s.value} />
                </p>
                <p className="mt-1.5 text-[13px] text-ink-dim">{s.label}</p>
              </Reveal>
            ))}
          </div>
        )}

        {explore.whatWeDo?.length > 0 && (
          <div className="mt-12 sm:mt-20">
            <SectionHeader title="What we do" />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {explore.whatWeDo.map((item, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <Link
                    to={item.href || "/"}
                    className="group flex h-full flex-col rounded-lg border border-line bg-bg-panel shadow-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
                  >
                    <span className="mono-label text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 font-display text-[16px] font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-dim">{item.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-accent">
                      Explore
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {(explore.domains?.length > 0 || explore.facilities?.length > 0) && (
          <div className="mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5">
            <InfoList title="What we build" items={explore.domains} />
            <InfoList title="Lab and facilities" items={explore.facilities} />
          </div>
        )}

        {milestones.length > 0 && (
          <div className="mt-12 sm:mt-20">
            <SectionHeader title="Milestones" viewAllHref="/achievements" viewAllLabel="Full archive" />
            <ol className="relative ml-2 border-l border-line">
              {milestones.map((entry, i) => (
                <Reveal key={entry.year} as="li" delay={Math.min(i, 6) * 0.05} className="relative pb-8 pl-7 last:pb-0">
                  <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-display text-[16px] font-semibold text-ink">{entry.year}</h3>
                    <span className="mono-label text-[11px] text-ink-faint">
                      {entry.items.length} {entry.items.length === 1 ? "result" : "results"}
                    </span>
                  </div>
                  <p className="mt-1 max-w-2xl text-[13.5px] leading-relaxed text-ink-dim">
                    {entry.items[0].title}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        )}

        <Reveal className="mt-12 sm:mt-20 rounded-lg bg-navy text-on-navy p-8 sm:p-10 text-center">
          <h2 className="font-display text-xl sm:text-2xl font-semibold">{explore.ctaHeading}</h2>
          <p className="mt-2.5 max-w-md mx-auto text-[13.5px] leading-relaxed text-on-navy-dim">
            {explore.ctaDescription}
          </p>
          <Button href={explore.ctaHref} variant="primary" size="sm" className="mt-5">
            {explore.ctaLabel}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

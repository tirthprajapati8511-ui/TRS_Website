import Container from "../components/Container";
import Reveal from "../components/Reveal";
import StatValue from "../components/CountUp";
import { useContent } from "../lib/ContentContext";
import { deriveStats } from "../lib/stats";

// A row of live numbers overlapping the bottom edge of the hero photo.
export default function HeroStats() {
  const { achievements } = useContent();
  const stats = deriveStats(achievements.archive);
  if (stats.length === 0) return null;

  return (
    <div className="relative z-10 -mt-8 sm:-mt-10 print:hidden">
      <Container>
        <Reveal
          delay={0.1}
          className="mx-auto grid max-w-3xl grid-cols-3 divide-x divide-line overflow-hidden rounded-xl border border-line bg-bg-panel shadow-xl"
        >
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-4 text-center sm:px-6 sm:py-5">
              <p className="font-display text-2xl font-semibold text-accent sm:text-4xl">
                <StatValue value={s.value} />
              </p>
              <p className="mt-1 text-[11px] leading-snug text-ink-dim sm:text-[13px]">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </div>
  );
}

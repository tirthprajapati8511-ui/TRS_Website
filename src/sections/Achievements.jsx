import { Award } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { useContent } from "../lib/ContentContext";

export default function Achievements() {
  const { achievements } = useContent();

  return (
    <section id="achievements" className="bg-bg-muted py-16 lg:py-20 border-b border-line">
      <Container>
        <SectionHeader title="Achievements" viewAllHref="/achievements" />
        <Reveal delay={0.05} className="max-w-2xl -mt-3 mb-6 text-[13.5px] leading-relaxed text-ink-dim">
          {achievements.description}
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {achievements.recent.map((item, i) => (
            <Reveal
              key={`${item.title}-${i}`}
              delay={0.1 + i * 0.06}
              className="group flex gap-3.5 rounded-lg border border-line bg-bg-panel p-5 transition-all duration-300 hover:border-accent/50 hover:shadow-md"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-on-accent group-hover:rotate-12">
                <Award size={16} strokeWidth={2} />
              </span>
              <div>
                <span className="mono-label text-[10px] text-ink-faint">{item.year}</span>
                <h3 className="mt-1 font-display text-[15px] font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-dim">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Users, Wrench, Trophy, Lightbulb, Network } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import { FEATURES } from "../lib/defaultContent";

const ICONS = { users: Users, tool: Wrench, trophy: Trophy, lightbulb: Lightbulb, network: Network };

// Icons that read better with a small rotation on hover (moving parts) vs.
// a plain scale (everything else).
const SPINS = new Set(["tool", "network"]);

export default function FeatureStrip() {
  return (
    <section className="bg-bg border-b border-line" aria-label="Why TRS">
      <Container className="relative">
        {/* A circuit trace linking the five nodes — one purposeful,
            restrained nod to the "robotics" theme, not a page-wide motif. */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute left-[10%] right-[10%] top-[52px] h-[2px] circuit-trace opacity-50"
        />

        <div className="relative grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-line">
          {FEATURES.map(({ icon, title, desc }, i) => {
            const Icon = ICONS[icon];
            return (
              <Reveal
                key={title}
                delay={i * 0.05}
                className="group flex flex-col items-center text-center gap-2.5 px-4 py-8"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-on-accent ${
                    SPINS.has(icon) ? "group-hover:rotate-[20deg]" : "group-hover:scale-110"
                  }`}
                >
                  {Icon && <Icon size={18} strokeWidth={2} />}
                </span>
                <span className="font-display text-[14px] font-semibold text-ink">{title}</span>
                <span className="text-[12.5px] leading-snug text-ink-dim">{desc}</span>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

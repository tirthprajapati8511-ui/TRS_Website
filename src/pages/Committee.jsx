import { useState } from "react";
import { Users } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import MemberCard from "../components/MemberCard";
import { useContent } from "../lib/ContentContext";

export default function Committee() {
  const { committee } = useContent();
  const past = (committee.past ?? []).filter((p) => p.year);
  const currentYear = committee.year || "Current";
  const tabs = [{ key: "current", label: currentYear }, ...past.map((p, i) => ({ key: `past-${i}`, label: p.year }))];

  const [selected, setSelected] = useState("current");
  const active = tabs.some((t) => t.key === selected) ? selected : "current";
  const entry = active === "current" ? committee : past[Number(active.split("-")[1])];
  const members = entry.members ?? [];

  return (
    <section className="bg-bg page-glow py-10 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">Executive Committee</span>
          <h1 className="mt-3 max-w-2xl font-display text-[26px] sm:text-4xl font-semibold text-ink leading-tight">
            The people behind TRS BVM
          </h1>
          {entry.intro && (
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">{entry.intro}</p>
          )}
        </Reveal>

        {tabs.length > 1 && (
          <Reveal delay={0.05} className="mt-8" >
            <div role="group" aria-label="Choose an academic year" className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setSelected(t.key)}
                  aria-pressed={active === t.key}
                  className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors cursor-pointer ${
                    active === t.key
                      ? "border-accent bg-accent text-on-accent"
                      : "border-line-strong text-ink-dim hover:border-accent hover:text-accent"
                  }`}
                >
                  {t.label}
                  {t.key === "current" && <span className="ml-1.5 text-[11px] opacity-80">(current)</span>}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {members.length > 0 ? (
          <div
            key={active}
            className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {members.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        ) : (
          <Reveal
            delay={0.08}
            className="mt-8 sm:mt-12 flex flex-col items-center gap-3 rounded-lg border border-dashed border-line py-16 text-center"
          >
            <Users size={28} strokeWidth={1.5} className="text-ink-faint" />
            <p className="text-[14px] text-ink-faint max-w-sm">
              Executive Committee members haven't been added yet — check back soon.
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

import { Users } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import MemberCard from "../components/MemberCard";
import { useContent } from "../lib/ContentContext";

export default function Committee() {
  const { committee } = useContent();

  return (
    <section className="bg-bg page-glow py-10 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">Executive Committee</span>
          <h1 className="mt-3 max-w-2xl font-display text-[26px] sm:text-4xl font-semibold text-ink leading-tight">
            The people behind TRS BVM
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">{committee.intro}</p>
        </Reveal>

        {committee.members.length > 0 ? (
          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {committee.members.map((member, i) => (
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

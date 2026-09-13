import { Mail, UserRound, Users } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import { LinkedIn } from "../components/SocialIcons";
import { useContent } from "../lib/ContentContext";
import { assetUrl } from "../lib/assetUrl";

function MemberCard({ member, index }) {
  return (
    <Reveal
      delay={index * 0.05}
      className="flex flex-col items-center text-center rounded-lg border border-line bg-bg-panel p-6"
    >
      {member.photo ? (
        <img
          src={assetUrl(member.photo)}
          alt={member.name}
          className="h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-bg-elevated text-ink-faint">
          <UserRound size={34} strokeWidth={1.5} />
        </span>
      )}

      <p className="mt-4 font-display text-[16px] font-semibold text-ink">{member.name}</p>
      {member.role && <p className="mt-1 text-[13px] font-medium text-accent">{member.role}</p>}
      {member.branch && (
        <p className="mt-1 text-[12.5px] text-ink-faint leading-snug">
          {member.branch.split(",").map((part, i) => (
            <span key={i} className="block">
              {part.trim()}
            </span>
          ))}
        </p>
      )}

      {(member.email || member.linkedin) && (
        <div className="mt-3 flex items-center gap-3">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="text-ink-faint hover:text-accent transition-colors"
            >
              <Mail size={15} strokeWidth={2} />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              aria-label={`${member.name} on LinkedIn`}
              className="text-ink-faint hover:text-accent transition-colors"
            >
              <LinkedIn size={15} strokeWidth={2} />
            </a>
          )}
        </div>
      )}
    </Reveal>
  );
}

export default function Committee() {
  const { committee, faculty } = useContent();

  return (
    <section className="bg-bg py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">Executive Committee</span>
          <h1 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl font-semibold text-ink leading-tight">
            The people behind TRS BVM
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">{committee.intro}</p>
        </Reveal>

        {committee.members.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {committee.members.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        ) : (
          <Reveal
            delay={0.08}
            className="mt-12 flex flex-col items-center gap-3 rounded-lg border border-dashed border-line py-16 text-center"
          >
            <Users size={28} strokeWidth={1.5} className="text-ink-faint" />
            <p className="text-[14px] text-ink-faint max-w-sm">
              Executive Committee members haven't been added yet — check back soon.
            </p>
          </Reveal>
        )}

        {faculty.members.length > 0 && (
          <div className="mt-16 pt-12 border-t border-line">
            <Reveal>
              <span className="mono-label text-[11px] text-accent">Faculty Members</span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
                Guiding the society
              </h2>
              <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-ink-dim">{faculty.intro}</p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {faculty.members.map((member, i) => (
                <MemberCard key={member.id} member={member} index={i} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

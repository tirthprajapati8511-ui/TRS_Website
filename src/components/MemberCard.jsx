import { Mail, UserRound } from "lucide-react";
import Reveal from "./Reveal";
import { LinkedIn } from "./SocialIcons";
import { assetUrl } from "../lib/assetUrl";

// Shared between the Executive Committee and Faculty Members pages — same
// card shape (photo, name, role, optional branch/year, contact links) for
// both a student and a faculty entry.
export default function MemberCard({ member, index }) {
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

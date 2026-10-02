import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, UserRound } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PlaceholderImage from "../components/PlaceholderImage";
import PhotoGallery from "../components/PhotoGallery";
import Button from "../components/Button";
import ContactLink from "../components/ContactLink";
import StatusPill from "../components/StatusPill";
import { assetUrl } from "../lib/assetUrl";
import { safeUrl } from "../lib/safeUrl";
import { useContent } from "../lib/ContentContext";

// Type A (multi-team): each team stands alone with its own category/leader.
function TeamHeading({ team, children }) {
  return (
    <div className="flex items-center gap-5">
      {team.logo && (
        <motion.img
          src={assetUrl(team.logo)}
          alt={`${team.name} logo`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-lg border border-line bg-white object-contain p-2"
        />
      )}
      <div>
        <h3 className="font-display text-lg font-semibold text-ink">{team.name}</h3>
        {children}
      </div>
    </div>
  );
}

function MultiTeamBlock({ teams }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {teams.map((team, i) => (
        <div key={i} className="rounded-lg border border-line bg-bg-panel p-5">
          <TeamHeading team={team}>
            {team.category && <p className="mt-0.5 text-[13px] text-accent">{team.category}</p>}
          </TeamHeading>
          <dl className="mt-4 space-y-3 text-[13px] text-ink-dim">
            {team.leader && (
              <div>
                <dt className="text-ink-faint">Team Leader</dt>
                <dd className="text-ink">{team.leader}</dd>
                <ContactLink value={team.leaderContact} />
              </div>
            )}
            {team.facultyAdvisor && (
              <div>
                <dt className="text-ink-faint">Mentor / Faculty Advisor</dt>
                <dd className="text-ink">{team.facultyAdvisor}</dd>
                <ContactLink value={team.facultyAdvisorContact} />
              </div>
            )}
          </dl>
        </div>
      ))}
    </div>
  );
}

// Type B (single-team): one team, several internal leadership roles.
function SingleTeamBlock({ teams }) {
  return (
    <>
      {teams.map((team, i) => (
        <div key={i} className="rounded-lg border border-line bg-bg-panel p-5">
          <TeamHeading team={team} />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(team.roles ?? []).map((role, j) => (
              <div key={j} className="flex items-start gap-2.5">
                <UserRound size={15} strokeWidth={2} className="shrink-0 mt-0.5 text-ink-faint" />
                <div>
                  <p className="text-[12px] text-ink-faint">{role.title}</p>
                  <p className="text-[13.5px] text-ink">{role.person}</p>
                  <ContactLink value={role.contact} />
                </div>
              </div>
            ))}
          </div>
          {team.facultyAdvisor && (
            <div className="mt-4 pt-4 border-t border-line text-[13px] text-ink-dim">
              <p className="text-ink-faint">Mentor / Faculty Advisor</p>
              <p className="text-ink">{team.facultyAdvisor}</p>
              <ContactLink value={team.facultyAdvisorContact} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default function EventDetail() {
  const { eventId } = useParams();
  const { events } = useContent();
  const event = events.items.find((e) => e.id === eventId);

  if (!event) {
    return (
      <section className="bg-bg py-24">
        <Container className="max-w-xl text-center">
          <Reveal>
            <p className="text-[15px] text-ink-dim">That event couldn't be found.</p>
            <Button href="/events" variant="outline" className="mt-6" icon={false}>
              Back to Events
            </Button>
          </Reveal>
        </Container>
      </section>
    );
  }

  const registerUrl = safeUrl(event.registerUrl);

  return (
    <section className="bg-bg py-16 lg:py-24">
      <Container className="max-w-4xl">
        <Reveal>
          <StatusPill tone={event.statusTone}>{event.status}</StatusPill>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink leading-tight">
            {event.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13.5px] text-ink-faint">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} strokeWidth={2} />
              {event.dateLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} strokeWidth={2} />
              {event.location}
            </span>
          </div>
          {registerUrl && (
            <Button href={registerUrl} target="_blank" rel="noreferrer" className="mt-5">
              Register for this event
            </Button>
          )}
        </Reveal>

        <Reveal delay={0.06} className="mt-8 max-w-xl rounded-lg overflow-hidden">
          <PlaceholderImage src={event.image} alt={`${event.name} event photo`} />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-dim">{event.description}</p>
        </Reveal>

        {event.details?.length > 0 && (
          <Reveal delay={0.12} className="mt-10 max-w-2xl">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Event breakdown</h2>
            <dl className="divide-y divide-line rounded-lg border border-line bg-bg-panel">
              {event.details.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-1 sm:gap-6 p-5"
                >
                  <dt className="text-[13px] font-semibold text-ink">{section.heading}</dt>
                  <dd className="whitespace-pre-line text-[13.5px] leading-relaxed text-ink-dim">
                    {section.body}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </Reveal>
        )}

        {event.teams?.length > 0 && (
          <Reveal delay={0.16} className="mt-10">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">
              {event.structure === "multi-team" ? "Teams" : "Team"}
            </h2>
            {event.structure === "multi-team" ? (
              <MultiTeamBlock teams={event.teams} />
            ) : (
              <SingleTeamBlock teams={event.teams} />
            )}
          </Reveal>
        )}

        {event.gallery?.length > 0 && (
          <Reveal delay={0.2} className="mt-10">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Photos</h2>
            <PhotoGallery photos={event.gallery} />
          </Reveal>
        )}

        <Button href="/events" variant="outline" className="mt-10" icon={false}>
          Back to Events
        </Button>
      </Container>
    </section>
  );
}

import { useParams } from "react-router-dom";
import { Calendar, MapPin, UserRound } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PlaceholderImage from "../components/PlaceholderImage";
import Button from "../components/Button";
import { STATUS_STYLES } from "../components/EventCard";
import { useContent } from "../lib/ContentContext";
import { assetUrl } from "../lib/assetUrl";

// Thumbnails crop to a square (unlike the cover photo / badge slots
// elsewhere, which never crop) — a photo grid reads fine that way, and
// clicking one opens the untouched original in a new tab.
function Gallery({ photos }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
      {photos.map((photo, i) => (
        <a
          key={i}
          href={assetUrl(photo)}
          target="_blank"
          rel="noreferrer"
          className="block aspect-square rounded-lg overflow-hidden border border-line"
        >
          <img
            src={assetUrl(photo)}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
}

// Type A (multi-team): each team stands alone with its own category/leader.
function MultiTeamBlock({ teams }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {teams.map((team, i) => (
        <div key={i} className="rounded-lg border border-line bg-bg-panel p-5">
          <h3 className="font-display text-[15px] font-semibold text-ink">{team.name}</h3>
          {team.category && <p className="mt-1 text-[13px] text-accent">{team.category}</p>}
          <dl className="mt-3 space-y-1.5 text-[13px] text-ink-dim">
            {team.leader && (
              <div className="flex gap-2">
                <dt className="text-ink-faint">Team Leader —</dt>
                <dd>{team.leader}</dd>
              </div>
            )}
            {team.facultyAdvisor && (
              <div className="flex gap-2">
                <dt className="text-ink-faint">Faculty Advisor —</dt>
                <dd>{team.facultyAdvisor}</dd>
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
          <h3 className="font-display text-[15px] font-semibold text-ink">{team.name}</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(team.roles ?? []).map((role, j) => (
              <div key={j} className="flex items-start gap-2.5">
                <UserRound size={15} strokeWidth={2} className="shrink-0 mt-0.5 text-ink-faint" />
                <div>
                  <p className="text-[12px] text-ink-faint">{role.title}</p>
                  <p className="text-[13.5px] text-ink">{role.person}</p>
                </div>
              </div>
            ))}
          </div>
          {team.facultyAdvisor && (
            <p className="mt-4 pt-4 border-t border-line text-[13px] text-ink-dim">
              <span className="text-ink-faint">Faculty Advisor —</span> {team.facultyAdvisor}
            </p>
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

  return (
    <section className="bg-bg py-16 lg:py-24">
      <Container className="max-w-4xl">
        <Reveal>
          <span
            className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-medium ${
              STATUS_STYLES[event.statusTone] ?? STATUS_STYLES.neutral
            }`}
          >
            {event.status}
          </span>
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
        </Reveal>

        <Reveal delay={0.06} className="mt-8 rounded-lg overflow-hidden">
          <PlaceholderImage src={event.image} alt={`${event.name} event photo`} aspect="aspect-[16/9]" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-dim">{event.description}</p>
        </Reveal>

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
            <Gallery photos={event.gallery} />
          </Reveal>
        )}

        <Button href="/events" variant="outline" className="mt-10" icon={false}>
          Back to Events
        </Button>
      </Container>
    </section>
  );
}

import { CalendarClock } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import EventCard from "../components/EventCard";
import { useContent } from "../lib/ContentContext";

export default function EventsList() {
  const { events } = useContent();

  return (
    <section className="bg-bg page-glow py-10 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">Events</span>
          <h1 className="mt-3 max-w-2xl font-display text-[26px] sm:text-4xl font-semibold text-ink leading-tight">
            Upcoming competitions
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">
            Competitions and events TRS BVM is preparing for. Past events and results live on the
            Achievements page.
          </p>
        </Reveal>

        {events.items.length > 0 ? (
          <div className={`mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 ${events.items.length >= 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
            {events.items.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <Reveal
            delay={0.08}
            className="mt-8 sm:mt-12 flex flex-col items-center gap-3 rounded-lg border border-dashed border-line py-16 text-center"
          >
            <CalendarClock size={28} strokeWidth={1.5} className="text-ink-faint" />
            <p className="text-[14px] text-ink-faint max-w-sm">
              No upcoming events listed yet — check back soon.
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

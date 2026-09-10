import { Calendar, MapPin } from "lucide-react";
import TiltCard from "../components/TiltCard";
import PlaceholderImage from "../components/PlaceholderImage";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import { useContent } from "../lib/ContentContext";

const STATUS_STYLES = {
  accent: "bg-accent-soft text-accent-dim",
  good: "bg-good-soft text-good",
  neutral: "bg-navy text-on-navy",
};

function EventCard({ event, index }) {
  return (
    <TiltCard
      delay={index * 0.06}
      className="group flex flex-col border border-line bg-bg-panel rounded-lg overflow-hidden transition-shadow duration-300 hover:border-accent/50 hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        <PlaceholderImage
          src={event.image}
          alt={`${event.name} event photo`}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-medium ${
            STATUS_STYLES[event.statusTone] ?? STATUS_STYLES.neutral
          }`}
        >
          {event.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-[12.5px] text-ink-faint">
          <Calendar size={13} strokeWidth={2} />
          {event.dateLabel}
        </div>
        <h3 className="mt-1.5 font-display text-[16px] font-semibold text-ink">{event.name}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-[12.5px] text-ink-faint">
          <MapPin size={13} strokeWidth={2} />
          {event.location}
        </div>
        <p className="mt-2.5 text-[13px] leading-relaxed text-ink-dim flex-1">{event.description}</p>
        <Button href={event.href} variant="link" size="sm" className="mt-4 self-start">
          View Details
        </Button>
      </div>
    </TiltCard>
  );
}

export default function EventsPreview() {
  const { events } = useContent();

  return (
    <div>
      <SectionHeader title="Upcoming Events" viewAllHref="/events" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {events.items.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </div>
  );
}

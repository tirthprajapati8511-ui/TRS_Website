import { Calendar, MapPin } from "lucide-react";
import TiltCard from "./TiltCard";
import PlaceholderImage from "./PlaceholderImage";
import Button from "./Button";

// Shared between the homepage preview and the full /events list.
export const STATUS_STYLES = {
  accent: "bg-accent-soft text-accent-dim",
  good: "bg-good-soft text-good",
  neutral: "bg-navy text-on-navy",
};

export default function EventCard({ event, index }) {
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

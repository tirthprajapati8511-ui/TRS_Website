import { Calendar, MapPin } from "lucide-react";
import TiltCard from "./TiltCard";
import PlaceholderImage from "./PlaceholderImage";
import Button from "./Button";
import StatusPill from "./StatusPill";
import { safeUrl } from "../lib/safeUrl";

// Shared between the homepage preview and the full /events list.

export default function EventCard({ event, index, headingLevel: Heading = "h3" }) {
  return (
    <TiltCard
      delay={index * 0.06}
      className="group flex flex-col border border-line bg-bg-panel shadow-sm rounded-lg overflow-hidden transition-shadow duration-300 hover:border-accent/50 hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        <PlaceholderImage
          src={event.image}
          alt={`${event.name} event photo`}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <StatusPill tone={event.statusTone} className="absolute top-3 left-3">
          {event.status}
        </StatusPill>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-[12.5px] text-ink-faint">
          <Calendar size={13} strokeWidth={2} />
          {event.dateLabel}
        </div>
        <Heading className="mt-1.5 font-display text-[16px] font-semibold text-ink">{event.name}</Heading>
        <div className="mt-1 flex items-center gap-1.5 text-[12.5px] text-ink-faint">
          <MapPin size={13} strokeWidth={2} />
          {event.location}
        </div>
        <p className="mt-2.5 text-[13px] leading-relaxed text-ink-dim flex-1 line-clamp-3">{event.description}</p>
        <div className="mt-4 flex items-center gap-4">
          <Button href={event.href} variant="link" size="sm">
            View Details
          </Button>
          {safeUrl(event.registerUrl) && (
            <Button
              href={safeUrl(event.registerUrl)}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              size="sm"
              icon={false}
            >
              Register
            </Button>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

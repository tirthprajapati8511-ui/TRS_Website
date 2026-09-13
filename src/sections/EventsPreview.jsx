import EventCard from "../components/EventCard";
import SectionHeader from "../components/SectionHeader";
import { useContent } from "../lib/ContentContext";

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

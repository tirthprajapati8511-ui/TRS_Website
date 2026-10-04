import Container from "../components/Container";
import EventsPreview from "./EventsPreview";
import WorkshopsPreview from "./WorkshopsPreview";

export default function HomeUpdates() {
  return (
    <section className="bg-bg py-10 sm:py-14 lg:py-20 border-b border-line">
      <Container>
        <EventsPreview />
        <WorkshopsPreview />
      </Container>
    </section>
  );
}

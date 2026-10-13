import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PlaceholderImage from "../components/PlaceholderImage";
import PhotoGallery from "../components/PhotoGallery";
import StatusPill from "../components/StatusPill";
import Button from "../components/Button";
import { useContent } from "../lib/ContentContext";
import { safeUrl } from "../lib/safeUrl";
import { workshopTone } from "../lib/workshopStatus";

export default function WorkshopDetail() {
  const { workshopId } = useParams();
  const { workshops } = useContent();
  const workshop = workshops.items.find((w) => w.id === workshopId);

  if (!workshop) {
    return (
      <section className="bg-bg py-14 sm:py-24">
        <Container className="max-w-xl text-center">
          <Reveal>
            <p className="text-[15px] text-ink-dim">That workshop couldn't be found.</p>
            <Button href="/workshops" variant="outline" className="mt-6" icon={false}>
              Back to Workshops
            </Button>
          </Reveal>
        </Container>
      </section>
    );
  }

  const formUrl = safeUrl(workshop.formHref);

  return (
    <section className="bg-bg page-glow py-10 sm:py-16 lg:py-24">
      <Container className="max-w-4xl">
        <Reveal>
          <StatusPill tone={workshopTone(workshop.status)}>{workshop.status}</StatusPill>
          <h1 className="mt-4 font-display text-[26px] sm:text-4xl font-semibold text-ink leading-tight">
            {workshop.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13.5px] text-ink-faint">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} strokeWidth={2} />
              {workshop.dateLabel}
            </span>
            {workshop.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} strokeWidth={2} />
                {workshop.location}
              </span>
            )}
          </div>
          {formUrl && (
            <Button href={formUrl} target="_blank" rel="noreferrer" className="mt-5">
              Register for this workshop
            </Button>
          )}
        </Reveal>

        {workshop.image && (
          <Reveal delay={0.06} className="mt-8 max-w-2xl overflow-hidden rounded-lg">
            <PlaceholderImage src={workshop.image} alt={`${workshop.title} photo`} aspect="aspect-[4/3]" />
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-dim">{workshop.description}</p>
        </Reveal>

        {workshop.details?.length > 0 && (
          <Reveal delay={0.12} className="mt-10 max-w-2xl">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Workshop report</h2>
            <dl className="divide-y divide-line rounded-lg border border-line bg-bg-panel shadow-sm">
              {workshop.details.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-1 sm:gap-6 p-5"
                >
                  <dt className="text-[13px] font-semibold text-ink">{section.heading}</dt>
                  <dd className="whitespace-pre-line text-[13.5px] leading-relaxed text-ink-dim">{section.body}</dd>
                </motion.div>
              ))}
            </dl>
          </Reveal>
        )}

        {workshop.gallery?.length > 0 && (
          <Reveal delay={0.16} className="mt-10">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Photos</h2>
            <PhotoGallery photos={workshop.gallery} />
          </Reveal>
        )}

        <Button href="/workshops" variant="outline" className="mt-10" icon={false}>
          Back to Workshops
        </Button>
      </Container>
    </section>
  );
}

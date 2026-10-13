import { Calendar, GraduationCap } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import StatusPill from "../components/StatusPill";
import PlaceholderImage from "../components/PlaceholderImage";
import { useContent } from "../lib/ContentContext";
import { safeUrl } from "../lib/safeUrl";
import { workshopTone } from "../lib/workshopStatus";

function WorkshopCard({ workshop: w, index }) {
  const formUrl = safeUrl(w.formHref);
  const hasDetails = !!(w.details?.length || w.gallery?.length || w.image);

  return (
    <Reveal
      delay={Math.min(index, 6) * 0.06}
      className="flex flex-col overflow-hidden rounded-lg border border-line bg-bg-panel shadow-sm"
    >
      {w.image && (
        <div className="relative">
          <PlaceholderImage src={w.image} alt={`${w.title} photo`} aspect="aspect-[4/3]" />
          <StatusPill tone={workshopTone(w.status)} className="absolute top-3 left-3">
            {w.status}
          </StatusPill>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {!w.image && (
          <StatusPill tone={workshopTone(w.status)} className="self-start">
            {w.status}
          </StatusPill>
        )}
        <h2 className={`font-display text-[17px] font-semibold text-ink ${w.image ? "" : "mt-3"}`}>{w.title}</h2>
        <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-ink-faint">
          <Calendar size={13} strokeWidth={2} />
          {w.dateLabel}
        </p>
        <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-dim">{w.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {hasDetails && (
            <Button href={`/workshops/${w.id}`} variant="link" size="sm">
              View Details
            </Button>
          )}
          {formUrl && (
            <Button href={formUrl} target="_blank" rel="noreferrer" size="sm">
              Register
            </Button>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function WorkshopsList() {
  const { workshops } = useContent();
  const upcoming = workshops.items.filter((w) => workshopTone(w.status) !== "neutral");
  const past = workshops.items.filter((w) => workshopTone(w.status) === "neutral");
  const grid = "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5";

  return (
    <section className="bg-bg page-glow py-10 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">Workshops</span>
          <h1 className="mt-3 max-w-2xl font-display text-[26px] sm:text-4xl font-semibold text-ink leading-tight">
            Hands-on sessions and webinars
          </h1>
        </Reveal>

        {workshops.items.length > 0 ? (
          <div className="mt-8 sm:mt-12 space-y-12">
            {upcoming.length > 0 && (
              <div>
                {past.length > 0 && (
                  <h2 className="mb-5 font-display text-lg font-semibold text-ink">Upcoming</h2>
                )}
                <div className={grid}>
                  {upcoming.map((w, i) => (
                    <WorkshopCard key={w.id} workshop={w} index={i} />
                  ))}
                </div>
              </div>
            )}
            {past.length > 0 && (
              <div>
                {upcoming.length > 0 && (
                  <h2 className="mb-5 font-display text-lg font-semibold text-ink">Past workshops</h2>
                )}
                <div className={grid}>
                  {past.map((w, i) => (
                    <WorkshopCard key={w.id} workshop={w} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Reveal
            delay={0.08}
            className="mt-8 sm:mt-12 flex flex-col items-center gap-3 rounded-lg border border-dashed border-line py-16 px-6 text-center"
          >
            <GraduationCap size={28} strokeWidth={1.5} className="text-ink-faint" />
            <p className="max-w-sm text-[14px] text-ink-faint">
              No workshops are scheduled right now. Follow our social pages or check back here for the next one.
            </p>
            <Button href="/contact" variant="outline" size="sm" icon={false} className="mt-2">
              Contact us
            </Button>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

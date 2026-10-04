import { Calendar, GraduationCap } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import StatusPill from "../components/StatusPill";
import { useContent } from "../lib/ContentContext";
import { safeUrl } from "../lib/safeUrl";

export default function WorkshopsList() {
  const { workshops } = useContent();

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
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {workshops.items.map((w, i) => {
              const formUrl = safeUrl(w.formHref);
              return (
                <Reveal
                  key={w.id}
                  delay={Math.min(i, 6) * 0.06}
                  className="flex flex-col rounded-lg border border-line bg-bg-panel shadow-sm p-6"
                >
                  <StatusPill tone="accent" className="self-start">
                    {w.status}
                  </StatusPill>
                  <h2 className="mt-3 font-display text-[17px] font-semibold text-ink">{w.title}</h2>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-ink-faint">
                    <Calendar size={13} strokeWidth={2} />
                    {w.dateLabel}
                  </p>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-dim">{w.description}</p>
                  {formUrl && (
                    <Button href={formUrl} target="_blank" rel="noreferrer" size="sm" className="mt-5 self-start">
                      Register
                    </Button>
                  )}
                </Reveal>
              );
            })}
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

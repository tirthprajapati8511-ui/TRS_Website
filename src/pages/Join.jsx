import { CheckCircle2, Download, Mail, Phone, UserRound } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { useContent } from "../lib/ContentContext";
import { assetUrl } from "../lib/assetUrl";

export default function Join() {
  const { join } = useContent();
  const { facultyContact } = join;

  return (
    <section className="bg-bg py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">Join TRS</span>
          <h1 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl font-semibold text-ink leading-tight">
            {join.heading}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">
            {join.description}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal delay={0.08} className="lg:col-span-7">
            <h2 className="font-display text-lg font-semibold text-ink">How to enroll</h2>
            <ol className="mt-5 space-y-4">
              {join.steps.map((step, i) => (
                <li key={i} className="flex gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent font-display text-[13px] font-semibold">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-[14.5px] leading-relaxed text-ink-dim">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              {join.formHref ? (
                <Button href={join.formHref} variant="primary" icon={false}>
                  <Download size={16} strokeWidth={2.25} />
                  Download Enrollment Form
                </Button>
              ) : (
                <div className="inline-flex items-center gap-2.5 rounded-md border border-line bg-bg-muted px-4 py-3 text-[13.5px] text-ink-faint">
                  <CheckCircle2 size={16} strokeWidth={2} className="shrink-0" />
                  The enrollment form isn't uploaded yet — check back soon, or ask the faculty
                  contact directly.
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-5">
            <div className="rounded-lg border border-line bg-bg-panel p-6">
              <h2 className="font-display text-base font-semibold text-ink">
                Faculty enrollment contact
              </h2>
              <div className="mt-5 flex items-center gap-4">
                {facultyContact.photo ? (
                  <img
                    src={assetUrl(facultyContact.photo)}
                    alt={facultyContact.name}
                    className="h-16 w-16 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-ink-faint">
                    <UserRound size={26} strokeWidth={1.5} />
                  </span>
                )}
                <div>
                  <p className="font-display text-[15px] font-semibold text-ink leading-snug">
                    {facultyContact.name}
                  </p>
                  <p className="text-[12.5px] text-ink-faint mt-0.5">{facultyContact.role}</p>
                </div>
              </div>
              <div className="mt-5 space-y-2.5">
                <a
                  href={`mailto:${facultyContact.email}`}
                  className="flex items-center gap-2 text-[13.5px] text-accent hover:text-accent-dim transition-colors"
                >
                  <Mail size={15} strokeWidth={2} className="shrink-0" />
                  {facultyContact.email}
                </a>
                {facultyContact.phone && (
                  <a
                    href={`tel:${facultyContact.phone}`}
                    className="flex items-center gap-2 text-[13.5px] text-accent hover:text-accent-dim transition-colors"
                  >
                    <Phone size={15} strokeWidth={2} className="shrink-0" />
                    {facultyContact.phone}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

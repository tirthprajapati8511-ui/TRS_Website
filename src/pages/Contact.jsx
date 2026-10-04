import { Mail, MapPin, Phone } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import ContactLink from "../components/ContactLink";
import { SOCIAL_ICONS } from "../components/SocialIcons";
import { useContent } from "../lib/ContentContext";
import { safeUrl } from "../lib/safeUrl";

function QuickItem({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-3.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon size={17} strokeWidth={2} />
      </span>
      <div>
        <p className="mono-label text-[10px] text-ink-faint">{label}</p>
        <div className="mt-1 text-[14px] leading-snug text-ink">{children}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { contact, footer } = useContent();
  const mailto = `mailto:${footer.email}?subject=${encodeURIComponent(contact.messageSubject ?? "")}`;
  const mapSrc = contact.mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`
    : null;
  const socials = (footer.socials ?? []).filter((s) => safeUrl(s.href));

  return (
    <section className="bg-bg py-10 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">{contact.eyebrow}</span>
          <h1 className="mt-3 max-w-2xl font-display text-[26px] sm:text-4xl font-semibold text-ink leading-tight">
            {contact.heading}
          </h1>
          {contact.intro && (
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">{contact.intro}</p>
          )}
        </Reveal>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Reveal delay={0.05} className="lg:col-span-2 rounded-lg border border-line bg-bg-panel p-6 space-y-6">
            <QuickItem icon={Mail} label="Email">
              <a href={mailto} className="text-accent hover:text-accent-dim hover:underline underline-offset-4">
                {footer.email}
              </a>
            </QuickItem>
            {footer.phone && (
              <QuickItem icon={Phone} label="Phone">
                {footer.phone}
              </QuickItem>
            )}
            <QuickItem icon={MapPin} label="Address">
              {(footer.addressLines ?? []).map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </QuickItem>

            <div className="pt-5 border-t border-line flex flex-wrap items-center gap-4">
              <Button href={mailto} size="sm">
                {contact.messageLabel}
              </Button>
              {socials.length > 0 && (
                <div className="flex items-center gap-3.5">
                  {socials.map((s) => {
                    const Icon = SOCIAL_ICONS[s.label];
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="text-ink-faint transition-all duration-200 hover:-translate-y-0.5 hover:text-accent"
                      >
                        {Icon ? <Icon size={18} strokeWidth={2} /> : s.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </Reveal>

          {mapSrc && (
            <Reveal delay={0.1} className="lg:col-span-3 overflow-hidden rounded-lg border border-line bg-bg-elevated min-h-[300px]">
              <iframe
                title="Map to BVM Engineering College"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[300px] w-full border-0"
              />
            </Reveal>
          )}
        </div>

        {contact.contacts?.length > 0 && (
          <div className="mt-10 sm:mt-16">
            <SectionHeader title="Who to contact" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contact.contacts.map((c, i) => (
                <Reveal
                  key={i}
                  delay={Math.min(i, 6) * 0.05}
                  className="rounded-lg border border-line bg-bg-panel p-5"
                >
                  <p className="mono-label text-[10px] text-accent">{c.topic}</p>
                  <p className="mt-2 font-display text-[15px] font-semibold text-ink">{c.person}</p>
                  {c.role && <p className="text-[13px] text-ink-dim">{c.role}</p>}
                  <div className="mt-3 flex flex-col gap-1">
                    <ContactLink value={c.email} />
                    <ContactLink value={c.phone} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {contact.faqs?.length > 0 && (
          <div className="mt-10 sm:mt-16 max-w-3xl">
            <SectionHeader title="Frequently asked" />
            <div className="divide-y divide-line rounded-lg border border-line bg-bg-panel">
              {contact.faqs.map((f, i) => (
                <Reveal key={i} delay={Math.min(i, 6) * 0.05} className="p-5">
                  <h3 className="font-display text-[15px] font-semibold text-ink">{f.q}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-dim">{f.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

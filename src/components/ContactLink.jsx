import { Mail, Phone } from "lucide-react";

// Free-text contact from the admin: an email becomes a mailto: link, a phone
// number a tel: link, anything else is shown as plain text.
export default function ContactLink({ value }) {
  const text = (value ?? "").trim();
  if (!text) return null;

  let href = null;
  let Icon = Phone;
  if (text.includes("@")) {
    href = `mailto:${text}`;
    Icon = Mail;
  } else if (/^[+\d][\d\s()-]{6,}$/.test(text)) {
    href = `tel:${text.replace(/[^\d+]/g, "")}`;
  }

  const inner = (
    <>
      <Icon size={12} strokeWidth={2} className="shrink-0" />
      {text}
    </>
  );
  const cls = "inline-flex items-center gap-1.5 text-[12.5px]";
  return href ? (
    <a href={href} className={`${cls} text-accent hover:text-accent-dim hover:underline underline-offset-4`}>
      {inner}
    </a>
  ) : (
    <span className={`${cls} text-ink-dim`}>{inner}</span>
  );
}

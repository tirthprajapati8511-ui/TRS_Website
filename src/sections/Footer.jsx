import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import Container from "../components/Container";
import { TrsLogo } from "../components/Logo";
import { SOCIAL_ICONS } from "../components/SocialIcons";
import { NAV_LINKS, JOIN_LINK } from "../lib/defaultContent";
import { useContent } from "../lib/ContentContext";

const QUICK_LINKS = [
  ...NAV_LINKS.filter((l) => l.href !== "/"),
  JOIN_LINK,
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const { footer } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-on-navy">
      <div aria-hidden="true" className="h-[2px] circuit-trace opacity-70" />
      <Container className="py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <TrsLogo className="h-9 w-9" />
              <div className="leading-tight">
                <span className="block font-display text-[15px] font-semibold">TRS BVM Student Chapter</span>
                <span className="block text-[12px] text-on-navy-dim">BVM Engineering College</span>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-on-navy-dim">
              {footer.description}
            </p>
            <div className="mt-5 flex gap-4">
              {footer.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="text-on-navy-dim hover:text-white transition-colors"
                  >
                    {Icon ? <Icon size={16} strokeWidth={2} /> : s.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mono-label text-[11px] text-on-navy-dim">Quick Links</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[13px] text-on-navy-dim hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mono-label text-[11px] text-on-navy-dim">Contact Us</h4>
            <ul className="mt-4 space-y-2.5 text-[13px] text-on-navy-dim">
              <li className="flex items-center gap-2">
                <Mail size={14} strokeWidth={2} className="shrink-0" />
                <a href={`mailto:${footer.email}`} className="hover:text-white transition-colors">
                  {footer.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} strokeWidth={2} className="shrink-0" />
                {footer.phone}
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} strokeWidth={2} className="shrink-0 mt-0.5" />
                <span>{footer.addressLines.join(", ")}</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col items-start lg:items-end text-left lg:text-right">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <ShieldCheck size={18} strokeWidth={2} />
            </span>
            <p className="mt-2 text-[11.5px] text-on-navy-dim">{footer.parentOrg.note}</p>
            <p className="text-[13px] font-semibold">{footer.parentOrg.name}</p>
            <p className="mt-2 text-[11.5px] italic text-on-navy-dim">Work is Worship</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-[11.5px] text-on-navy-dim">
            © {year} TRS BVM Student Chapter. All rights reserved.
          </p>
          <p className="text-[11.5px] text-on-navy-dim">BVM Engineering College, Vallabh Vidyanagar</p>
        </div>
      </Container>
    </footer>
  );
}

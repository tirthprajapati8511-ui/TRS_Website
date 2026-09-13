import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X as CloseIcon } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import ThemeToggle from "../components/ThemeToggle";
import { TrsLogo, BvmLogo } from "../components/Logo";
import { SOCIAL_ICONS } from "../components/SocialIcons";
import { NAV_LINKS, JOIN_LINK } from "../lib/defaultContent";
import { useContent } from "../lib/ContentContext";

function TopBar() {
  const { footer } = useContent();
  return (
    <div className="hidden sm:block bg-navy text-on-navy-dim border-b border-white/10">
      <Container className="flex items-center justify-between py-2 text-[12.5px]">
        <span>
          Work is Worship <span className="mx-2 opacity-40">|</span> Birla Vishvakarma
          Mahavidyalaya, Vallabh Vidyanagar
        </span>
        <div className="flex items-center gap-4">
          {footer.socials.map((s) => {
            const Icon = SOCIAL_ICONS[s.label];
            if (!Icon) return null;
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-on-navy-dim hover:text-on-navy transition-colors"
              >
                <Icon size={14} strokeWidth={2} />
              </a>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkCls = ({ isActive }) =>
    `relative py-1.5 text-[15px] font-medium whitespace-nowrap transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-accent after:transition-transform after:duration-300 after:origin-left ${
      isActive
        ? "text-accent after:w-full after:scale-x-100"
        : "text-ink-dim hover:text-ink after:w-full after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-line overflow-x-clip">
      <TopBar />

      {/* Nine nav items plus Join TRS at a bigger, readable size need more
          than the 1240px content width, so this row gets its own wider (but
          still capped) container instead of the shared <Container> — and
          only switches out of the hamburger at 1760px, comfortably past the
          container's own 1680px cap, so there's real spare room whenever it
          does show. */}
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 py-4">
        <NavLink to="/" className="flex items-center gap-3 shrink-0" aria-label="TRS BVM home">
          <TrsLogo className="h-[52px] w-[52px] shrink-0" />
          <span className="hidden sm:block leading-tight">
            <span className="block font-display text-[19px] font-semibold tracking-tight text-ink">
              TRS BVM
            </span>
            <span className="block text-[13px] text-ink-faint">Student Chapter</span>
          </span>
        </NavLink>

        <nav aria-label="Primary" className="hidden min-[1760px]:flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} to={link.href} className={linkCls} end={link.href === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden min-[1760px]:flex items-center gap-4 shrink-0">
          <ThemeToggle />
          <div className="pl-4 ml-1 border-l border-line flex items-center gap-2.5">
            <BvmLogo className="h-10 w-10" />
            <span className="text-[11px] leading-tight text-ink-faint max-w-[100px]">
              BVM Engineering College
            </span>
          </div>
          <Button href={JOIN_LINK.href} variant="primary" icon={false}>
            {JOIN_LINK.label}
          </Button>
        </div>

        <div className="flex items-center gap-2.5 min-[1760px]:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-ink p-1.5"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <CloseIcon size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="min-[1760px]:hidden overflow-hidden border-b border-line bg-bg"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-3.5 text-[17px] font-medium transition-colors ${
                      isActive ? "text-accent" : "text-ink-dim hover:text-ink"
                    }`
                  }
                  end={link.href === "/"}
                >
                  {link.label}
                </NavLink>
              ))}
              <Button
                href={JOIN_LINK.href}
                variant="primary"
                icon={false}
                className="mt-3 w-full"
                onClick={() => setOpen(false)}
              >
                {JOIN_LINK.label}
              </Button>
              <div className="mt-5 pt-4 border-t border-line flex items-center gap-3">
                <BvmLogo className="h-11 w-11" />
                <span className="text-[13px] leading-tight text-ink-faint">
                  Birla Vishvakarma Mahavidyalaya, Vallabh Vidyanagar
                </span>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

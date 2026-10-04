import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { JOIN_LINK, NAV_LINKS } from "../lib/defaultContent";

export default function NotFound() {
  const links = [...NAV_LINKS.filter((l) => l.href !== "/"), JOIN_LINK];

  return (
    <section className="bg-bg py-14 sm:py-24">
      <Container className="max-w-2xl">
        <Reveal>
          <span className="mono-label text-[11px] text-accent">Error 404</span>
          <h1 className="mt-3 font-display text-[26px] sm:text-4xl font-semibold text-ink leading-tight">
            We couldn't find that page
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">
            The link may be mistyped, or the page may have moved. Head back home or pick a section below.
          </p>
          <Button href="/" className="mt-6">
            Back to the homepage
          </Button>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="group flex items-center justify-between rounded-md border border-line bg-bg-panel px-4 py-3 text-[13.5px] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {l.label}
              <ArrowRight
                size={14}
                className="text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

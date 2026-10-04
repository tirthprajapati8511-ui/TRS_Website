import Container from "../components/Container";
import Reveal from "../components/Reveal";
import Button from "../components/Button";

/**
 * Placeholder for a nav destination that doesn't have its own dedicated
 * page yet. Keeps every link in the header/footer live (no dead-ends)
 * while the homepage carries the full design pass. Swap each of these out
 * for a real page as the corresponding section gets built.
 */
export default function PageShell({ title, description }) {
  return (
    <section className="bg-bg py-12 sm:py-20 lg:py-28 min-h-[50vh]">
      <Container className="max-w-2xl">
        <Reveal>
          <span className="mono-label text-[11px] text-accent">In progress</span>
          <h1 className="mt-3 font-display text-[26px] sm:text-4xl font-semibold text-ink">{title}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">
            {description ??
              `The ${title} page is being built next. In the meantime, the homepage has a preview of what will live here.`}
          </p>
          <Button href="/" variant="outline" className="mt-8" icon={false}>
            Back to homepage
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

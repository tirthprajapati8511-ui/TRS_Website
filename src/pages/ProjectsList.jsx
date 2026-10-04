import { Boxes } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import ProjectCard from "../components/ProjectCard";
import Button from "../components/Button";
import { useContent } from "../lib/ContentContext";

export default function ProjectsList() {
  const { projects } = useContent();

  return (
    <section className="bg-bg py-10 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <span className="mono-label text-[11px] text-accent">Projects</span>
          <h1 className="mt-3 max-w-2xl font-display text-[26px] sm:text-4xl font-semibold text-ink leading-tight">
            {projects.heading}
          </h1>
        </Reveal>

        {projects.items.length > 0 ? (
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.items.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <Reveal
            delay={0.08}
            className="mt-8 sm:mt-12 flex flex-col items-center gap-3 rounded-lg border border-dashed border-line py-16 text-center"
          >
            <Boxes size={28} strokeWidth={1.5} className="text-ink-faint" />
            <p className="text-[14px] text-ink-faint max-w-sm">
              No projects listed yet — check back soon.
            </p>
          </Reveal>
        )}

        <Reveal delay={0.16} className="mt-10 sm:mt-16 rounded-lg bg-navy text-on-navy p-8 text-center">
          <h2 className="font-display text-xl font-semibold">{projects.ctaPanel.heading}</h2>
          <p className="mt-2.5 max-w-md mx-auto text-[13.5px] leading-relaxed text-on-navy-dim">
            {projects.ctaPanel.description}
          </p>
          <Button href={projects.ctaPanel.buttonHref} variant="primary" size="sm" className="mt-5">
            {projects.ctaPanel.buttonLabel}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

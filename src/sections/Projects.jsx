import Container from "../components/Container";
import TiltCard from "../components/TiltCard";
import ProjectCard from "../components/ProjectCard";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import { useContent } from "../lib/ContentContext";

export default function Projects() {
  const { projects } = useContent();

  return (
    <section id="projects" className="bg-bg py-10 sm:py-14 lg:py-20 border-b border-line">
      <Container>
        <SectionHeader title="Our Projects" viewAllHref="/projects" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {projects.items.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}

          <TiltCard
            delay={projects.items.length * 0.06}
            className="flex flex-col justify-center rounded-lg bg-navy text-on-navy p-6 transition-shadow duration-300 hover:shadow-xl"
          >
            <h3 className="font-display text-lg font-semibold leading-snug">
              {projects.ctaPanel.heading}
            </h3>
            <p className="mt-2.5 text-[13px] leading-relaxed text-on-navy-dim">
              {projects.ctaPanel.description}
            </p>
            <Button
              href={projects.ctaPanel.buttonHref}
              variant="primary"
              size="sm"
              className="mt-5 self-start"
            >
              {projects.ctaPanel.buttonLabel}
            </Button>
          </TiltCard>
        </div>
      </Container>
    </section>
  );
}

import Container from "../components/Container";
import TiltCard from "../components/TiltCard";
import PlaceholderImage from "../components/PlaceholderImage";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import { useContent } from "../lib/ContentContext";

function ProjectCard({ project, index }) {
  return (
    <TiltCard
      delay={index * 0.06}
      className="group flex flex-col border border-line bg-bg-panel rounded-lg overflow-hidden transition-shadow duration-300 hover:border-accent/50 hover:shadow-xl"
    >
      <div className="overflow-hidden">
        <PlaceholderImage
          src={project.image}
          alt={`${project.name} photo`}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[16px] font-semibold text-ink">{project.name}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-dim flex-1">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.domains.map((d) => (
            <span key={d} className="text-[11px] text-ink-faint">
              {d}
              {d !== project.domains[project.domains.length - 1] && (
                <span className="mx-1.5 opacity-50">·</span>
              )}
            </span>
          ))}
        </div>
        <Button href={project.href} variant="link" size="sm" className="mt-4 self-start">
          Know More
        </Button>
      </div>
    </TiltCard>
  );
}

export default function Projects() {
  const { projects } = useContent();

  return (
    <section id="projects" className="bg-bg py-16 lg:py-20 border-b border-line">
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

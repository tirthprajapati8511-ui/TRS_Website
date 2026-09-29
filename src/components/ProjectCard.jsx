import TiltCard from "./TiltCard";
import PlaceholderImage from "./PlaceholderImage";
import Button from "./Button";

// Shared between the homepage preview and the full /projects list.
export default function ProjectCard({ project, index }) {
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

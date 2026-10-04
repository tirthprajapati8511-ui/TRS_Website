import { useParams } from "react-router-dom";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import PlaceholderImage from "../components/PlaceholderImage";
import PhotoGallery from "../components/PhotoGallery";
import Button from "../components/Button";
import { useContent } from "../lib/ContentContext";
import { assetUrl } from "../lib/assetUrl";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const { projects } = useContent();
  const project = projects.items.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section className="bg-bg py-14 sm:py-24">
        <Container className="max-w-xl text-center">
          <Reveal>
            <p className="text-[15px] text-ink-dim">That project couldn't be found.</p>
            <Button href="/projects" variant="outline" className="mt-6" icon={false}>
              Back to Projects
            </Button>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-bg page-glow py-10 sm:py-16 lg:py-24">
      <Container className="max-w-4xl">
        <Reveal>
          <h1 className="font-display text-[26px] sm:text-4xl font-semibold text-ink leading-tight">
            {project.name}
          </h1>
          {project.domains?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.domains.map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent-dim"
                >
                  {d}
                </span>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.06} className="mt-8 max-w-xl rounded-lg overflow-hidden">
          <PlaceholderImage src={project.image} alt={`${project.name} photo`} />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-dim">
            {project.description}
          </p>
        </Reveal>

        {project.video && (
          <Reveal delay={0.14} className="mt-10">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Video</h2>
            <video
              src={assetUrl(project.video)}
              controls
              className="w-full rounded-lg border border-line"
            />
          </Reveal>
        )}

        {project.gallery?.length > 0 && (
          <Reveal delay={0.2} className="mt-10">
            <h2 className="font-display text-lg font-semibold text-ink mb-5">Photos</h2>
            <PhotoGallery photos={project.gallery} />
          </Reveal>
        )}

        <Button href="/projects" variant="outline" className="mt-10" icon={false}>
          Back to Projects
        </Button>
      </Container>
    </section>
  );
}

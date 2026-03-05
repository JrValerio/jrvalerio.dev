import Link from "next/link";
import Section from "./UI/Section";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

type WorkProps = {
  limit?: number;
  title?: string;
  subtitle?: string;
};

export default function Work({
  limit,
  title = "Selected Work",
  subtitle = "Projetos com foco em produto, experiencia do usuario e engenharia.",
}: WorkProps) {
  const items = typeof limit === "number" ? projects.slice(0, limit) : projects;
  const showViewAll = typeof limit === "number" && projects.length > items.length;

  return (
    <Section id="work" title={title} subtitle={subtitle}>
      <div>
        {items.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {showViewAll ? (
        <div className="mt-8">
          <Link href="/v2/projetos" className="jr-link">
            View all projects
          </Link>
        </div>
      ) : null}
    </Section>
  );
}

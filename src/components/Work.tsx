import Link from "next/link";
import Section from "./UI/Section";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { getV2Messages, toLocalePath, type V2Locale } from "../i18n/v2";

type WorkProps = {
  limit?: number;
  title?: string;
  subtitle?: string;
  locale?: V2Locale;
  prefixed?: boolean;
};

export default function Work({
  limit,
  title,
  subtitle,
  locale = "pt-BR",
  prefixed = false,
}: WorkProps) {
  const messages = getV2Messages(locale);
  const items = typeof limit === "number" ? projects.slice(0, limit) : projects;
  const showViewAll = typeof limit === "number" && projects.length > items.length;
  const sectionTitle = title ?? (limit ? messages.work.selectedTitle : messages.work.allTitle);
  const sectionSubtitle =
    subtitle ?? (limit ? messages.work.selectedSubtitle : messages.work.allSubtitle);

  return (
    <Section id="work" title={sectionTitle} subtitle={sectionSubtitle}>
      <div>
        {items.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            prefixed={prefixed}
          />
        ))}
      </div>

      {showViewAll ? (
        <div className="mt-8">
          <Link href={toLocalePath("/v2/projetos", locale, prefixed)} className="jr-link">
            {messages.work.viewAll}
          </Link>
        </div>
      ) : null}
    </Section>
  );
}

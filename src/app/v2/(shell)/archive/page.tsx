import type { Metadata } from "next";
import Link from "next/link";
import Section from "../../../components/UI/Section";
import { archivedProjects } from "../../../data/projects";
import { getV2Messages, toLocalePath } from "../../../i18n/v2";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Archive",
  description: "Projetos de estudo e iteracoes anteriores do portfolio.",
  alternates: {
    canonical: "/v2/archive",
  },
};

export default function V2ArchivePage() {
  const locale = "pt-BR";
  const prefixed = false;
  const messages = getV2Messages(locale);

  return (
    <Section
      title={messages.archive.title}
      subtitle={messages.archive.subtitle}
      headingAs="h1"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {archivedProjects.map((project) => (
          <article key={project.slug} className="jr-surface-card p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="jr-meta mb-2">{project.category}</p>
                <h2 className="text-xl font-semibold text-[var(--jr-text)]">{project.title}</h2>
              </div>
              <span className="jr-meta">{project.year}</span>
            </div>

            <p className="jr-body text-[var(--jr-muted)]">{project.summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={`${project.slug}-${tech}`}
                  className="rounded-full border border-[var(--jr-border)] px-3 py-1 text-xs text-[var(--jr-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-5">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="jr-link">
                  {messages.archive.live}
                </a>
              ) : null}
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jr-link"
                >
                  {messages.archive.source}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link href={toLocalePath("/v2/projetos", locale, prefixed)} className="jr-link">
          ← {messages.archive.backToMain}
        </Link>
      </div>
    </Section>
  );
}

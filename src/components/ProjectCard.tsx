"use client";

import Link from "next/link";
import type { Project } from "../data/projects";
import { trackEvent } from "../lib/analytics";
import { getV2Messages, toLocalePath, type V2Locale } from "../i18n/v2";

type ProjectCardProps = {
  project: Project;
  locale?: V2Locale;
  prefixed?: boolean;
};

function getProjectReadingTime(project: Project) {
  const combinedText = [
    project.summary,
    project.challenge,
    project.solution,
    project.impact,
    ...project.keyFeatures,
    ...project.technicalChallenges,
    ...project.nextIteration,
    ...project.highlights,
    ...project.architecture.map((item) => item.detail),
  ].join(" ");

  const words = combinedText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function ProjectCard({
  project,
  locale = "pt-BR",
  prefixed = false,
}: ProjectCardProps) {
  const messages = getV2Messages(locale);
  const readingTime = getProjectReadingTime(project);

  return (
    <article className="group border-b border-[var(--jr-border)] py-8 transition-colors duration-300 hover:border-[var(--jr-accent)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="jr-meta mb-2">{project.category}</p>
          <h3 className="text-2xl font-semibold tracking-tight text-[var(--jr-text)] transition-transform duration-300 group-hover:translate-x-1">
            {project.title}
          </h3>
          <p className="jr-body mt-4 text-[var(--jr-muted)]">{project.summary}</p>
          <p className="jr-meta mt-4">
            {project.stack.join(" • ")} • {readingTime} {messages.work.readTime}
          </p>
        </div>
        <span className="jr-meta">{project.year}</span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-5">
        <Link
          href={toLocalePath(`/v2/projetos/${project.slug}`, locale, prefixed)}
          prefetch
          className="jr-link"
          onClick={() =>
            trackEvent("case_study_open", {
              project_slug: project.slug,
              project_category: project.category,
              source: "list",
              locale,
            })
          }
        >
          {messages.work.caseStudy}
        </Link>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="jr-link"
            onClick={() =>
              trackEvent("project_live_click", {
                project_slug: project.slug,
                project_category: project.category,
                source: "list",
                locale,
              })
            }
          >
            {messages.work.live}
          </a>
        ) : null}

        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="jr-link"
            onClick={() =>
              trackEvent("project_source_click", {
                project_slug: project.slug,
                project_category: project.category,
                source: "list",
                locale,
              })
            }
          >
            {messages.work.source}
          </a>
        ) : null}
      </div>
    </article>
  );
}

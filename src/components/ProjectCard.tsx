"use client";

import Link from "next/link";
import Image from "next/image";
import Card from "./UI/Card";
import type { Project } from "../data/projects";
import { trackEvent } from "../lib/analytics";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex h-full flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-[var(--jr-accent)]">
      <div>
        <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-lg border border-[var(--jr-border)]">
          <Image
            src={project.cover}
            alt={`Preview do projeto ${project.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
        </div>

        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="jr-meta mb-2">{project.category}</p>
            <h3 className="text-2xl font-semibold text-[var(--jr-text)]">{project.title}</h3>
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
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Link
          href={`/v2/projetos/${project.slug}`}
          prefetch
          className="jr-link"
          onClick={() =>
            trackEvent("case_study_open", {
              project_slug: project.slug,
              project_category: project.category,
              source: "list",
            })
          }
        >
          Case Study
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
              })
            }
          >
            Live
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
              })
            }
          >
            Source
          </a>
        ) : null}
      </div>
    </Card>
  );
}

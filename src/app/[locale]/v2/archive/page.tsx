import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "../../../../components/UI/Section";
import { archivedProjects } from "../../../../data/projects";
import {
  getLocaleFromSegment,
  getV2Messages,
  toLocalePath,
  type V2LocaleSegment,
} from "../../../../i18n/v2";

export const dynamic = "force-static";

type LocalizedArchivePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedArchivePageProps): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) return {};

  return {
    alternates: {
      canonical: `/${segment}/v2/archive`,
    },
  };
}

export default async function LocalizedArchivePage({ params }: LocalizedArchivePageProps) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) notFound();

  const messages = getV2Messages(locale);

  return (
    <Section title={messages.archive.title} subtitle={messages.archive.subtitle}>
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
        <Link href={toLocalePath("/v2/projetos", locale, true)} className="jr-link">
          ← {messages.archive.backToMain}
        </Link>
      </div>
    </Section>
  );
}

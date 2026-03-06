import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailContent from "../../../../../features/v2/project-detail-content";
import { projects } from "../../../../../data/projects";
import {
  V2_LOCALE_SEGMENTS,
  getLocaleFromSegment,
  type V2LocaleSegment,
} from "../../../../../i18n/v2";
import {
  getProjectBySlug,
} from "../../../../../data/projects";
import { getProjectDetailMetadata } from "../../../../v2/projetos/[slug]/page";

type LocalizedProjectDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return V2_LOCALE_SEGMENTS.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: LocalizedProjectDetailPageProps): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) return {};

  return getProjectDetailMetadata(slug, locale, true);
}

export default async function LocalizedProjectDetailPage({
  params,
}: LocalizedProjectDetailPageProps) {
  const { locale: segment, slug } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  const project = getProjectBySlug(slug);
  if (!locale || !project) notFound();

  return <ProjectDetailContent project={project} locale={locale} prefixed />;
}

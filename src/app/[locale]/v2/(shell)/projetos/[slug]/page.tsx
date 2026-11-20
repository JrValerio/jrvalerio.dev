import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../../../components/JsonLd";
import ProjectDetailContent from "../../../../../features/v2/project-detail-content";
import { projects } from "../../../../../data/projects";
import {
  V2_LOCALE_SEGMENTS,
  getLocaleFromSegment,
  getSegmentFromLocale,
  type V2LocaleSegment,
} from "../../../../../i18n/v2";
import {
  getProjectBySlug,
} from "../../../../../data/projects";
import { getProjectJsonLd } from "../../../../../lib/structured-data";
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

  const pagePath = `/${getSegmentFromLocale(locale)}/v2/projetos/${project.slug}`;

  return (
    <>
      <JsonLd data={getProjectJsonLd(project, pagePath, locale)} />
      <ProjectDetailContent project={project} locale={locale} prefixed />
    </>
  );
}

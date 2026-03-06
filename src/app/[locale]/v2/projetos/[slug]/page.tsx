import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailContent from "../../../../../features/v2/project-detail-content";
import { getProjectBySlug, projects } from "../../../../../data/projects";
import {
  V2_LOCALE_SEGMENTS,
  getLocaleFromSegment,
  getSegmentFromLocale,
  type V2LocaleSegment,
} from "../../../../../i18n/v2";

type LocalizedProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return V2_LOCALE_SEGMENTS.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({
  params,
}: LocalizedProjectPageProps): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  const project = getProjectBySlug(slug);

  if (!locale || !project) {
    return { title: "Project not found" };
  }

  const safeSegment = getSegmentFromLocale(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jrvalerio.dev";
  const localizedUrl = `/${safeSegment}/v2/projetos/${project.slug}`;
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(
    project.title
  )}&subtitle=${encodeURIComponent(`${project.category} · ${project.year}`)}`;

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    alternates: {
      canonical: localizedUrl,
    },
    openGraph: {
      type: "article",
      title: `${project.title} | Case Study`,
      description: project.summary,
      url: `${siteUrl}${localizedUrl}`,
      images: [
        {
          url: ogImageUrl,
          alt: `Capa do projeto ${project.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.summary,
      images: [ogImageUrl],
    },
  };
}

export default async function LocalizedProjectPage({ params }: LocalizedProjectPageProps) {
  const { locale: segment, slug } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) notFound();

  return <ProjectDetailContent slug={slug} locale={locale} prefixed />;
}

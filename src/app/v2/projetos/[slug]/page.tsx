import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailContent from "../../../../features/v2/project-detail-content";
import { getProjectBySlug, projects } from "../../../../data/projects";
import { getV2Messages, toLocalePath, type V2Locale } from "../../../../i18n/v2";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function getProjectDetailMetadata(
  slug: string,
  locale: V2Locale = "pt-BR",
  prefixed = false
): Promise<Metadata> {
  const project = getProjectBySlug(slug);
  const messages = getV2Messages(locale);

  if (!project) {
    return { title: messages.caseStudy.notFoundTitle };
  }

  const url = toLocalePath(`/v2/projetos/${project.slug}`, locale, prefixed);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jrvalerio.dev";
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(
    project.title
  )}&subtitle=${encodeURIComponent(`${project.category} · ${project.year}`)}`;
  const title = `${project.title} | ${messages.caseStudy.titleSuffix}`;

  return {
    title,
    description: project.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: `${siteUrl}${url}`,
      images: [
        {
          url: ogImageUrl,
          alt: `${messages.caseStudy.coverAltPrefix} ${project.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [ogImageUrl],
    },
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return getProjectDetailMetadata(slug);
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} locale="pt-BR" prefixed={false} />;
}

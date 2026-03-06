import type { Metadata } from "next";
import ProjectDetailContent from "../../../../features/v2/project-detail-content";
import { getProjectBySlug, projects } from "../../../../data/projects";

type PageParams = {
  slug: string;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Projeto nao encontrado" };
  }

  const url = `/v2/projetos/${project.slug}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jrvalerio.dev";
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(
    project.title
  )}&subtitle=${encodeURIComponent(`${project.category} · ${project.year}`)}`;

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: `${project.title} | Case Study`,
      description: project.summary,
      url: `${siteUrl}${url}`,
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  return <ProjectDetailContent slug={slug} locale="pt-BR" prefixed={false} />;
}


import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Section from "../../../../components/UI/Section";
import CaseStudyViewTracker from "../../../../components/CaseStudyViewTracker";
import ProjectOutboundLinks from "../../../../components/ProjectOutboundLinks";
import { getProjectBySlug, projects } from "../../../../data/projects";
import type { Project } from "../../../../data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentProject = project as Project;

  return (
    <>
      <section className="border-b border-[var(--jr-border)] py-16">
        <div className="jr-container">
          <CaseStudyViewTracker
            slug={currentProject.slug}
            category={currentProject.category}
          />

          <Link href="/v2/projetos" className="jr-link">
            ← Voltar para projetos
          </Link>

          <div className="mt-8">
            <p className="jr-meta mb-2">{currentProject.category}</p>
            <h1 className="jr-hero-title">{currentProject.title}</h1>
            <p className="jr-body mt-5 max-w-3xl text-[var(--jr-muted)]">
              {currentProject.summary}
            </p>
          </div>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--jr-border)]">
            <Image
              src={currentProject.cover}
              alt={`Capa do projeto ${currentProject.title}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {currentProject.stack.map((item) => (
              <span
                key={`${currentProject.slug}-${item}`}
                className="rounded-full border border-[var(--jr-border)] px-3 py-1 text-xs text-[var(--jr-muted)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section title="Challenge" subtitle="Contexto principal do problema de produto.">
        <p className="jr-body max-w-3xl text-[var(--jr-muted)]">{currentProject.challenge}</p>
      </Section>

      <Section title="Solution" subtitle="Direcao de engenharia e experiencia aplicada.">
        <p className="jr-body max-w-3xl text-[var(--jr-muted)]">{currentProject.solution}</p>
      </Section>

      <Section title="Impact" subtitle="Resultado e valor de negocio percebido.">
        <p className="jr-body max-w-3xl text-[var(--jr-muted)]">{currentProject.impact}</p>
        <ul className="mt-6 grid gap-2">
          {currentProject.highlights.map((highlight) => (
            <li
              key={`${currentProject.slug}-${highlight}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <ProjectOutboundLinks
          slug={currentProject.slug}
          category={currentProject.category}
          url={currentProject.url}
          repo={currentProject.repo}
        />
      </Section>
    </>
  );
}

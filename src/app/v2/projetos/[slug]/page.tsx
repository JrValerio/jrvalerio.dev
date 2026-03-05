import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Section from "../../../../components/UI/Section";
import CaseStudyViewTracker from "../../../../components/CaseStudyViewTracker";
import ProjectOutboundLinks from "../../../../components/ProjectOutboundLinks";
import { getProjectBySlug, projects } from "../../../../data/projects";
import type { Project } from "../../../../data/projects";

const Metrics = dynamic(() => import("../../../../components/Metrics"), {
  loading: () => (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      <div className="h-20 animate-pulse rounded-lg bg-[var(--jr-surface)]" />
      <div className="h-20 animate-pulse rounded-lg bg-[var(--jr-surface)]" />
    </div>
  ),
});

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

          <Metrics metrics={currentProject.metrics} />

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

      <Section title="Architecture" subtitle="Camadas principais da solucao em producao.">
        <div className="grid gap-3">
          {currentProject.architecture.map((item) => (
            <article
              key={`${currentProject.slug}-${item.layer}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-4"
            >
              <p className="jr-meta mb-2">{item.layer}</p>
              <p className="text-sm text-[var(--jr-text)]">{item.detail}</p>
            </article>
          ))}
        </div>

        {currentProject.architectureDiagram ? (
          <div className="mt-8 overflow-hidden rounded-xl border border-[var(--jr-border)] bg-[var(--jr-surface)] p-4">
            <Image
              src={currentProject.architectureDiagram}
              alt={`Diagrama de arquitetura do projeto ${currentProject.title}`}
              width={900}
              height={400}
              className="h-auto w-full"
            />
          </div>
        ) : null}
      </Section>

      <Section title="Key Features" subtitle="Capacidades centrais entregues no produto.">
        <ul className="grid gap-2">
          {currentProject.keyFeatures.map((feature) => (
            <li
              key={`${currentProject.slug}-${feature}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              {feature}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Technical Challenges"
        subtitle="Decisoes tecnicas para equilibrar qualidade, entrega e escalabilidade."
      >
        <ul className="grid gap-2">
          {currentProject.technicalChallenges.map((challenge) => (
            <li
              key={`${currentProject.slug}-${challenge}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              {challenge}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tech Stack" subtitle="Ferramentas principais usadas na implementacao.">
        <div className="flex flex-wrap gap-2">
          {currentProject.stack.map((item) => (
            <span
              key={`${currentProject.slug}-stack-${item}`}
              className="rounded-full border border-[var(--jr-border)] px-3 py-1 text-xs text-[var(--jr-muted)]"
            >
              {item}
            </span>
          ))}
        </div>
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
      </Section>

      <Section title="Next Iteration" subtitle="Evolucoes previstas para os proximos ciclos.">
        <ul className="grid gap-2">
          {currentProject.nextIteration.map((item) => (
            <li
              key={`${currentProject.slug}-next-${item}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Links" subtitle="Acesso direto ao produto e ao codigo fonte.">
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

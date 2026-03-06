import Link from "next/link";
import Image from "next/image";
import Section from "../../components/UI/Section";
import CaseStudyViewTracker from "../../components/CaseStudyViewTracker";
import Metrics from "../../components/Metrics";
import ProjectOutboundLinks from "../../components/ProjectOutboundLinks";
import type { Project } from "../../data/projects";
import { getV2Messages, toLocalePath, type V2Locale } from "../../i18n/v2";

type ProjectDetailContentProps = {
  project: Project;
  locale: V2Locale;
  prefixed: boolean;
};

export default function ProjectDetailContent({
  project,
  locale,
  prefixed,
}: ProjectDetailContentProps) {
  const messages = getV2Messages(locale);
  const sectionIds = [
    "challenge",
    "solution",
    "architecture",
    "features",
    "technical-challenges",
    "tech-stack",
    "impact",
    "next-iteration",
    "links",
  ];

  return (
    <>
      <section className="border-b border-[var(--jr-border)] py-16">
        <div className="jr-container">
          <CaseStudyViewTracker project={project} locale={locale} sectionIds={sectionIds} />

          <Link href={toLocalePath("/v2/projetos", locale, prefixed)} className="jr-link">
            ← {messages.caseStudy.back}
          </Link>

          <div className="mt-8">
            <p className="jr-meta mb-2">{project.category}</p>
            <h1 className="jr-hero-title">{project.title}</h1>
            <p className="jr-body mt-5 max-w-3xl text-[var(--jr-muted)]">{project.summary}</p>
          </div>

          <Metrics metrics={project.metrics} labels={messages.caseStudy.metricLabels} />

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--jr-border)]">
            <Image
              src={project.cover}
              alt={`${messages.caseStudy.coverAltPrefix} ${project.title}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={`${project.slug}-${item}`}
                className="rounded-full border border-[var(--jr-border)] px-3 py-1 text-xs text-[var(--jr-muted)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section
        id="challenge"
        analyticsId="challenge"
        title={messages.caseStudy.challenge}
        subtitle={messages.caseStudy.challengeSubtitle}
      >
        <p className="jr-body max-w-3xl text-[var(--jr-muted)]">{project.challenge}</p>
      </Section>

      <Section
        id="solution"
        analyticsId="solution"
        title={messages.caseStudy.solution}
        subtitle={messages.caseStudy.solutionSubtitle}
      >
        <p className="jr-body max-w-3xl text-[var(--jr-muted)]">{project.solution}</p>
      </Section>

      <Section
        id="architecture"
        analyticsId="architecture"
        title={messages.caseStudy.architecture}
        subtitle={messages.caseStudy.architectureSubtitle}
      >
        <div className="grid gap-3">
          {project.architecture.map((item) => (
            <article
              key={`${project.slug}-${item.layer}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-4"
            >
              <p className="jr-meta mb-2">{item.layer}</p>
              <p className="text-sm text-[var(--jr-text)]">{item.detail}</p>
            </article>
          ))}
        </div>

        {project.architectureDiagram ? (
          <div className="mt-8 overflow-hidden rounded-xl border border-[var(--jr-border)] bg-[var(--jr-surface)] p-4">
            <Image
              src={project.architectureDiagram}
              alt={`${messages.caseStudy.architectureDiagramAltPrefix} ${project.title}`}
              width={900}
              height={400}
              className="h-auto w-full"
            />
          </div>
        ) : null}
      </Section>

      <Section
        id="features"
        analyticsId="features"
        title={messages.caseStudy.features}
        subtitle={messages.caseStudy.featuresSubtitle}
      >
        <ul className="grid gap-2">
          {project.keyFeatures.map((feature) => (
            <li
              key={`${project.slug}-${feature}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              {feature}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="technical-challenges"
        analyticsId="technical-challenges"
        title={messages.caseStudy.technicalChallenges}
        subtitle={messages.caseStudy.technicalChallengesSubtitle}
      >
        <ul className="grid gap-2">
          {project.technicalChallenges.map((challenge) => (
            <li
              key={`${project.slug}-${challenge}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              {challenge}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="tech-stack"
        analyticsId="tech-stack"
        title={messages.caseStudy.techStack}
        subtitle={messages.caseStudy.techStackSubtitle}
      >
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={`${project.slug}-stack-${item}`}
              className="rounded-full border border-[var(--jr-border)] px-3 py-1 text-xs text-[var(--jr-muted)]"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section
        id="impact"
        analyticsId="impact"
        title={messages.caseStudy.impact}
        subtitle={messages.caseStudy.impactSubtitle}
      >
        <p className="jr-body max-w-3xl text-[var(--jr-muted)]">{project.impact}</p>
        <ul className="mt-6 grid gap-2">
          {project.highlights.map((highlight) => (
            <li
              key={`${project.slug}-${highlight}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="next-iteration"
        analyticsId="next-iteration"
        title={messages.caseStudy.nextIteration}
        subtitle={messages.caseStudy.nextIterationSubtitle}
      >
        <ul className="grid gap-2">
          {project.nextIteration.map((item) => (
            <li
              key={`${project.slug}-next-${item}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="links"
        analyticsId="links"
        title={messages.caseStudy.links}
        subtitle={messages.caseStudy.linksSubtitle}
      >
        <ProjectOutboundLinks
          slug={project.slug}
          category={project.category}
          url={project.url}
          repo={project.repo}
          labels={messages.caseStudy}
        />
      </Section>
    </>
  );
}

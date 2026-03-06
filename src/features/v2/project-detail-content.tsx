import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyReadingTracker from "../../components/CaseStudyReadingTracker";
import CaseStudySectionNav from "../../components/CaseStudySectionNav";
import CaseStudySectionTracker from "../../components/CaseStudySectionTracker";
import CaseStudyViewTracker from "../../components/CaseStudyViewTracker";
import Metrics from "../../components/Metrics";
import ProjectMeta from "../../components/ProjectMeta";
import ProjectOutboundLinks from "../../components/ProjectOutboundLinks";
import ProjectTimeline from "../../components/projects/ProjectTimeline";
import ReadingProgressBar from "../../components/ReadingProgressBar";
import Section from "../../components/UI/Section";
import { getProjectBySlug, getProjectReadingTime } from "../../data/projects";
import type { Project } from "../../data/projects";
import { getV2Messages, toLocalePath, type V2Locale } from "../../i18n/v2";

type ProjectDetailContentProps = {
  slug: string;
  locale: V2Locale;
  prefixed: boolean;
};

function getCaseStudySections(locale: V2Locale) {
  const copy = getV2Messages(locale).caseStudy;
  return [
    { id: "challenge", label: copy.challenge },
    { id: "solution", label: copy.solution },
    { id: "timeline", label: copy.timeline },
    { id: "architecture", label: copy.architecture },
    { id: "features", label: copy.features },
    { id: "technical-challenges", label: copy.technicalChallenges },
    { id: "tech-stack", label: copy.techStack },
    { id: "impact", label: copy.impact },
    { id: "next-iteration", label: copy.nextIteration },
    { id: "lessons", label: copy.lessons },
    { id: "links", label: copy.links },
  ];
}

export default function ProjectDetailContent({
  slug,
  locale,
  prefixed,
}: ProjectDetailContentProps) {
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentProject = project as Project;
  const readingTime = getProjectReadingTime(currentProject);
  const messages = getV2Messages(locale);
  const caseStudySections = getCaseStudySections(locale);

  return (
    <>
      <ReadingProgressBar ariaLabel={messages.caseStudy.readingProgressAria} />
      <CaseStudyReadingTracker
        slug={currentProject.slug}
        category={currentProject.category}
        estimatedReadMinutes={readingTime}
        locale={locale}
      />
      <CaseStudySectionTracker
        slug={currentProject.slug}
        category={currentProject.category}
        locale={locale}
      />

      <section
        id="overview"
        data-analytics="overview"
        className="border-b border-[var(--jr-border)] py-16"
      >
        <div className="jr-container">
          <CaseStudyViewTracker
            slug={currentProject.slug}
            category={currentProject.category}
            locale={locale}
          />

          <Link href={toLocalePath("/v2/projetos", locale, prefixed)} className="jr-link">
            ← {messages.caseStudy.back}
          </Link>

          <div className="mt-8">
            <p className="jr-meta mb-2">
              {currentProject.category} • {readingTime} {messages.caseStudy.minRead}
            </p>
            <h1 className="jr-hero-title">{currentProject.title}</h1>
            <p className="jr-body jr-prose mt-5 text-[var(--jr-muted)]">{currentProject.summary}</p>
          </div>

          <ProjectMeta
            stack={currentProject.stack}
            year={currentProject.year}
            role={currentProject.role}
            status={currentProject.status}
            locale={locale}
          />

          <CaseStudySectionNav
            items={caseStudySections}
            readingTime={readingTime}
            label={messages.caseStudy.sectionNavigation}
            minReadLabel={messages.caseStudy.minRead}
          />

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

      <Section
        id="challenge"
        analyticsId="problem"
        title={messages.caseStudy.challenge}
        subtitle={messages.caseStudy.challengeSubtitle}
      >
        <p className="jr-body jr-prose text-[var(--jr-muted)]">{currentProject.challenge}</p>
      </Section>

      <Section
        id="solution"
        title={messages.caseStudy.solution}
        subtitle={messages.caseStudy.solutionSubtitle}
      >
        <p className="jr-body jr-prose text-[var(--jr-muted)]">{currentProject.solution}</p>
      </Section>

      {currentProject.timeline?.length ? (
        <Section
          id="timeline"
          title={messages.caseStudy.timeline}
          subtitle={messages.caseStudy.timelineSubtitle}
        >
          <ProjectTimeline steps={currentProject.timeline} />
        </Section>
      ) : null}

      <Section
        id="architecture"
        analyticsId="architecture"
        title={messages.caseStudy.architecture}
        subtitle={messages.caseStudy.architectureSubtitle}
      >
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
          <div className="jr-surface-card mt-8 overflow-hidden p-4">
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

      <Section
        id="features"
        title={messages.caseStudy.features}
        subtitle={messages.caseStudy.featuresSubtitle}
      >
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
        id="technical-challenges"
        title={messages.caseStudy.technicalChallenges}
        subtitle={messages.caseStudy.technicalChallengesSubtitle}
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

      <Section
        id="tech-stack"
        title={messages.caseStudy.techStack}
        subtitle={messages.caseStudy.techStackSubtitle}
      >
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

      <Section
        id="impact"
        analyticsId="results"
        title={messages.caseStudy.impact}
        subtitle={messages.caseStudy.impactSubtitle}
      >
        <p className="jr-body jr-prose text-[var(--jr-muted)]">{currentProject.impact}</p>
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

      <Section
        id="next-iteration"
        title={messages.caseStudy.nextIteration}
        subtitle={messages.caseStudy.nextIterationSubtitle}
      >
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

      <Section id="lessons" title={messages.caseStudy.lessons} subtitle={messages.caseStudy.lessonsSubtitle}>
        <ul className="grid gap-2">
          {currentProject.lessonsLearned.map((item) => (
            <li
              key={`${currentProject.slug}-lesson-${item}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="links" title={messages.caseStudy.links} subtitle={messages.caseStudy.linksSubtitle}>
        <ProjectOutboundLinks
          slug={currentProject.slug}
          category={currentProject.category}
          url={currentProject.url}
          repo={currentProject.repo}
          locale={locale}
        />
      </Section>
    </>
  );
}

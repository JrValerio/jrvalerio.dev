import Link from "next/link";
import EcoVozArchitecture from "../../components/architecture/EcoVozArchitecture";
import Section from "../../components/UI/Section";
import { getV2Messages, toLocalePath, type V2Locale } from "../../i18n/v2";

type ArchitectureContentProps = {
  locale: V2Locale;
  prefixed: boolean;
};

export default function ArchitectureContent({ locale, prefixed }: ArchitectureContentProps) {
  const messages = getV2Messages(locale);

  return (
    <>
      <Section
        title={messages.architecture.title}
        subtitle={messages.architecture.subtitle}
        headingAs="h1"
      >
        <div className="grid gap-4">
          {messages.architecture.layers.map((layer) => (
            <article key={layer.name} className="jr-surface-card p-6">
              <h3 className="text-lg font-semibold text-[var(--jr-text)]">{layer.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--jr-muted)]">
                <strong className="text-[var(--jr-text)]">{messages.architecture.roleLabel}:</strong>{" "}
                {layer.role}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--jr-muted)]">
                <strong className="text-[var(--jr-text)]">{messages.architecture.rationaleLabel}:</strong>{" "}
                {layer.rationale}
              </p>
              <ul className="mt-4 grid gap-2">
                {layer.modules.map((modulePath) => (
                  <li
                    key={`${layer.name}-${modulePath}`}
                    className="rounded-lg border border-[var(--jr-border)] px-3 py-2 text-xs text-[var(--jr-muted)]"
                  >
                    {modulePath}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title={messages.architecture.c4Title}
        subtitle={messages.architecture.c4Subtitle}
      >
        <EcoVozArchitecture />
      </Section>

      <Section
        title={messages.architecture.requestFlowTitle}
        subtitle={messages.architecture.requestFlowSubtitle}
      >
        <ol className="grid gap-2">
          {messages.architecture.requestFlow.map((step, index) => (
            <li
              key={`${index + 1}-${step}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              <span className="mr-2 text-[var(--jr-accent)]">{String(index + 1).padStart(2, "0")}.</span>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      <Section
        title={messages.architecture.relatedTitle}
        subtitle={messages.architecture.relatedSubtitle}
      >
        <div className="flex flex-wrap gap-5">
          <Link href={toLocalePath("/v2/engineering", locale, prefixed)} className="jr-link">
            {messages.architecture.relatedLinks.engineering}
          </Link>
          <Link href={toLocalePath("/v2/projetos", locale, prefixed)} className="jr-link">
            {messages.architecture.relatedLinks.caseStudies}
          </Link>
        </div>
      </Section>
    </>
  );
}


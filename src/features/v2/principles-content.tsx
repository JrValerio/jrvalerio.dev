import Link from "next/link";
import Section from "../../components/UI/Section";
import { getV2Messages, toLocalePath, type V2Locale } from "../../i18n/v2";

type PrinciplesContentProps = {
  locale: V2Locale;
  prefixed: boolean;
};

export default function PrinciplesContent({ locale, prefixed }: PrinciplesContentProps) {
  const messages = getV2Messages(locale);

  return (
    <>
      <Section
        title={messages.principles.title}
        subtitle={messages.principles.subtitle}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {messages.principles.items.map((principle) => (
            <article key={principle.title} className="jr-surface-card p-6">
              <h3 className="text-lg font-semibold text-[var(--jr-text)]">{principle.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--jr-muted)]">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <div className="jr-container">
        <div className="jr-divider" />
      </div>

      <Section
        title={messages.principles.influenceTitle}
        subtitle={messages.principles.influenceSubtitle}
      >
        <div className="grid gap-2">
          {messages.principles.influences.map((item) => (
            <article
              key={item}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              {item}
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-5">
          <Link href={toLocalePath("/v2/engineering", locale, prefixed)} className="jr-link">
            {messages.principles.relatedLinks.engineering}
          </Link>
          <Link href={toLocalePath("/v2/metrics", locale, prefixed)} className="jr-link">
            {messages.principles.relatedLinks.metrics}
          </Link>
          <Link href={toLocalePath("/v2/projetos", locale, prefixed)} className="jr-link">
            {messages.principles.relatedLinks.caseStudies}
          </Link>
        </div>
      </Section>
    </>
  );
}


import Link from "next/link";
import Section from "./UI/Section";
import { getV2Messages, toLocalePath, type V2Locale } from "../i18n/v2";

type EngineeringLinksProps = {
  locale?: V2Locale;
  prefixed?: boolean;
};

const docsPathMap = {
  architecture: "/v2/architecture",
  engineering: "/v2/engineering",
  metrics: "/v2/metrics",
  principles: "/v2/principles",
} as const;

export default function EngineeringLinks({ locale = "pt-BR", prefixed = false }: EngineeringLinksProps) {
  const messages = getV2Messages(locale);

  return (
    <Section
      id="engineering-links"
      title={messages.engineeringLinks.title}
      subtitle={messages.engineeringLinks.subtitle}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {messages.engineeringLinks.docs.map((doc) => (
          <article key={doc.key} className="jr-surface-card p-5">
            <h3 className="text-base font-semibold text-[var(--jr-text)]">{doc.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--jr-muted)]">{doc.description}</p>
            <div className="mt-5">
              <Link href={toLocalePath(docsPathMap[doc.key], locale, prefixed)} className="jr-link">
                {messages.engineeringLinks.open}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

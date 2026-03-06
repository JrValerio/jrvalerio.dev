import Link from "next/link";
import ReadingProgress from "../../components/UI/ReadingProgress";
import Section from "../../components/UI/Section";
import {
  parseAdrSections,
  type AdrFullDocument,
  type AdrSectionBlock,
} from "../../lib/adr";
import { getV2Messages, toLocalePath, type V2Locale } from "../../i18n/v2";

type AdrDetailContentProps = {
  adr: AdrFullDocument;
  locale: V2Locale;
  prefixed: boolean;
};

const localeMap: Record<V2Locale, string> = {
  "pt-BR": "pt-BR",
  "en-GB": "en-GB",
  es: "es-ES",
};

function formatAdrDate(date: string, locale: V2Locale) {
  const value = new Date(`${date}T00:00:00`);

  if (Number.isNaN(value.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(localeMap[locale], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

function renderBlock(block: AdrSectionBlock, key: string) {
  if (block.type === "list") {
    return (
      <ul key={key} className="grid gap-2">
        {block.lines.map((line) => (
          <li
            key={`${key}-${line}`}
            className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
          >
            {line}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={key} className="jr-body max-w-3xl text-[var(--jr-muted)]">
      {block.lines[0]}
    </p>
  );
}

export default function AdrDetailContent({
  adr,
  locale,
  prefixed,
}: AdrDetailContentProps) {
  const messages = getV2Messages(locale);
  const sections = parseAdrSections(adr.content);

  return (
    <>
      <ReadingProgress ariaLabel={messages.engineering.readingProgressAria} />

      <section className="border-b border-[var(--jr-border)] py-16">
        <div className="jr-container">
          <Link href={toLocalePath("/v2/engineering", locale, prefixed)} className="jr-link">
            ← {messages.engineering.backToHub}
          </Link>

          <div className="mt-8">
            <p className="jr-meta mb-2">{adr.id}</p>
            <h1 className="jr-hero-title">{adr.title}</h1>
            <p className="jr-body mt-5 max-w-3xl text-[var(--jr-muted)]">{adr.summary}</p>
          </div>

          {adr.tags.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {adr.tags.map((tag) => (
                <span
                  key={`${adr.slug}-${tag}`}
                  className="rounded-full border border-[var(--jr-border)] px-3 py-1 text-xs text-[var(--jr-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-4">
              <p className="jr-meta-label">{messages.engineering.statusLabel}</p>
              <p className="text-sm text-[var(--jr-text)]">{messages.engineering.status[adr.status]}</p>
            </div>
            <div className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-4">
              <p className="jr-meta-label">{messages.engineering.publishedLabel}</p>
              <p className="text-sm text-[var(--jr-text)]">{formatAdrDate(adr.date, locale)}</p>
            </div>
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          headingAnchorHref={`#${section.id}`}
          headingAnchorLabel={`${messages.engineering.sectionAnchorLabel}: ${section.title}`}
        >
          <div className="grid gap-4">
            {section.blocks.map((block, index) =>
              renderBlock(block, `${section.id}-${index}`)
            )}
          </div>
        </Section>
      ))}
    </>
  );
}

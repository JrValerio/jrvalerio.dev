import Link from "next/link";
import Section from "../../components/UI/Section";
import { getAllAdrs } from "../../lib/adr";
import { getV2Messages, toLocalePath, type V2Locale } from "../../i18n/v2";

type EngineeringContentProps = {
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

export default function EngineeringContent({ locale, prefixed }: EngineeringContentProps) {
  const messages = getV2Messages(locale);
  const adrs = getAllAdrs();

  return (
    <>
      <Section title={messages.engineering.title} subtitle={messages.engineering.subtitle}>
        <div className="grid gap-4">
          {adrs.map((adr) => (
            <article key={adr.id} className="jr-surface-card jr-adr-card p-6">
              <div className="jr-adr-header">
                <div>
                  <p className="jr-meta">{adr.id}</p>
                  <h3 className="jr-adr-title">{adr.title}</h3>
                </div>

                <span
                  className={`jr-adr-status jr-adr-status--${adr.status}`}
                  aria-label={`${messages.engineering.statusLabel}: ${messages.engineering.status[adr.status]}`}
                >
                  {messages.engineering.status[adr.status]}
                </span>
              </div>

              <p className="jr-adr-summary">{adr.summary}</p>

              {adr.tags.length ? (
                <ul className="jr-adr-tag-list" aria-label={messages.engineering.tagsLabel}>
                  {adr.tags.map((tag) => (
                    <li key={`${adr.id}-${tag}`} className="jr-adr-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}

              <footer className="jr-adr-footer">
                <time className="jr-meta" dateTime={adr.date}>
                  {messages.engineering.publishedLabel}: {formatAdrDate(adr.date, locale)}
                </time>
                <div className="flex items-center gap-4">
                  <span className="jr-meta">{adr.slug}</span>
                  <Link
                    href={toLocalePath(`/v2/engineering/${adr.slug}`, locale, prefixed)}
                    className="jr-link"
                  >
                    {messages.engineering.readAdr}
                  </Link>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title={messages.engineering.relatedTitle}
        subtitle={messages.engineering.relatedSubtitle}
      >
        <div className="flex flex-wrap gap-5">
          <Link href={toLocalePath("/v2/architecture", locale, prefixed)} className="jr-link">
            {messages.engineering.relatedLinks.architecture}
          </Link>
          <Link href={toLocalePath("/v2/metrics", locale, prefixed)} className="jr-link">
            {messages.engineering.relatedLinks.metrics}
          </Link>
          <Link href={toLocalePath("/v2/principles", locale, prefixed)} className="jr-link">
            {messages.engineering.relatedLinks.principles}
          </Link>
        </div>
      </Section>
    </>
  );
}

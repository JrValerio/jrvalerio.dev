import Link from "next/link";
import Section from "../../components/UI/Section";
import { getV2Messages, toLocalePath, type V2Locale } from "../../i18n/v2";

type BudgetMetric = {
  route: string;
  limit: string;
  measured: string;
  status: "PASS" | "FAIL";
};

type PipelineStep = {
  command: string;
};

type BundleHistoryPoint = {
  valueKb: number;
};

const budgetMetrics: BudgetMetric[] = [
  {
    route: "/v2/page",
    limit: "110.00 kB (gzip)",
    measured: "104.41 kB (gzip)",
    status: "PASS",
  },
  {
    route: "/v2/projetos/[slug]/page",
    limit: "120.00 kB (gzip)",
    measured: "109.17 kB (gzip)",
    status: "PASS",
  },
];

const pipelineSteps: PipelineStep[] = [
  { command: "npm run typecheck" },
  { command: "npm run lint" },
  { command: "npm run test" },
  { command: "npm run build" },
  { command: "npm run check:bundle && npm run check:bundle:case" },
];

const bundleHistory: BundleHistoryPoint[] = [
  { valueKb: 145 },
  { valueKb: 128 },
  { valueKb: 112 },
  { valueKb: 107 },
];

const maxHistoryValue = Math.max(...bundleHistory.map((point) => point.valueKb));
const initialBundleValue = bundleHistory[0]?.valueKb ?? 0;
const latestBundleValue = bundleHistory[bundleHistory.length - 1]?.valueKb ?? 0;
const bundleReduction = initialBundleValue - latestBundleValue;
const bundleReductionPercent =
  initialBundleValue > 0 ? (bundleReduction / initialBundleValue) * 100 : 0;

type MetricsContentProps = {
  locale: V2Locale;
  prefixed: boolean;
};

export default function MetricsContent({ locale, prefixed }: MetricsContentProps) {
  const messages = getV2Messages(locale);

  return (
    <>
      <Section title={messages.metrics.title} subtitle={messages.metrics.subtitle}>
        <p className="jr-meta">
          {messages.metrics.lastVerifiedLabel}: {messages.metrics.lastVerifiedValue}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {messages.metrics.summaryCards.map((metric) => (
            <article
              key={metric.name}
              className="rounded-xl border border-[var(--jr-border)] bg-[var(--jr-surface)] p-5"
            >
              <p className="jr-meta">{metric.name}</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--jr-text)]">{metric.value}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--jr-muted)]">{metric.note}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title={messages.metrics.bundleEvolutionTitle}
        subtitle={messages.metrics.bundleEvolutionSubtitle}
      >
        <p className="jr-body text-[var(--jr-muted)]">
          {messages.metrics.bundleReductionPrefix}{" "}
          <strong className="text-[var(--jr-text)]">
            {bundleReduction.toFixed(0)} kB ({bundleReductionPercent.toFixed(1)}%)
          </strong>{" "}
          {messages.metrics.bundleReductionSuffix}
        </p>

        <div className="mt-6 grid gap-3">
          {bundleHistory.map((point, index) => {
            const ratio = maxHistoryValue > 0 ? (point.valueKb / maxHistoryValue) * 100 : 0;
            const localizedPoint = messages.metrics.bundleHistory[index];
            if (!localizedPoint) return null;

            return (
              <article
                key={localizedPoint.milestone}
                className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-4"
              >
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-[var(--jr-text)]">
                    {localizedPoint.milestone}
                  </p>
                  <p className="jr-meta">{point.valueKb} kB</p>
                </div>
                <div className="h-2 overflow-hidden rounded bg-[var(--jr-border)]">
                  <div
                    className="h-full rounded bg-[var(--jr-accent)]"
                    style={{ width: `${ratio}%` }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-sm text-[var(--jr-muted)]">{localizedPoint.note}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        title={messages.metrics.bundleBudgetsTitle}
        subtitle={messages.metrics.bundleBudgetsSubtitle}
      >
        <div className="grid gap-4">
          {budgetMetrics.map((item) => (
            <article
              key={item.route}
              className="rounded-xl border border-[var(--jr-border)] bg-[var(--jr-surface)] p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-[var(--jr-text)]">{item.route}</h3>
                <span className="jr-meta rounded-full border border-[var(--jr-border)] px-3 py-1">
                  {item.status}
                </span>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <p className="text-sm text-[var(--jr-muted)]">
                  <strong className="text-[var(--jr-text)]">{messages.metrics.limitLabel}:</strong>{" "}
                  {item.limit}
                </p>
                <p className="text-sm text-[var(--jr-muted)]">
                  <strong className="text-[var(--jr-text)]">{messages.metrics.measuredLabel}:</strong>{" "}
                  {item.measured}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title={messages.metrics.pipelineTitle} subtitle={messages.metrics.pipelineSubtitle}>
        <ol className="grid gap-2">
          {pipelineSteps.map((step, index) => (
            <li
              key={step.command}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3"
            >
              <p className="text-sm text-[var(--jr-text)]">
                <span className="mr-2 text-[var(--jr-accent)]">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <strong>{messages.metrics.pipelineSteps[index]?.step ?? step.command}</strong>
              </p>
              <p className="jr-meta mt-1">{step.command}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--jr-muted)]">
                {messages.metrics.pipelineSteps[index]?.purpose}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={messages.metrics.relatedTitle} subtitle={messages.metrics.relatedSubtitle}>
        <div className="flex flex-wrap gap-5">
          <Link href={toLocalePath("/v2/architecture", locale, prefixed)} className="jr-link">
            {messages.metrics.relatedLinks.architecture}
          </Link>
          <Link href={toLocalePath("/v2/engineering", locale, prefixed)} className="jr-link">
            {messages.metrics.relatedLinks.engineering}
          </Link>
        </div>
      </Section>
    </>
  );
}

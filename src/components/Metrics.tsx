import type { V2Messages } from "../i18n/v2";
import type { ProjectMetrics } from "../data/projects";

type MetricsProps = {
  metrics?: ProjectMetrics;
  labels: V2Messages["caseStudy"]["metricLabels"];
};

export default function Metrics({ metrics, labels }: MetricsProps) {
  if (!metrics) return null;

  const entries = Object.entries(metrics).filter(([, value]) => Boolean(value)) as Array<
    [keyof typeof labels, string]
  >;

  if (!entries.length) return null;

  return (
    <section className="mt-8 grid gap-3 sm:grid-cols-2">
      {entries.map(([key, value]) => (
        <article
          key={key}
          className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-4"
        >
          <p className="jr-meta">{labels[key]}</p>
          <p className="mt-2 text-lg font-semibold text-[var(--jr-text)]">{value}</p>
        </article>
      ))}
    </section>
  );
}

import type { ProjectMetrics } from "../data/projects";

type MetricsProps = {
  metrics?: ProjectMetrics;
};

const metricLabels = {
  accessibilityScore: "Accessibility Score",
  avgLatency: "Avg Response Latency",
  completionRate: "Interaction Success",
  stackSize: "Tech Stack",
} as const;

export default function Metrics({ metrics }: MetricsProps) {
  if (!metrics) return null;

  const entries = Object.entries(metrics).filter(([, value]) => Boolean(value)) as Array<
    [keyof typeof metricLabels, string]
  >;

  if (!entries.length) return null;

  return (
    <section className="mt-8 grid gap-3 sm:grid-cols-2">
      {entries.map(([key, value]) => (
        <article key={key} className="jr-surface-card px-4 py-4">
          <p className="jr-meta">{metricLabels[key]}</p>
          <p className="mt-2 text-lg font-semibold text-[var(--jr-text)]">{value}</p>
        </article>
      ))}
    </section>
  );
}

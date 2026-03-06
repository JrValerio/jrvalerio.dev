import type { Metadata } from "next";
import Link from "next/link";
import Section from "../../../components/UI/Section";

type BudgetMetric = {
  route: string;
  limit: string;
  measured: string;
  status: "PASS" | "FAIL";
};

type PipelineStep = {
  step: string;
  command: string;
  purpose: string;
};

type BundleHistoryPoint = {
  milestone: string;
  valueKb: number;
  note: string;
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
  {
    step: "Type Safety",
    command: "npm run typecheck",
    purpose: "Garantir consistencia de tipos no dominio e nas rotas.",
  },
  {
    step: "Lint",
    command: "npm run lint",
    purpose: "Padronizar qualidade de codigo e evitar regressao de estilo.",
  },
  {
    step: "Domain Tests",
    command: "npm run test",
    purpose: "Validar regras de dominio (slugs, ordenacao e schema minimo).",
  },
  {
    step: "Production Build",
    command: "npm run build",
    purpose: "Assegurar compilacao e geracao estatica sem falhas.",
  },
  {
    step: "Bundle Gate",
    command: "npm run check:bundle && npm run check:bundle:case",
    purpose: "Bloquear merge se o payload ultrapassar o budget definido.",
  },
];

const engineeringMetrics = [
  {
    name: "First Load JS (/v2)",
    value: "107 kB",
    note: "Reducao de ~145 kB para ~107 kB apos otimizacao do Hero.",
  },
  {
    name: "Domain Test Suite",
    value: "7 tests passing",
    note: "Cobertura de dominio para camadas legado e v2.",
  },
  {
    name: "CI Quality Gates",
    value: "6 checks",
    note: "Typecheck, lint, test, build e 2 budgets de bundle.",
  },
];

const bundleHistory: BundleHistoryPoint[] = [
  {
    milestone: "Baseline",
    valueKb: 145,
    note: "Estado inicial antes das otimizacoes de v1.4.",
  },
  {
    milestone: "Hero optimization",
    valueKb: 128,
    note: "Remocao de runtime de animacao no caminho critico.",
  },
  {
    milestone: "Bundle governance",
    valueKb: 112,
    note: "Ajustes de payload com budget e auditoria de chunks.",
  },
  {
    milestone: "Current",
    valueKb: 107,
    note: "Estado atual com budget gate ativo no CI.",
  },
];

const maxHistoryValue = Math.max(...bundleHistory.map((point) => point.valueKb));
const initialBundleValue = bundleHistory[0]?.valueKb ?? 0;
const latestBundleValue = bundleHistory[bundleHistory.length - 1]?.valueKb ?? 0;
const bundleReduction = initialBundleValue - latestBundleValue;
const bundleReductionPercent =
  initialBundleValue > 0 ? (bundleReduction / initialBundleValue) * 100 : 0;

export const metadata: Metadata = {
  title: "Metrics",
  description:
    "Indicadores de engenharia do portfolio v2: performance, budgets de bundle e pipeline de qualidade.",
  alternates: {
    canonical: "/v2/metrics",
  },
};

export default function V2MetricsPage() {
  return (
    <>
      <Section
        title="Metrics"
        subtitle="Indicadores tecnicos usados para governar performance, qualidade e release do portfolio."
      >
        <p className="jr-meta">Last verified: March 6, 2026</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {engineeringMetrics.map((metric) => (
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
        title="Bundle Evolution"
        subtitle="Historico de reducao do First Load JS no ciclo v1.4."
      >
        <p className="jr-body text-[var(--jr-muted)]">
          Reducao acumulada:{" "}
          <strong className="text-[var(--jr-text)]">
            {bundleReduction.toFixed(0)} kB ({bundleReductionPercent.toFixed(1)}%)
          </strong>{" "}
          de melhoria entre o baseline e o estado atual.
        </p>

        <div className="mt-6 grid gap-3">
          {bundleHistory.map((point) => {
            const ratio = maxHistoryValue > 0 ? (point.valueKb / maxHistoryValue) * 100 : 0;
            return (
              <article
                key={point.milestone}
                className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-4"
              >
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-[var(--jr-text)]">{point.milestone}</p>
                  <p className="jr-meta">{point.valueKb} kB</p>
                </div>
                <div className="h-2 overflow-hidden rounded bg-[var(--jr-border)]">
                  <div
                    className="h-full rounded bg-[var(--jr-accent)]"
                    style={{ width: `${ratio}%` }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-sm text-[var(--jr-muted)]">{point.note}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        title="Bundle Budgets"
        subtitle="Baselines monitorados em CI para evitar regressao silenciosa de payload."
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
                  <strong className="text-[var(--jr-text)]">Limit:</strong> {item.limit}
                </p>
                <p className="text-sm text-[var(--jr-muted)]">
                  <strong className="text-[var(--jr-text)]">Measured:</strong> {item.measured}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="CI Pipeline"
        subtitle="Etapas de validacao executadas antes de cada merge para main."
      >
        <ol className="grid gap-2">
          {pipelineSteps.map((step, index) => (
            <li
              key={step.step}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3"
            >
              <p className="text-sm text-[var(--jr-text)]">
                <span className="mr-2 text-[var(--jr-accent)]">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <strong>{step.step}</strong>
              </p>
              <p className="jr-meta mt-1">{step.command}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--jr-muted)]">{step.purpose}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Related Docs" subtitle="Documentacao tecnica conectada a estes indicadores.">
        <div className="flex flex-wrap gap-5">
          <Link href="/v2/architecture" className="jr-link">
            Architecture
          </Link>
          <Link href="/v2/engineering" className="jr-link">
            Engineering
          </Link>
        </div>
      </Section>
    </>
  );
}

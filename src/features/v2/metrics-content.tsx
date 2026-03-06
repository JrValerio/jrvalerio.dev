import Link from "next/link";
import Section from "../../components/UI/Section";
import { projects } from "../../data/projects";
import { toLocalePath, type V2Locale } from "../../i18n/v2";
import type { CaseStudyDashboard } from "../../lib/case-study-dashboard";

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

type EngagementEvent = {
  event: string;
  description: string;
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
    measured: "109.76 kB (gzip)",
    status: "PASS",
  },
  {
    route: "/v2/projetos/[slug]/page",
    limit: "120.00 kB (gzip)",
    measured: "115.98 kB (gzip)",
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

const caseStudyEngagementEvents: EngagementEvent[] = [
  {
    event: "case_view",
    description: "Disparado quando uma pagina de case study e aberta.",
  },
  {
    event: "case_read_start",
    description: "Disparado quando a leitura do case study comeca.",
  },
  {
    event: "case_read_depth",
    description: "Evento de profundidade com payload de depth para analise de funil.",
  },
  {
    event: "case_read_50",
    description: "Disparado quando o visitante atinge 50% da leitura.",
  },
  {
    event: "case_read_90",
    description: "Disparado quando o visitante atinge 90% da leitura.",
  },
  {
    event: "case_read_complete",
    description: "Disparado quando o visitante conclui a leitura (>= 90%).",
  },
  {
    event: "case_outbound_click",
    description: "Evento unificado de clique de saida com target=repo|live.",
  },
  {
    event: "case_outbound_repo",
    description: "Compatibilidade: clique no link de repositorio do case study.",
  },
  {
    event: "case_outbound_live",
    description: "Compatibilidade: clique no link de produto/demo do case study.",
  },
  {
    event: "case_section_view",
    description: "Disparado quando uma secao marcada do case study entra em foco na leitura.",
  },
];

const engineeringMetrics = [
  {
    name: "First Load JS (/v2)",
    value: "109.8 kB",
    note: "Reducao de ~145 kB para payload abaixo do budget de 110 kB.",
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
    valueKb: 110,
    note: "Estado atual com budget gate ativo no CI.",
  },
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
  dashboard: CaseStudyDashboard;
};

const projectTitleBySlug = new Map(projects.map((project) => [project.slug, project.title]));

function getLocaleCode(locale: V2Locale) {
  if (locale === "pt-BR") return "pt-BR";
  if (locale === "es") return "es-ES";
  return "en-GB";
}

export default function MetricsContent({ locale, prefixed, dashboard }: MetricsContentProps) {
  const localeCode = getLocaleCode(locale);
  const decimalFormatter = new Intl.NumberFormat(localeCode, { maximumFractionDigits: 1 });
  const integerFormatter = new Intl.NumberFormat(localeCode, { maximumFractionDigits: 0 });
  const dateFormatter = new Intl.DateTimeFormat(localeCode, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const lastVerified = dateFormatter.format(new Date(dashboard.generatedAt));
  const topProjectLabel = dashboard.topProjectSlug
    ? projectTitleBySlug.get(dashboard.topProjectSlug) ?? dashboard.topProjectSlug
    : "n/a";

  const dashboardMetrics = [
    {
      name: "Top Project",
      value: topProjectLabel,
      note: "Projeto com maior volume de views no periodo analisado.",
    },
    {
      name: "Case Views",
      value: `${integerFormatter.format(dashboard.totals.views)} views`,
      note: `Janela de leitura dos ultimos ${dashboard.windowDays} dias.`,
    },
    {
      name: "Read Completion",
      value: `${decimalFormatter.format(dashboard.totals.completionRate)}%`,
      note: "Percentual de views que atingiram leitura completa.",
    },
    {
      name: "Repo Click Rate",
      value: `${decimalFormatter.format(dashboard.totals.repoClickRate)}%`,
      note: "Conversao de leitura para clique em repositorio.",
    },
  ];

  return (
    <>
      <Section
        title="Metrics"
        subtitle="Indicadores tecnicos usados para governar performance, qualidade e release do portfolio."
      >
        <p className="jr-meta">Last verified: {lastVerified}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {engineeringMetrics.map((metric) => (
            <article key={metric.name} className="jr-surface-card p-5">
              <p className="jr-meta">{metric.name}</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--jr-text)]">{metric.value}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--jr-muted)]">{metric.note}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="Case Study Dashboard"
        subtitle={`Telemetria de leitura e conversao dos case studies (window: ${dashboard.windowDays} days).`}
      >
        <p className="jr-body text-[var(--jr-muted)]">
          Source: <strong className="text-[var(--jr-text)]">{dashboard.source}</strong>
          {dashboard.notice ? (
            <>
              {" "}
              • <span>{dashboard.notice}</span>
            </>
          ) : null}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {dashboardMetrics.map((metric) => (
            <article key={metric.name} className="jr-surface-card p-5">
              <p className="jr-meta">{metric.name}</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--jr-text)]">{metric.value}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--jr-muted)]">{metric.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--jr-border)] bg-[var(--jr-surface)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[var(--jr-border)] text-xs uppercase tracking-wide text-[var(--jr-muted)]">
              <tr>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Completion</th>
                <th className="px-4 py-3">Repo CTR</th>
                <th className="px-4 py-3">Live CTR</th>
                <th className="px-4 py-3">Avg Active</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.rows.map((row) => {
                const projectLabel = projectTitleBySlug.get(row.slug) ?? row.slug;
                return (
                  <tr key={row.slug} className="border-b border-[var(--jr-border)] last:border-b-0">
                    <td className="px-4 py-3 text-[var(--jr-text)]">{projectLabel}</td>
                    <td className="px-4 py-3 text-[var(--jr-muted)]">
                      {integerFormatter.format(row.views)}
                    </td>
                    <td className="px-4 py-3 text-[var(--jr-muted)]">
                      {decimalFormatter.format(row.completionRate)}%
                    </td>
                    <td className="px-4 py-3 text-[var(--jr-muted)]">
                      {decimalFormatter.format(row.repoClickRate)}%
                    </td>
                    <td className="px-4 py-3 text-[var(--jr-muted)]">
                      {decimalFormatter.format(row.liveClickRate)}%
                    </td>
                    <td className="px-4 py-3 text-[var(--jr-muted)]">
                      {row.avgActiveSeconds !== null
                        ? `${decimalFormatter.format(row.avgActiveSeconds)}s`
                        : "n/a"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Bundle Evolution" subtitle="Historico de reducao do First Load JS no ciclo v1.4.">
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
            <article key={item.route} className="jr-surface-card p-6">
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

      <Section title="CI Pipeline" subtitle="Etapas de validacao executadas antes de cada merge para main.">
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

      <Section
        title="Case Study Engagement"
        subtitle="Taxonomia de eventos usada para medir leitura e interesse tecnico nos case studies."
      >
        <div className="grid gap-3">
          {caseStudyEngagementEvents.map((item) => (
            <article key={item.event} className="jr-surface-card p-4">
              <p className="jr-meta">{item.event}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--jr-muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Related Docs" subtitle="Documentacao tecnica conectada a estes indicadores.">
        <div className="flex flex-wrap gap-5">
          <Link href={toLocalePath("/v2/architecture", locale, prefixed)} className="jr-link">
            Architecture
          </Link>
          <Link href={toLocalePath("/v2/engineering", locale, prefixed)} className="jr-link">
            Engineering Decisions
          </Link>
        </div>
      </Section>
    </>
  );
}

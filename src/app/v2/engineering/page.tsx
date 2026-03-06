import type { Metadata } from "next";
import Section from "../../../components/UI/Section";

type Decision = {
  id: string;
  title: string;
  context: string;
  decision: string;
  tradeoffs: string[];
  status: "Active" | "Deprecated";
};

const decisions: Decision[] = [
  {
    id: "bundle-budget",
    title: "Bundle budget como gate de qualidade",
    context:
      "O portfolio tinha risco de regressao silenciosa de performance a cada nova feature.",
    decision:
      "Definimos budget de 110 kB (gzip) para /v2/page e validacao automatica no CI.",
    tradeoffs: [
      "Maior disciplina de performance no fluxo de PR",
      "Necessidade de revisar impacto de novas dependencias antes de merge",
    ],
    status: "Active",
  },
  {
    id: "hybrid-router",
    title: "Migracao progressiva com /v2",
    context:
      "O portfolio original em Pages Router precisava evoluir sem interromper deploy e SEO.",
    decision:
      "Mantivemos estrategia hibrida (pages + app) com identidade principal em /v2.",
    tradeoffs: [
      "Warning conhecido de i18n no App Router durante fase de transicao",
      "Beneficio de rollback facil e migracao segura por etapas",
    ],
    status: "Active",
  },
  {
    id: "analytics-architecture",
    title: "Analytics orientado a produto",
    context:
      "Era necessario medir interesse real por projetos e comportamento de leitura no portfolio.",
    decision:
      "Instrumentamos eventos de funil (views, cliques, scroll depth e web vitals).",
    tradeoffs: [
      "Pequeno custo adicional de JavaScript no cliente",
      "Maior capacidade de decidir roadmap com base em dados",
    ],
    status: "Active",
  },
];

export const metadata: Metadata = {
  title: "Engineering Decisions",
  description:
    "Registro das principais decisoes de engenharia do portfolio: performance, roteamento e observabilidade.",
  alternates: {
    canonical: "/v2/engineering",
  },
};

export default function V2EngineeringPage() {
  return (
    <>
      <Section
        title="Engineering Decisions"
        subtitle="Registro de decisoes tecnicas que guiam arquitetura, performance e qualidade do portfolio."
      >
        <div className="grid gap-4">
          {decisions.map((decision) => (
            <article
              key={decision.id}
              className="rounded-xl border border-[var(--jr-border)] bg-[var(--jr-surface)] p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-[var(--jr-text)]">{decision.title}</h3>
                <span className="jr-meta rounded-full border border-[var(--jr-border)] px-3 py-1">
                  {decision.status}
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-sm leading-7 text-[var(--jr-muted)]">
                  <strong className="text-[var(--jr-text)]">Contexto:</strong> {decision.context}
                </p>
                <p className="text-sm leading-7 text-[var(--jr-muted)]">
                  <strong className="text-[var(--jr-text)]">Decisao:</strong> {decision.decision}
                </p>
                <ul className="grid gap-2">
                  {decision.tradeoffs.map((tradeoff) => (
                    <li
                      key={`${decision.id}-${tradeoff}`}
                      className="rounded-lg border border-[var(--jr-border)] px-3 py-2 text-sm text-[var(--jr-muted)]"
                    >
                      {tradeoff}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

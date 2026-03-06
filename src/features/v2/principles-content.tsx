import Link from "next/link";
import Section from "../../components/UI/Section";
import { toLocalePath, type V2Locale } from "../../i18n/v2";

type Principle = {
  title: string;
  description: string;
};

const principles: Principle[] = [
  {
    title: "Performance budgets first",
    description:
      "Definir limites claros de bundle size, latencia e custo de renderizacao antes de adicionar novas features.",
  },
  {
    title: "Accessibility by default",
    description:
      "Acessibilidade deve existir desde o inicio com HTML semantico, navegacao por teclado e contraste adequado.",
  },
  {
    title: "Observability before scale",
    description:
      "Antes de escalar, o sistema precisa ser observavel com eventos, metricas e monitoramento de erros.",
  },
  {
    title: "Simplicity over abstraction",
    description:
      "Priorizar solucoes simples e explicitas antes de introduzir camadas adicionais de abstracao.",
  },
  {
    title: "Product thinking over framework thinking",
    description:
      "Decisoes de engenharia devem maximizar valor do produto e experiencia do usuario, nao apenas seguir tendencias.",
  },
];

type PrinciplesContentProps = {
  locale: V2Locale;
  prefixed: boolean;
};

export default function PrinciplesContent({ locale, prefixed }: PrinciplesContentProps) {
  return (
    <>
      <Section
        title="Engineering Principles"
        subtitle="Guidelines used when designing and building software systems and products."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
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
        title="How They Influence Projects"
        subtitle="Aplicacao pratica desses principios nos case studies e no pipeline."
      >
        <div className="grid gap-2">
          <article className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]">
            Performance budgets definidos e monitorados no CI com bloqueio de regressao.
          </article>
          <article className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]">
            Instrumentacao de analytics e web vitals para evolucao orientada por dados.
          </article>
          <article className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]">
            Arquitetura em camadas com dominio tipado para manter clareza e manutenibilidade.
          </article>
        </div>

        <div className="mt-8 flex flex-wrap gap-5">
          <Link href={toLocalePath("/v2/engineering", locale, prefixed)} className="jr-link">
            Engineering
          </Link>
          <Link href={toLocalePath("/v2/metrics", locale, prefixed)} className="jr-link">
            Metrics
          </Link>
          <Link href={toLocalePath("/v2/projetos", locale, prefixed)} className="jr-link">
            Case Studies
          </Link>
        </div>
      </Section>
    </>
  );
}


import Link from "next/link";
import EcoVozArchitecture from "../../components/architecture/EcoVozArchitecture";
import Section from "../../components/UI/Section";
import { toLocalePath, type V2Locale } from "../../i18n/v2";

type ArchitectureLayer = {
  name: string;
  role: string;
  modules: string[];
  rationale: string;
};

const layers: ArchitectureLayer[] = [
  {
    name: "Presentation Layer",
    role: "Define rotas e composicao de pagina com App Router.",
    modules: ["/src/app/v2/page.tsx", "/src/app/v2/projetos/[slug]/page.tsx", "/src/app/v2/layout.tsx"],
    rationale:
      "Mantem navegacao e SEO centralizados sem acoplar detalhes de implementacao de componentes.",
  },
  {
    name: "Component Layer",
    role: "Encapsular UI reutilizavel e blocos de experiencia.",
    modules: ["/src/components/Hero.tsx", "/src/components/Work.tsx", "/src/components/ProjectCard.tsx"],
    rationale:
      "Permite evoluir secoes sem duplicar logica entre home, lista de projetos e case studies.",
  },
  {
    name: "Domain/Data Layer",
    role: "Modelar projetos e regras de ordenacao.",
    modules: ["/src/data/projects.ts", "/src/data/projects.test.ts"],
    rationale: "Funciona como fonte unica para portfolio v2 e garante consistencia com testes.",
  },
  {
    name: "Infrastructure Layer",
    role: "Suportar observabilidade, SEO tecnico e governanca de performance.",
    modules: [
      "/src/lib/analytics.ts",
      "/src/app/api/og/route.tsx",
      "/scripts/check-bundle.js",
      "/.github/workflows/ci.yml",
    ],
    rationale:
      "Reduz regressao silenciosa com CI, budget de bundle e telemetria orientada a produto.",
  },
];

const requestFlow = [
  "Usuario acessa /v2 e navega para um case study",
  "App Router resolve rota e metadata canonica/OG",
  "Domain layer entrega dados tipados do projeto",
  "Component layer renderiza secoes de narrativa e links",
  "Infrastructure layer registra eventos e aplica budget gate no CI",
];

type ArchitectureContentProps = {
  locale: V2Locale;
  prefixed: boolean;
};

export default function ArchitectureContent({ locale, prefixed }: ArchitectureContentProps) {
  return (
    <>
      <Section
        title="Architecture"
        subtitle="Visao de como o portfolio v2 organiza camadas, dados e governanca tecnica."
      >
        <div className="grid gap-4">
          {layers.map((layer) => (
            <article key={layer.name} className="jr-surface-card p-6">
              <h3 className="text-lg font-semibold text-[var(--jr-text)]">{layer.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--jr-muted)]">
                <strong className="text-[var(--jr-text)]">Role:</strong> {layer.role}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--jr-muted)]">
                <strong className="text-[var(--jr-text)]">Rationale:</strong> {layer.rationale}
              </p>
              <ul className="mt-4 grid gap-2">
                {layer.modules.map((modulePath) => (
                  <li
                    key={`${layer.name}-${modulePath}`}
                    className="rounded-lg border border-[var(--jr-border)] px-3 py-2 text-xs text-[var(--jr-muted)]"
                  >
                    {modulePath}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="EcoVoz C4 Diagram"
        subtitle="Visao interativa dos niveis C4 de sistema e containers do EcoVoz."
      >
        <EcoVozArchitecture />
      </Section>

      <Section
        title="Request Flow"
        subtitle="Fluxo fim-a-fim de navegacao e entrega de valor no portfolio."
      >
        <ol className="grid gap-2">
          {requestFlow.map((step, index) => (
            <li
              key={`${index + 1}-${step}`}
              className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)]"
            >
              <span className="mr-2 text-[var(--jr-accent)]">{String(index + 1).padStart(2, "0")}.</span>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Related Docs" subtitle="Paginas tecnicas complementares do portfolio v2.">
        <div className="flex flex-wrap gap-5">
          <Link href={toLocalePath("/v2/engineering", locale, prefixed)} className="jr-link">
            Engineering Decisions
          </Link>
          <Link href={toLocalePath("/v2/projetos", locale, prefixed)} className="jr-link">
            Case Studies
          </Link>
        </div>
      </Section>
    </>
  );
}


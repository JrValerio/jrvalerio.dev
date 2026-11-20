import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AvailabilityBadge,
  Button,
  ProjectCard,
  SectionTitle,
  StatList,
  Tabs,
  Tag,
  ThemeTokens,
  palette,
  textPairs,
  themes,
} from "../../design-system";
import { contrastRatio } from "../../design-system/contrast";
import { fontVariables } from "../../design-system/fonts";
import type { ThemeName } from "../../design-system/tokens";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

// Internal reference for the redesign. Built and reachable on previews and
// locally; production renders 404 until the new pages ship.
const isProduction = process.env.VERCEL_ENV === "production";

const stats = [
  { value: "4", label: "Anos programando" },
  { value: "6", label: "Produtos em produção" },
  { value: "27", label: "PRs entregues pelo Agente DEV" },
];

const projects = [
  {
    title: "Control Finance",
    summary: "SaaS de finanças pessoais com importação de faturas, metas e simulador de day trade.",
    href: "#control-finance",
    tags: ["React", "Node", "PostgreSQL", "Cloud Run"],
    status: "No ar",
  },
  {
    title: "EcoVoz",
    summary: "Plataforma de comunicação assistiva por voz, gesto e símbolos.",
    href: "#ecovoz",
    tags: ["React", "TypeScript", "Acessibilidade"],
    status: "No ar",
  },
  {
    title: "Agente DEV",
    summary: "Agente que diagnostica, propõe lotes e entrega PRs nos meus projetos.",
    href: "#agente-dev",
    tags: ["Claude", "GitHub", "Vercel"],
    status: "Em uso",
  },
];

function Showcase({ theme }: { theme: ThemeName }) {
  const t = themes[theme];
  return (
    <section
      data-jv-theme={theme}
      aria-label={theme === "dark" ? "Tema escuro" : "Tema claro"}
      className="jv flex flex-col gap-14 bg-[var(--jv-bg)] px-6 py-14 text-[var(--jv-fg)] md:px-14"
    >
      <SectionTitle eyebrow={`Tema ${theme === "dark" ? "escuro" : "claro"}`} as="h2">
        Fundação visual
      </SectionTitle>

      <div className="flex flex-col gap-4">
        <h3 className="font-[family-name:var(--jv-font-mono)] text-xs tracking-[0.18em] text-[var(--jv-muted)] uppercase">
          Contraste dos pares de texto
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {textPairs.map((pair) => {
            const ratio = contrastRatio(t[pair.text], t[pair.on]);
            return (
              <li
                key={`${pair.text}-${pair.on}`}
                className="flex items-center justify-between gap-4 rounded-md border border-[var(--jv-border)] p-4"
                style={{ background: t[pair.on], color: t[pair.text] }}
              >
                <span className="text-sm font-bold">
                  {pair.text} / {pair.on}
                  <span className="block text-xs font-normal">{pair.usage}</span>
                </span>
                <span className="font-[family-name:var(--jv-font-mono)] text-sm">{ratio.toFixed(2)}:1</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-4">
          <p className="font-[family-name:var(--jv-font-script)] text-4xl text-[var(--jv-accent)]">Olá, eu sou</p>
          <p className="font-[family-name:var(--jv-font-display)] text-[clamp(4rem,9vw,7rem)] leading-[0.9] uppercase">
            <span className="block">Amaro</span>
            <span className="block pt-[0.2em]">
              Júnior<span className="text-[var(--jv-accent)]">.</span>
            </span>
          </p>
          <p className="text-[15px] font-extrabold tracking-[0.1em] text-[var(--jv-accent)]">
            DESENVOLVEDOR FULL-STACK &amp; AGENTES DE IA
          </p>
          <p className="max-w-md leading-relaxed text-[var(--jv-muted)]">
            Construo produtos web e mobile de ponta a ponta e os agentes que diagnosticam, corrigem e colocam
            esses produtos no ar.
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Button href="#projetos">Ver projetos ↓</Button>
            <Button href="#agente" variant="link">
              Ver o Agente DEV em ação
            </Button>
            <Button variant="ghost">Vamos conversar ↗</Button>
          </div>
          <AvailabilityBadge>Disponível para novos projetos</AvailabilityBadge>
          <div className="flex flex-wrap gap-2">
            <Tag tone="accent">diagnóstico</Tag>
            <Tag>Next 16</Tag>
            <Tag>TypeScript</Tag>
          </div>
        </div>
        <StatList label="Números" items={stats} />
      </div>

      <Tabs
        label="Filtrar projetos"
        items={[
          {
            id: "todos",
            label: "Todos",
            panel: (
              <ul className="grid gap-4 md:grid-cols-3">
                {projects.map((p, i) => (
                  <li key={p.title}>
                    <ProjectCard index={i + 1} {...p} />
                  </li>
                ))}
              </ul>
            ),
          },
          {
            id: "agentes",
            label: "Agentes",
            panel: (
              <ul className="grid gap-4 md:grid-cols-3">
                <li>
                  <ProjectCard index={3} {...projects[2]} />
                </li>
              </ul>
            ),
          },
          {
            id: "produtos",
            label: "Produtos",
            panel: (
              <ul className="grid gap-4 md:grid-cols-3">
                {projects.slice(0, 2).map((p, i) => (
                  <li key={p.title}>
                    <ProjectCard index={i + 1} {...p} />
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
      />
    </section>
  );
}

export default function DesignSystemPage() {
  if (isProduction) notFound();

  return (
    <main className={`${fontVariables} font-[family-name:var(--jv-font-body)]`}>
      <ThemeTokens />
      <header className="jv flex flex-wrap items-center gap-3 border-b border-[var(--jv-border)] bg-[var(--jv-bg)] px-6 py-6 md:px-14">
        <h1 className="font-[family-name:var(--jv-font-display)] text-2xl text-[var(--jv-fg)] uppercase">
          jrvalerio.dev — design system
        </h1>
        <ul className="flex flex-wrap gap-2" aria-label="Paleta">
          {Object.entries(palette).map(([name, hex]) => (
            <li
              key={name}
              className="flex items-center gap-2 rounded-full border border-[var(--jv-border)] py-1 pr-3 pl-1 font-[family-name:var(--jv-font-mono)] text-xs text-[var(--jv-fg)]"
            >
              <span aria-hidden="true" className="size-5 rounded-full border border-[var(--jv-border)]" style={{ background: hex }} />
              {name} {hex}
            </li>
          ))}
        </ul>
      </header>
      <Showcase theme="dark" />
      <Showcase theme="light" />
    </main>
  );
}

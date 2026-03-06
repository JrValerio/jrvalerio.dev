import { type V2Locale, toLocalePath } from "../i18n/v2";

export type SearchIndexItem = {
  title: string;
  description: string;
  path: string;
  group: "Page" | "Project";
  keywords: string[];
};

function getLocalizedBaseIndex(locale: V2Locale): Omit<SearchIndexItem, "path">[] {
  if (locale === "en-GB") {
    return [
      {
        title: "Home",
        description: "Main hub with featured projects and engineering links.",
        group: "Page",
        keywords: ["home", "hub", "portfolio"],
      },
      {
        title: "Projects",
        description: "Product and engineering case studies.",
        group: "Page",
        keywords: ["projects", "case study", "work"],
      },
      {
        title: "Archive",
        description: "History of previous projects and iterations.",
        group: "Page",
        keywords: ["archive", "history", "legacy"],
      },
      {
        title: "Architecture",
        description: "Layered architecture overview and interactive C4 diagram.",
        group: "Page",
        keywords: ["architecture", "c4", "diagram", "system design"],
      },
      {
        title: "Engineering",
        description: "ADRs and technical decisions with trade-offs and impact.",
        group: "Page",
        keywords: ["engineering", "adr", "decisions", "trade-offs"],
      },
      {
        title: "Metrics",
        description: "Bundle budgets, quality pipeline and delivery metrics.",
        group: "Page",
        keywords: ["metrics", "bundle", "performance", "ci"],
      },
      {
        title: "Principles",
        description: "Engineering principles guiding product decisions.",
        group: "Page",
        keywords: ["principles", "manifesto", "engineering principles"],
      },
      {
        title: "About",
        description: "Professional summary and engineering focus.",
        group: "Page",
        keywords: ["about", "profile", "career"],
      },
      {
        title: "Contact",
        description: "Contact channels and availability.",
        group: "Page",
        keywords: ["contact", "email", "linkedin", "github"],
      },
      {
        title: "EcoVoz",
        description: "Multimodal assistive communication platform.",
        group: "Project",
        keywords: ["ecovoz", "accessibility", "next.js", "node.js", "websocket", "mediapipe"],
      },
      {
        title: "Control Finance",
        description: "Personal finance management application.",
        group: "Project",
        keywords: ["control finance", "fintech", "react", "tailwind"],
      },
      {
        title: "JR Minimal Portfolio",
        description: "Engineering-first portfolio platform with C4 docs, ADRs and metrics.",
        group: "Project",
        keywords: ["portfolio", "engineering docs", "c4", "adr", "next.js"],
      },
      {
        title: "Kenzie Hub",
        description: "Technical evolution case from bootcamp project to more robust architecture.",
        group: "Project",
        keywords: ["kenzie hub", "education", "refactor", "api", "react"],
      },
    ];
  }

  if (locale === "es") {
    return [
      {
        title: "Inicio",
        description: "Hub principal con proyectos destacados y enlaces de ingenieria.",
        group: "Page",
        keywords: ["inicio", "hub", "portfolio"],
      },
      {
        title: "Proyectos",
        description: "Case studies de producto e ingenieria.",
        group: "Page",
        keywords: ["proyectos", "case study", "work"],
      },
      {
        title: "Archivo",
        description: "Historial de proyectos e iteraciones anteriores.",
        group: "Page",
        keywords: ["archivo", "historial", "legacy"],
      },
      {
        title: "Arquitectura",
        description: "Vision de arquitectura en capas y diagrama C4 interactivo.",
        group: "Page",
        keywords: ["arquitectura", "c4", "diagrama", "system design"],
      },
      {
        title: "Ingenieria",
        description: "ADRs y decisiones tecnicas con trade-offs e impacto.",
        group: "Page",
        keywords: ["ingenieria", "adr", "decisiones", "trade-offs"],
      },
      {
        title: "Metricas",
        description: "Presupuestos de bundle, calidad y pipeline de entrega.",
        group: "Page",
        keywords: ["metricas", "bundle", "performance", "ci"],
      },
      {
        title: "Principios",
        description: "Principios de ingenieria que guian el producto.",
        group: "Page",
        keywords: ["principios", "manifesto", "engineering principles"],
      },
      {
        title: "Sobre mi",
        description: "Resumen profesional, foco tecnico y contexto de carrera.",
        group: "Page",
        keywords: ["sobre", "profile", "career"],
      },
      {
        title: "Contacto",
        description: "Canales de contacto y disponibilidad para oportunidades.",
        group: "Page",
        keywords: ["contacto", "email", "linkedin", "github"],
      },
      {
        title: "EcoVoz",
        description: "Plataforma multimodal de comunicacion asistiva.",
        group: "Project",
        keywords: ["ecovoz", "accessibility", "next.js", "node.js", "websocket", "mediapipe"],
      },
      {
        title: "Control Finance",
        description: "Aplicacion de gestion financiera personal.",
        group: "Project",
        keywords: ["control finance", "fintech", "react", "tailwind"],
      },
      {
        title: "JR Minimal Portfolio",
        description: "Portfolio orientado a ingenieria con C4, ADRs y metricas.",
        group: "Project",
        keywords: ["portfolio", "engineering docs", "c4", "adr", "next.js"],
      },
      {
        title: "Kenzie Hub",
        description: "Caso de evolucion tecnica de proyecto academico para arquitectura mas robusta.",
        group: "Project",
        keywords: ["kenzie hub", "education", "refactor", "api", "react"],
      },
    ];
  }

  return [
    {
      title: "Home",
      description: "Hub principal com projetos em destaque e links de engenharia.",
      group: "Page",
      keywords: ["home", "inicio", "hub", "portfolio"],
    },
    {
      title: "Projetos",
      description: "Lista de case studies de produto e engenharia.",
      group: "Page",
      keywords: ["projects", "projetos", "case study", "work"],
    },
    {
      title: "Archive",
      description: "Historico de projetos e iteracoes anteriores.",
      group: "Page",
      keywords: ["archive", "historico", "legacy"],
    },
    {
      title: "Architecture",
      description: "Visao de arquitetura em camadas e diagrama C4 interativo.",
      group: "Page",
      keywords: ["architecture", "c4", "diagram", "system design"],
    },
    {
      title: "Engineering",
      description: "ADRs e decisoes tecnicas com trade-offs e impacto.",
      group: "Page",
      keywords: ["engineering", "adr", "decisions", "trade-offs"],
    },
    {
      title: "Metrics",
      description: "Budgets de bundle, qualidade e pipeline de entrega.",
      group: "Page",
      keywords: ["metrics", "bundle", "performance", "ci"],
    },
    {
      title: "Principles",
      description: "Principios de engenharia que orientam o produto.",
      group: "Page",
      keywords: ["principles", "manifesto", "engineering principles"],
    },
    {
      title: "Sobre",
      description: "Resumo profissional, foco tecnico e contexto de carreira.",
      group: "Page",
      keywords: ["about", "sobre", "profile"],
    },
    {
      title: "Contato",
      description: "Canais de contato e disponibilidade para oportunidades.",
      group: "Page",
      keywords: ["contact", "contato", "email", "linkedin", "github"],
    },
    {
      title: "EcoVoz",
      description: "Plataforma multimodal de comunicacao assistiva.",
      group: "Project",
      keywords: ["ecovoz", "accessibility", "next.js", "node.js", "websocket", "mediapipe"],
    },
    {
      title: "Control Finance",
      description: "Aplicacao para gestao financeira pessoal.",
      group: "Project",
      keywords: ["control finance", "fintech", "react", "tailwind"],
    },
    {
      title: "JR Minimal Portfolio",
      description: "Portfolio orientado a engenharia com C4, ADRs e metricas.",
      group: "Project",
      keywords: ["portfolio", "engineering docs", "c4", "adr", "next.js"],
    },
    {
      title: "Kenzie Hub",
      description: "Case de evolucao tecnica de projeto academico para arquitetura mais robusta.",
      group: "Project",
      keywords: ["kenzie hub", "education", "refactor", "api", "react"],
    },
  ];
}

const basePaths = [
  "/v2",
  "/v2/projetos",
  "/v2/archive",
  "/v2/architecture",
  "/v2/engineering",
  "/v2/metrics",
  "/v2/principles",
  "/v2/sobre",
  "/v2/contato",
  "/v2/projetos/ecovoz",
  "/v2/projetos/control-finance",
  "/v2/projetos/jr-minimal-portfolio",
  "/v2/projetos/kenzie-hub",
];

export function getSearchIndex(locale: V2Locale, prefixed: boolean): SearchIndexItem[] {
  const localized = getLocalizedBaseIndex(locale);
  return localized.map((item, index) => ({
    ...item,
    path: toLocalePath(basePaths[index] ?? "/v2", locale, prefixed),
  }));
}

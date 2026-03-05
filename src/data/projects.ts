export type ProjectMetrics = {
  accessibilityScore?: string;
  avgLatency?: string;
  completionRate?: string;
  stackSize?: string;
};

export type Tech =
  | "Accessibility"
  | "Express"
  | "HTMX"
  | "JavaScript"
  | "Next.js"
  | "Node.js"
  | "React"
  | "SASS"
  | "SQLite"
  | "Tailwind CSS"
  | "TypeScript";

export type Project = {
  slug: string;
  title: string;
  year: string;
  updatedAt: Date;
  category: string;
  cover: string;
  summary: string;
  stack: Tech[];
  metrics?: ProjectMetrics;
  challenge: string;
  solution: string;
  architecture: {
    layer: string;
    detail: string;
  }[];
  architectureDiagram?: string;
  keyFeatures: string[];
  technicalChallenges: string[];
  nextIteration: string[];
  impact: string;
  highlights: string[];
  url?: string;
  repo?: string;
};

export type ArchivedProject = {
  slug: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  stack: string[];
  url?: string;
  repo?: string;
};

const projectEntries: Project[] = [
  {
    slug: "ecovoz",
    title: "EcoVoz",
    year: "2026",
    updatedAt: new Date("2026-03-05"),
    category: "Accessibility",
    cover: "/diagrams/ecovoz-architecture.svg",
    summary:
      "Produto de acessibilidade com foco em comunicacao assistiva e experiencia inclusiva.",
    stack: ["Next.js", "TypeScript", "Node.js", "Accessibility"],
    metrics: {
      accessibilityScore: "98",
      avgLatency: "120ms",
      completionRate: "94%",
      stackSize: "7 libs",
    },
    challenge:
      "Pessoas com diferentes necessidades de comunicacao tinham baixa autonomia em interfaces digitais tradicionais.",
    solution:
      "Desenho de fluxo assistivo com foco em legibilidade, navegacao reduzida e componentes com semantica forte.",
    architecture: [
      {
        layer: "Frontend",
        detail: "Next.js + TypeScript para SSR, acessibilidade semantica e UI responsiva.",
      },
      {
        layer: "Interaction Layer",
        detail: "Entrada multimodal com voz, teclado e componentes de comunicacao assistiva.",
      },
      {
        layer: "API",
        detail: "Node.js para orquestracao de intents, sessao e persistencia de contexto.",
      },
      {
        layer: "Data",
        detail: "PostgreSQL para perfis de usuario, frases frequentes e historico de uso.",
      },
    ],
    architectureDiagram: "/diagrams/ecovoz-architecture.svg",
    keyFeatures: [
      "Board AAC com frases de acao rapida",
      "Fluxo orientado a baixa carga cognitiva",
      "Navegacao reduzida para uso assistivo",
    ],
    technicalChallenges: [
      "Garantir interacao com latencia baixa em dispositivos modestos",
      "Manter consistencia entre leitura visual e feedback sonoro",
      "Modelar componentes acessiveis com foco em uso real",
    ],
    nextIteration: [
      "Refinar recognition pipeline para reduzir ruido em ambientes externos",
      "Adicionar painel de configuracao para terapeutas",
      "Executar piloto controlado com validacao clinica",
    ],
    impact:
      "Base do produto validada para evoluir como case principal de impacto social e UX inclusiva.",
    highlights: [
      "Interface orientada a acessibilidade e clareza",
      "Arquitetura preparada para evolucao full-stack",
      "Foco em experiencias com alto valor social",
    ],
  },
  {
    slug: "control-finance",
    title: "Control Finance",
    year: "2025",
    updatedAt: new Date("2025-11-10"),
    category: "Fintech",
    cover: "/projects/control-finance.jpg",
    summary:
      "Aplicacao para gestao financeira pessoal com UX direta, visualizacoes simples e foco em acao.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    metrics: {
      avgLatency: "140ms",
      completionRate: "92%",
      stackSize: "6 libs",
    },
    challenge:
      "Usuarios precisavam registrar entradas e saidas de forma rapida sem friccao na interface.",
    solution:
      "Experiencia centrada em tarefas com filtros claros, feedback imediato e leitura visual do saldo.",
    architecture: [
      {
        layer: "Frontend",
        detail: "React + Tailwind para fluxo de lancamentos e leitura de saldo.",
      },
      {
        layer: "State Management",
        detail: "Estado local e derivado para filtros, categorias e consolidacao de valores.",
      },
      {
        layer: "Persistence",
        detail: "Camada de armazenamento para manter transacoes e preferencias de visualizacao.",
      },
    ],
    keyFeatures: [
      "Cadastro de entradas e saidas em poucos passos",
      "Filtros por tipo de transacao e categoria",
      "Resumo financeiro com leitura visual direta",
    ],
    technicalChallenges: [
      "Evitar inconsistencias no calculo de saldo em atualizacoes sequenciais",
      "Garantir UX rapida em formularios com validacao de valores",
      "Manter componentes financeiros reutilizaveis e testaveis",
    ],
    nextIteration: [
      "Adicionar metas financeiras com alertas inteligentes",
      "Introduzir exportacao de relatorios por periodo",
      "Expandir cobertura de testes para fluxos de filtro e saldo",
    ],
    impact:
      "Projeto com boa tracao em portfolio por demonstrar UX funcional e consistencia de front-end.",
    highlights: [
      "Fluxo de cadastro e filtragem de transacoes",
      "Interface objetiva para leitura de saldo",
      "Entrega orientada a experiencia do usuario",
    ],
    url: "https://control-finance-react-tail-wind.vercel.app/",
    repo: "https://github.com/JrValerio/Control-Finance-React-TailWind",
  },
  {
    slug: "postit",
    title: "Post-it Share App",
    year: "2025",
    updatedAt: new Date("2025-08-20"),
    category: "Productivity",
    cover: "/projects/postit.jpg",
    summary:
      "Aplicacao minimalista para criacao e compartilhamento de notas com links curtos.",
    stack: ["Node.js", "Express", "HTMX", "SQLite"],
    metrics: {
      avgLatency: "110ms",
      completionRate: "96%",
      stackSize: "5 libs",
    },
    challenge:
      "Criar um produto leve para compartilhamento de notas sem onboarding complexo.",
    solution:
      "Stack enxuta com server rendering progressivo e foco em velocidade de criacao/compartilhamento.",
    architecture: [
      {
        layer: "Web Layer",
        detail: "Node.js + Express para rotas simples de criacao e leitura de notas.",
      },
      {
        layer: "Interaction",
        detail: "HTMX para atualizacoes parciais sem SPA completa.",
      },
      {
        layer: "Data",
        detail: "SQLite para persistencia local e custo operacional baixo.",
      },
    ],
    keyFeatures: [
      "Criacao de notas em poucos cliques",
      "Compartilhamento por link curto",
      "Fluxo sem cadastro para uso imediato",
    ],
    technicalChallenges: [
      "Balancear simplicidade de UX com robustez minima de backend",
      "Evitar colisao de links curtos e manter rastreabilidade",
      "Preservar performance com consultas simples e seguras",
    ],
    nextIteration: [
      "Adicionar modo colaborativo de notas compartilhadas",
      "Criar camada de analytics por link publico",
      "Evoluir politicas de expiracao e recuperacao de notas",
    ],
    impact:
      "Case tecnico forte para demonstrar back-end pragmatico e entrega de produto simples e util.",
    highlights: [
      "Fluxo de criacao de notas em poucos cliques",
      "Arquitetura simples com Node.js + SQLite",
      "Melhorias de qualidade com padronizacao de codigo",
    ],
    url: "https://postit-8nii.onrender.com/",
    repo: "https://github.com/JrValerio/postit",
  },
  {
    slug: "kenzie-hub",
    title: "Kenzie Hub",
    year: "2024",
    updatedAt: new Date("2024-10-05"),
    category: "Education",
    cover: "/projects/kenzie-hub.jpg",
    summary:
      "Painel para acompanhar evolucao tecnica e organizar tecnologias em aprendizado.",
    stack: ["React", "TypeScript", "SASS"],
    metrics: {
      avgLatency: "160ms",
      completionRate: "90%",
      stackSize: "8 libs",
    },
    challenge:
      "Usuarios precisavam visualizar sua evolucao tecnica em uma unica area de controle.",
    solution:
      "Dashboard para gerenciar habilidades com foco em estado global e experiencias de formulario.",
    architecture: [
      {
        layer: "Frontend",
        detail: "React + TypeScript para dashboard com formularios e componentes reutilizaveis.",
      },
      {
        layer: "State",
        detail: "Gerenciamento de estado para autenticacao e atualizacao de tecnologias.",
      },
      {
        layer: "UX",
        detail: "Fluxos de cadastro e edicao com feedback de acao e validacao.",
      },
    ],
    keyFeatures: [
      "Gestao de tecnologias por usuario",
      "CRUD de niveis de conhecimento",
      "Dashboard com foco em progresso tecnico",
    ],
    technicalChallenges: [
      "Sincronizar estado de usuario com atualizacao de lista",
      "Evitar regressao em formularios com validacoes encadeadas",
      "Organizar componentes para evolucao de novas features",
    ],
    nextIteration: [
      "Introduzir trilhas de estudo por nivel tecnico",
      "Adicionar painel de progresso semanal",
      "Melhorar onboarding para primeiro cadastro de tecnologias",
    ],
    impact:
      "Projeto consolidado como demonstracao de competencias de React e TypeScript em contexto real.",
    highlights: [
      "Gestao de tecnologias por usuario",
      "Fluxos de formulario com validacao",
      "Organizacao de estado e componentes reutilizaveis",
    ],
    url: "https://kenzie-hub-seven-blue.vercel.app/",
    repo: "https://github.com/JrValerio/Kenzie-Hub",
  },
];

export const projects: Project[] = [...projectEntries].sort((a, b) =>
  b.updatedAt.getTime() - a.updatedAt.getTime()
);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const archivedProjects: ArchivedProject[] = [
  {
    slug: "portfolio-template-jrvalerio",
    title: "Portfolio Template",
    year: "2025",
    category: "Template",
    summary: "Template de portfolio com foco em deploy rapido e customizacao.",
    stack: ["React", "CSS", "Vercel"],
    url: "https://portfolio-template-jr-valerio.vercel.app/",
    repo: "https://github.com/JrValerio/portfolio-template-JrValerio",
  },
  {
    slug: "template-hamburgueria",
    title: "Hamburgueria Kenzie",
    year: "2025",
    category: "E-commerce",
    summary: "Projeto de estudo para fluxo de carrinho e catalogo de produtos.",
    stack: ["React", "Axios", "SASS"],
    url: "https://template-hamburgueria.vercel.app/",
    repo: "https://github.com/JrValerio/template-hamburgueria",
  },
  {
    slug: "buscadorcep",
    title: "Buscador de CEP",
    year: "2024",
    category: "Utility",
    summary: "Consulta de CEP com integracao de API e validacao de entrada.",
    stack: ["React", "JavaScript", "Axios"],
    url: "https://buscadorcep-3qzvzd239-amaro-juniors-projects.vercel.app/",
    repo: "https://github.com/JrValerio/buscadorcep",
  },
  {
    slug: "gitsearchbase",
    title: "Git Search",
    year: "2024",
    category: "Frontend",
    summary: "Busca de perfis e repositorios com API do GitHub.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://jrvalerio.github.io/gitSearchBase/index.html",
    repo: "https://github.com/JrValerio/gitSearchBase",
  },
  {
    slug: "newsportal",
    title: "News Portal",
    year: "2024",
    category: "Frontend",
    summary: "Layout editorial responsivo para estudo de composicao visual.",
    stack: ["HTML", "CSS"],
    url: "https://jrvalerio.github.io/newsportal/",
    repo: "https://github.com/JrValerio/newsportal",
  },
  {
    slug: "travelgram",
    title: "Travelgram",
    year: "2024",
    category: "Frontend",
    summary: "Landing page para conteudo de viagens com foco em UI responsiva.",
    stack: ["HTML", "CSS"],
    url: "https://jrvalerio.github.io/travelgram/",
    repo: "https://github.com/JrValerio/travelgram",
  },
];

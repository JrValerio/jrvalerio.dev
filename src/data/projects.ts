export type ProjectMetrics = {
  accessibilityScore?: string;
  avgLatency?: string;
  completionRate?: string;
  stackSize?: string;
};

export enum ProjectCategory {
  Accessibility = "Accessibility",
  Education = "Education",
  Fintech = "Fintech",
  Productivity = "Productivity",
}

export type ProjectStatus = "active" | "completed" | "experimental";

export type ProjectTimelineStep = {
  phase: string;
  description: string;
  date?: string;
};

export type Tech =
  | "Accessibility"
  | "Express"
  | "HTMX"
  | "JavaScript"
  | "MediaPipe"
  | "Next.js"
  | "Node.js"
  | "React"
  | "SASS"
  | "SQLite"
  | "Tailwind CSS"
  | "TypeScript"
  | "WebSocket";

export type Project = {
  slug: string;
  title: string;
  year: number;
  updatedAt: Date;
  category: ProjectCategory;
  role: string;
  status: ProjectStatus;
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
  timeline?: ProjectTimelineStep[];
  lessonsLearned: string[];
  impact: string;
  highlights: string[];
  url?: string;
  repo?: string;
};

export type ArchivedProject = {
  slug: string;
  title: string;
  year: number;
  category: string;
  summary: string;
  stack: string[];
  url?: string;
  repo?: string;
};

export function sortProjectsByUpdatedAt(input: Project[]) {
  return [...input].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

export function getProjectReadingTime(project: Project) {
  const combinedText = [
    project.summary,
    project.challenge,
    project.solution,
    project.impact,
    ...project.keyFeatures,
    ...project.technicalChallenges,
    ...project.nextIteration,
    ...(project.timeline?.map((step) => `${step.phase} ${step.description}`) ?? []),
    ...project.lessonsLearned,
    ...project.highlights,
    ...project.architecture.map((item) => item.detail),
  ].join(" ");

  const words = combinedText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const projectEntries: Project[] = [
  {
    slug: "ecovoz",
    title: "EcoVoz",
    year: 2026,
    updatedAt: new Date("2026-03-05"),
    category: ProjectCategory.Accessibility,
    role: "Full-Stack Developer",
    status: "active",
    cover: "/diagrams/ecovoz-architecture.svg",
    summary:
      "Produto de acessibilidade com foco em comunicacao assistiva e experiencia inclusiva.",
    stack: ["Next.js", "Node.js", "WebSocket", "MediaPipe"],
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
    timeline: [
      {
        phase: "Ideation",
        description: "Conceito inicial de uma plataforma de comunicacao assistiva multimodal.",
        date: "2026-01",
      },
      {
        phase: "Prototype",
        description: "Primeiros testes com entrada por voz e fluxo assistivo de baixa friccao.",
        date: "2026-01",
      },
      {
        phase: "Architecture",
        description: "Definicao da arquitetura com Next.js, Node.js e camadas de dados.",
        date: "2026-02",
      },
      {
        phase: "MVP",
        description: "Entrega de board AAC, navegacao reduzida e componentes acessiveis.",
        date: "2026-02",
      },
      {
        phase: "Production",
        description: "Base validada e preparada para iteracoes clinicas e escala gradual.",
        date: "2026-03",
      },
    ],
    lessonsLearned: [
      "Performance budgets evitam regressao silenciosa em fluxos de acessibilidade.",
      "Modelagem tipada do dominio reduz friccao na evolucao dos case studies.",
      "Telemetria de interacao ajuda a priorizar features com impacto real.",
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
    year: 2025,
    updatedAt: new Date("2025-11-10"),
    category: ProjectCategory.Fintech,
    role: "Frontend Developer",
    status: "completed",
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
    timeline: [
      {
        phase: "Ideation",
        description: "Mapeamento de dores de usuarios em controle financeiro pessoal.",
        date: "2025-07",
      },
      {
        phase: "Prototype",
        description: "Prototipo de fluxo de entradas/saidas com validacao rapida de formulario.",
        date: "2025-08",
      },
      {
        phase: "Architecture",
        description: "Organizacao de estado, componentes e regras de saldo por categoria.",
        date: "2025-09",
      },
      {
        phase: "MVP",
        description: "Entrega de cadastro, filtros e resumo financeiro com leitura objetiva.",
        date: "2025-10",
      },
      {
        phase: "Production",
        description: "Versao publicada com iteracoes de UX e estabilidade de fluxo.",
        date: "2025-11",
      },
    ],
    lessonsLearned: [
      "Regras de dominio explicitas evitam inconsistencias em calculo financeiro.",
      "Feedback visual rapido melhora percepcao de confiabilidade do produto.",
      "Testes de fluxo ajudam a manter estabilidade em iteracoes de UI.",
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
    year: 2025,
    updatedAt: new Date("2025-08-20"),
    category: ProjectCategory.Productivity,
    role: "Backend & Product Developer",
    status: "experimental",
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
    timeline: [
      {
        phase: "Ideation",
        description: "Definicao de produto simples para notas compartilhaveis sem cadastro.",
        date: "2025-05",
      },
      {
        phase: "Prototype",
        description: "Experimentos com Express + HTMX para validar fluxo server-driven.",
        date: "2025-06",
      },
      {
        phase: "Architecture",
        description: "Separacao de rotas, persistencia SQLite e estrategia de links curtos.",
        date: "2025-07",
      },
      {
        phase: "MVP",
        description: "Entrega de criacao de notas, compartilhamento e leitura publica.",
        date: "2025-08",
      },
      {
        phase: "Iteration",
        description: "Projeto em evolucao com foco em colaboracao e observabilidade.",
        date: "2025-08",
      },
    ],
    lessonsLearned: [
      "Solucoes simples com stack enxuta aceleram validacao de produto.",
      "Trade-off entre velocidade e robustez precisa ser documentado cedo.",
      "Observabilidade desde o inicio facilita evolucao de funcionalidades.",
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
    year: 2024,
    updatedAt: new Date("2024-10-05"),
    category: ProjectCategory.Education,
    role: "Frontend Developer",
    status: "completed",
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
    timeline: [
      {
        phase: "Ideation",
        description: "Levantamento de requisitos para acompanhar progresso tecnico do usuario.",
        date: "2024-06",
      },
      {
        phase: "Prototype",
        description: "Primeira versao do dashboard com autenticacao e cadastro de stacks.",
        date: "2024-07",
      },
      {
        phase: "Architecture",
        description: "Consolidacao de componentes, estado global e validacoes de formulario.",
        date: "2024-08",
      },
      {
        phase: "MVP",
        description: "Entrega de CRUD de tecnologias com feedback e fluxo completo de uso.",
        date: "2024-09",
      },
      {
        phase: "Production",
        description: "Publicacao da versao final com foco em consistencia de experiencia.",
        date: "2024-10",
      },
    ],
    lessonsLearned: [
      "Estado bem estruturado reduz bugs em CRUD de dashboard.",
      "Componentes reutilizaveis aceleram entrega sem perder consistencia.",
      "Onboarding orientado a tarefa melhora retencao de usuarios.",
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

export const projects: Project[] = sortProjectsByUpdatedAt(projectEntries);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const archivedProjects: ArchivedProject[] = [
  {
    slug: "portfolio-template-jrvalerio",
    title: "Portfolio Template",
    year: 2025,
    category: "Template",
    summary: "Template de portfolio com foco em deploy rapido e customizacao.",
    stack: ["React", "CSS", "Vercel"],
    url: "https://portfolio-template-jr-valerio.vercel.app/",
    repo: "https://github.com/JrValerio/portfolio-template-JrValerio",
  },
  {
    slug: "template-hamburgueria",
    title: "Hamburgueria Kenzie",
    year: 2025,
    category: "E-commerce",
    summary: "Projeto de estudo para fluxo de carrinho e catalogo de produtos.",
    stack: ["React", "Axios", "SASS"],
    url: "https://template-hamburgueria.vercel.app/",
    repo: "https://github.com/JrValerio/template-hamburgueria",
  },
  {
    slug: "buscadorcep",
    title: "Buscador de CEP",
    year: 2024,
    category: "Utility",
    summary: "Consulta de CEP com integracao de API e validacao de entrada.",
    stack: ["React", "JavaScript", "Axios"],
    url: "https://buscadorcep-3qzvzd239-amaro-juniors-projects.vercel.app/",
    repo: "https://github.com/JrValerio/buscadorcep",
  },
  {
    slug: "gitsearchbase",
    title: "Git Search",
    year: 2024,
    category: "Frontend",
    summary: "Busca de perfis e repositorios com API do GitHub.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://jrvalerio.github.io/gitSearchBase/index.html",
    repo: "https://github.com/JrValerio/gitSearchBase",
  },
  {
    slug: "newsportal",
    title: "News Portal",
    year: 2024,
    category: "Frontend",
    summary: "Layout editorial responsivo para estudo de composicao visual.",
    stack: ["HTML", "CSS"],
    url: "https://jrvalerio.github.io/newsportal/",
    repo: "https://github.com/JrValerio/newsportal",
  },
  {
    slug: "travelgram",
    title: "Travelgram",
    year: 2024,
    category: "Frontend",
    summary: "Landing page para conteudo de viagens com foco em UI responsiva.",
    stack: ["HTML", "CSS"],
    url: "https://jrvalerio.github.io/travelgram/",
    repo: "https://github.com/JrValerio/travelgram",
  },
];

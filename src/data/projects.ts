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
    slug: "jr-minimal-portfolio",
    title: "JR Minimal Portfolio",
    year: "2026",
    updatedAt: new Date("2026-03-04"),
    category: "Developer Tools",
    cover: "/img/perfil.png",
    summary:
      "Portfolio de engenharia orientado a documentacao, com case studies, C4, ADRs e telemetria de leitura.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    challenge:
      "Portfolios tradicionais mostram interface, mas nao comunicam pensamento de arquitetura, decisoes tecnicas nem sinais mensuraveis de qualidade.",
    solution:
      "Transformacao do portfolio em um product artifact com estrutura de case studies, pagina de arquitetura, decision log e metricas de entrega.",
    architecture: [
      {
        layer: "Frontend",
        detail: "Next.js + React para roteamento hibrido, SEO tecnico e composicao modular da interface.",
      },
      {
        layer: "Domain",
        detail: "Camada tipada de projetos para manter narrativa consistente em cada case study.",
      },
      {
        layer: "Observability",
        detail: "Eventos de interacao e leitura para medir engajamento de projetos e documentacao.",
      },
      {
        layer: "Governance",
        detail: "CI com quality gates e budget de bundle para evitar regressao silenciosa.",
      },
    ],
    keyFeatures: [
      "Case studies com estrutura de engenharia de produto",
      "Documentacao C4 e registro de decisoes (ADR)",
      "Busca global com command palette",
      "Pipeline com typecheck, lint, testes e bundle budget",
    ],
    technicalChallenges: [
      "Migrar para App Router sem quebrar paginas legadas",
      "Manter performance com fundo procedural e layout customizado",
      "Sincronizar i18n entre rotas localizadas e conteudo tecnico",
    ],
    nextIteration: [
      "Adicionar dashboard de observabilidade com agregacao de leitura",
      "Expandir case studies com decisoes e trade-offs por release",
      "Refinar internacionalizacao para experiencia full-locale em todo V2",
    ],
    impact:
      "Reposicionamento do portfolio de vitrine visual para artefato tecnico de engenharia e produto.",
    highlights: [
      "Narrativa tecnica em torno de arquitetura, governanca e qualidade",
      "Estrutura preparada para avaliacao por recrutadores tecnicos",
      "Base escalavel para documentar evolucao de projetos reais",
    ],
    url: "https://jrvalerio.dev/v2",
    repo: "https://github.com/JrValerio/jrvalerio.dev",
  },
  {
    slug: "kenzie-hub",
    title: "Kenzie Hub",
    year: "2024",
    updatedAt: new Date("2024-10-05"),
    category: "Education",
    cover: "/projects/kenzie-hub.jpg",
    summary:
      "Evolucao de projeto academico para aplicacao mais proxima de produto, com backend proprio e maior confiabilidade de entrega.",
    stack: ["React", "TypeScript", "Node.js", "SASS"],
    challenge:
      "O projeto inicial dependia de uma API externa, limitando evolucao de regras de negocio e previsibilidade de deploy.",
    solution:
      "Refatoracao para uma arquitetura com maior autonomia tecnica, reduzindo dependencia externa e melhorando confiabilidade do fluxo.",
    architecture: [
      {
        layer: "Frontend",
        detail: "React + TypeScript para dashboard de tecnologias com foco em formularios e UX objetiva.",
      },
      {
        layer: "API",
        detail: "Node.js + Express para contrato controlado de autenticacao e operacoes de dominio.",
      },
      {
        layer: "Data",
        detail: "Persistencia relacional para manter usuarios e tecnologias com consistencia.",
      },
    ],
    keyFeatures: [
      "Gestao de tecnologias por usuario",
      "Fluxos de autenticacao e sessao",
      "Painel de progresso tecnico com CRUD orientado a tarefa",
    ],
    technicalChallenges: [
      "Reduzir acoplamento com API de terceiros sem quebrar o frontend existente",
      "Padronizar fluxo de dados para evitar inconsistencias entre tela e persistencia",
      "Melhorar confiabilidade de deploy com validacoes automatizadas",
    ],
    nextIteration: [
      "Expandir cobertura de testes para cenarios de borda em autenticacao e CRUD",
      "Evoluir observabilidade para detectar regressao de fluxo",
      "Refinar contrato de API para versaoamento mais previsivel",
    ],
    impact:
      "Projeto reposicionado como case de evolucao tecnica e autonomia de arquitetura.",
    highlights: [
      "Narrativa clara de refatoracao de projeto academico para estrutura mais robusta",
      "Melhora de confiabilidade e previsibilidade no fluxo de entrega",
      "Demonstra capacidade de evoluir codigo legado com foco em arquitetura",
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
    slug: "postit",
    title: "Post-it Share App",
    year: "2025",
    category: "Productivity",
    summary: "Aplicacao minimalista para criacao e compartilhamento de notas com links curtos.",
    stack: ["Node.js", "Express", "HTMX", "SQLite"],
    url: "https://postit-8nii.onrender.com/",
    repo: "https://github.com/JrValerio/postit",
  },
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

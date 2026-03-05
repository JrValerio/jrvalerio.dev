export type Project = {
  slug: string;
  title: string;
  year: string;
  updatedAt: string;
  category: string;
  cover: string;
  summary: string;
  stack: string[];
  challenge: string;
  solution: string;
  impact: string;
  highlights: string[];
  url?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "ecovoz",
    title: "EcoVoz",
    year: "2026",
    updatedAt: "2026-03-05",
    category: "Accessibility",
    cover: "/projects/ecovoz.png",
    summary:
      "Produto de acessibilidade com foco em comunicacao assistiva e experiencia inclusiva.",
    stack: ["Next.js", "TypeScript", "Node.js", "Accessibility"],
    challenge:
      "Pessoas com diferentes necessidades de comunicacao tinham baixa autonomia em interfaces digitais tradicionais.",
    solution:
      "Desenho de fluxo assistivo com foco em legibilidade, navegacao reduzida e componentes com semantica forte.",
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
    updatedAt: "2025-11-10",
    category: "Fintech",
    cover: "/projects/control-finance.jpg",
    summary:
      "Aplicacao para gestao financeira pessoal com UX direta, visualizacoes simples e foco em acao.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    challenge:
      "Usuarios precisavam registrar entradas e saidas de forma rapida sem friccao na interface.",
    solution:
      "Experiencia centrada em tarefas com filtros claros, feedback imediato e leitura visual do saldo.",
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
    updatedAt: "2025-08-20",
    category: "Productivity",
    cover: "/projects/postit.jpg",
    summary:
      "Aplicacao minimalista para criacao e compartilhamento de notas com links curtos.",
    stack: ["Node.js", "Express", "HTMX", "SQLite"],
    challenge:
      "Criar um produto leve para compartilhamento de notas sem onboarding complexo.",
    solution:
      "Stack enxuta com server rendering progressivo e foco em velocidade de criacao/compartilhamento.",
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
    updatedAt: "2024-10-05",
    category: "Education",
    cover: "/projects/kenzie-hub.jpg",
    summary:
      "Painel para acompanhar evolucao tecnica e organizar tecnologias em aprendizado.",
    stack: ["React", "TypeScript", "SASS"],
    challenge:
      "Usuarios precisavam visualizar sua evolucao tecnica em uma unica area de controle.",
    solution:
      "Dashboard para gerenciar habilidades com foco em estado global e experiencias de formulario.",
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

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

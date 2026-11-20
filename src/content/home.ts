import type { V2Locale } from "../i18n/routing";

export type ProjectKind = "produto" | "agente";

export type HomeProject = {
  id: string;
  kind: ProjectKind;
  featured: boolean;
  title: string;
  summary: Record<V2Locale, string>;
  /** Internal case study, live product or repository. Omitted when private. */
  href?: string;
  external?: boolean;
  tags: string[];
  status?: "live" | "inUse" | "thisSite";
};

export const homeProjects: HomeProject[] = [
  {
    id: "control-finance",
    kind: "produto",
    featured: true,
    title: "Control Finance",
    summary: {
      "pt-BR": "SaaS de finanças pessoais: importa faturas e extratos, organiza metas e renda da família e simula operações de day trade.",
      "en-GB": "Personal finance SaaS: imports card bills and statements, tracks goals and household income, and simulates day trades.",
      es: "SaaS de finanzas personales: importa facturas y extractos, organiza metas e ingresos familiares y simula operaciones de day trade.",
    },
    href: "/v2/projetos/control-finance",
    tags: ["React", "Node.js", "PostgreSQL", "Cloud Run"],
    status: "live",
  },
  {
    id: "ecovoz",
    kind: "produto",
    featured: true,
    title: "EcoVoz",
    summary: {
      "pt-BR": "Plataforma de comunicação assistiva que combina voz, gestos e símbolos para quem precisa de outro caminho para se expressar.",
      "en-GB": "Assistive communication platform combining voice, gestures and symbols for people who need another way to express themselves.",
      es: "Plataforma de comunicación asistiva que combina voz, gestos y símbolos para quien necesita otro camino para expresarse.",
    },
    href: "/v2/projetos/ecovoz",
    tags: ["React", "TypeScript", "Acessibilidade"],
    status: "live",
  },
  {
    id: "agente-dev",
    kind: "agente",
    featured: true,
    title: "Agente DEV",
    summary: {
      "pt-BR": "Agente que diagnostica meus repositórios, propõe o trabalho em lotes e entrega cada lote como PR testada, com deploy acompanhado.",
      "en-GB": "Agent that audits my repositories, proposes the work in batches and ships each batch as a tested PR with a monitored deploy.",
      es: "Agente que diagnostica mis repositorios, propone el trabajo por lotes y entrega cada lote como PR probada, con deploy acompañado.",
    },
    href: "#processo",
    tags: ["Claude", "MCP", "GitHub", "Vercel"],
    status: "inUse",
  },
  {
    id: "admadureira-atibaia",
    kind: "produto",
    featured: false,
    title: "AD Madureira Atibaia",
    summary: {
      "pt-BR": "Site oficial da igreja, com a programação da semana publicada a partir das artes de cada culto.",
      "en-GB": "The church's official website, with the weekly schedule published from each service's artwork.",
      es: "Sitio oficial de la iglesia, con la programación semanal publicada a partir de las artes de cada culto.",
    },
    href: "https://www.admadureiraatibaia.com.br",
    external: true,
    tags: ["Next.js", "TypeScript", "Vercel"],
    status: "live",
  },
  {
    id: "ui24r-mcp-server",
    kind: "agente",
    featured: false,
    title: "Agente da mesa Ui24R",
    summary: {
      "pt-BR": "Servidor MCP que deixa um agente operar a mesa de som Soundcraft Ui24R: canais, mixes e cenas.",
      "en-GB": "MCP server that lets an agent operate the Soundcraft Ui24R mixer: channels, mixes and scenes.",
      es: "Servidor MCP que permite a un agente operar la mesa de sonido Soundcraft Ui24R: canales, mezclas y escenas.",
    },
    tags: ["MCP", "TypeScript", "Áudio"],
  },
  {
    id: "agente-obs",
    kind: "agente",
    featured: false,
    title: "Agente OBS",
    summary: {
      "pt-BR": "Agente de voz que opera o OBS nas transmissões dos cultos: troca de cenas e controle da live sem tirar as mãos do resto.",
      "en-GB": "Voice agent that runs OBS during church live streams: switching scenes and controlling the stream hands-free.",
      es: "Agente de voz que opera OBS en las transmisiones de los cultos: cambia escenas y controla la transmisión sin usar las manos.",
    },
    tags: ["OBS", "Voz", "Automação"],
    status: "inUse",
  },
  {
    id: "jrvalerio-dev",
    kind: "produto",
    featured: false,
    title: "jrvalerio.dev",
    summary: {
      "pt-BR": "Este portfólio: Next 16, testes de acessibilidade com contraste, orçamento de bundle no CI e entregue em lotes pelo Agente DEV.",
      "en-GB": "This portfolio: Next 16, accessibility tests with contrast checks, a bundle budget in CI, shipped in batches by Agente DEV.",
      es: "Este portafolio: Next 16, pruebas de accesibilidad con contraste, presupuesto de bundle en CI y entregado por lotes por el Agente DEV.",
    },
    href: "https://github.com/JrValerio/jrvalerio.dev",
    external: true,
    tags: ["Next.js 16", "TypeScript", "Playwright"],
    status: "thisSite",
  },
];

export const liveProducts: Array<{ name: string; href: string }> = [
  { name: "Control Finance", href: "https://control-finance-react-tail-wind.vercel.app" },
  { name: "AD Madureira Atibaia", href: "https://www.admadureiraatibaia.com.br" },
  { name: "EcoVoz", href: "https://eco-voz-b23q.vercel.app" },
  { name: "EBD Conectada", href: "https://ebd-conectada.vercel.app" },
  { name: "Gerador de Artes", href: "https://gerador-de-artes.vercel.app" },
  { name: "Diário Mainha", href: "https://diario-mainha.vercel.app" },
];

export const heroStats = {
  yearsCoding: 4,
  productsLive: liveProducts.length,
  // Merged PRs opened by Agente DEV since 2026-11-09 (Control-Finance and
  // jrvalerio.dev), counted on 2026-11-20. L4 computes it at build time.
  agentPullRequests: 27,
};

export const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Vercel",
  "Cloud Run",
  "Neon",
  "Playwright",
  "Vitest",
  "Claude + MCP",
];

export const contactLinks = {
  email: "amarovsjr81@gmail.com",
  linkedin: "https://www.linkedin.com/in/jrvalerio/",
  github: "https://github.com/JrValerio",
};

type Copy = {
  skip: string;
  nav: { label: string; projects: string; about: string; journey: string; contact: string; talk: string };
  theme: { label: string; light: string; dark: string };
  locale: { label: string };
  hero: {
    eyebrow: string;
    available: string;
    hello: string;
    role: string;
    pitch: string;
    ctaProjects: string;
    ctaAgent: string;
    portraitAlt: string;
    statsLabel: string;
    stats: { years: string; products: string; prs: string };
  };
  projects: {
    eyebrow: string;
    title: string;
    lead: string;
    filters: { label: string; all: string; products: string; agents: string };
    status: { live: string; inUse: string; thisSite: string };
    private: string;
    seeAll: string;
  };
  tools: { eyebrow: string; title: string };
  about: {
    eyebrow: string;
    title: string;
    body: string[];
    processTitle: string;
    process: Array<{ title: string; text: string }>;
  };
  journey: {
    eyebrow: string;
    title: string;
    items: Array<{ year: string; title: string; text: string }>;
    liveTitle: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    channels: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
    };
  };
  footer: { archive: string; engineering: string; rights: string };
};

const pt: Copy = {
  skip: "Pular para o conteúdo",
  nav: { label: "Seções", projects: "Projetos", about: "Sobre", journey: "Trajetória", contact: "Contato", talk: "Vamos conversar" },
  theme: { label: "Tema", light: "Claro", dark: "Escuro" },
  locale: { label: "Idioma" },
  hero: {
    eyebrow: "Full-stack · Agentes de IA · Atibaia/SP",
    available: "Disponível para novos projetos",
    hello: "Olá, eu sou",
    role: "Desenvolvedor full-stack & agentes de IA",
    pitch: "Construo produtos web e mobile de ponta a ponta e os agentes que diagnosticam, corrigem e colocam esses produtos no ar.",
    ctaProjects: "Ver projetos",
    ctaAgent: "Ver o Agente DEV em ação",
    portraitAlt: "Amaro Júnior de terno azul-marinho e camisa branca",
    statsLabel: "Em números",
    stats: { years: "Anos programando", products: "Produtos em produção", prs: "PRs entregues pelo Agente DEV" },
  },
  projects: {
    eyebrow: "Projetos",
    title: "Trabalho que está no ar",
    lead: "Produtos que pessoas usam e agentes que trabalham comigo todos os dias.",
    filters: { label: "Filtrar projetos", all: "Todos", products: "Produtos", agents: "Agentes" },
    status: { live: "No ar", inUse: "Em uso", thisSite: "Este site" },
    private: "Código privado",
    seeAll: "Ver estudos de caso e arquivo",
  },
  tools: { eyebrow: "Ferramentas", title: "Com o que eu construo" },
  about: {
    eyebrow: "Sobre",
    title: "Mais que código",
    body: [
      "Sou desenvolvedor full-stack em Atibaia/SP. Cuido do produto inteiro: interface, API, banco de dados, testes e deploy.",
      "Também respondo pela comunicação digital da AD Madureira em Atibaia, então muito do que construo nasce de problemas reais: publicar a programação da semana, operar a transmissão do culto, controlar a mesa de som.",
      "Desde 2026 trabalho junto com agentes. O Agente DEV segue o mesmo processo que eu seguiria, e nada vai para produção sem a minha aprovação.",
    ],
    processTitle: "Como um projeto anda",
    process: [
      { title: "Diagnóstico", text: "Leio o código, rodo os testes e o build, olho segurança, desempenho e produto. Tudo com evidência." },
      { title: "Proposta em lotes", text: "Os achados viram lotes pequenos, ordenados por valor e risco, cada um com critério de aceite e rollback." },
      { title: "Aprovação", text: "Nada entra sem aprovação do lote. Decisões de produto e de custo ficam com quem é dono delas." },
      { title: "Entrega", text: "Cada lote é uma PR com commits atômicos, CI verde e preview validado antes do merge." },
      { title: "Acompanhamento", text: "Depois do deploy, acompanho erros e métricas. Se algo regredir, volta ao estado anterior." },
    ],
  },
  journey: {
    eyebrow: "Trajetória",
    title: "Sempre construindo",
    items: [
      { year: "2022", title: "Primeiras linhas de código", text: "Comecei a programar com HTML, CSS e JavaScript." },
      { year: "2023–2024", title: "Formação full-stack", text: "Bootcamp com projetos em React, Node.js e APIs REST, entre eles o Kenzie Hub." },
      { year: "2024", title: "Primeiros produtos", text: "Control Finance, EBD Conectada e EcoVoz saem do papel e vão para produção." },
      { year: "2026", title: "Produtos para a igreja", text: "Site oficial da AD Madureira Atibaia, Gerador de Artes e os agentes da mesa de som e do OBS." },
      { year: "2026", title: "Agente DEV", text: "Control Finance vira SaaS no Cloud Run e o portfólio é refeito em lotes pelo Agente DEV." },
    ],
    liveTitle: "No ar. Em uso.",
  },
  contact: {
    eyebrow: "Contato",
    title: "Me conta o que precisa sair do papel",
    lead: "Produto novo, sistema que precisa de manutenção ou um processo que dá para automatizar. Respondo pessoalmente.",
    channels: "Canais",
    form: { name: "Nome", email: "E-mail", message: "Mensagem", submit: "Enviar mensagem", sending: "Enviando…", success: "Mensagem enviada. Respondo em breve." },
  },
  footer: { archive: "Arquivo", engineering: "Engenharia", rights: "Amaro Júnior" },
};

const en: Copy = {
  skip: "Skip to content",
  nav: { label: "Sections", projects: "Projects", about: "About", journey: "Journey", contact: "Contact", talk: "Let's talk" },
  theme: { label: "Theme", light: "Light", dark: "Dark" },
  locale: { label: "Language" },
  hero: {
    eyebrow: "Full-stack · AI agents · Atibaia, Brazil",
    available: "Available for new projects",
    hello: "Hi, I'm",
    role: "Full-stack developer & AI agents",
    pitch: "I build web and mobile products end to end, and the agents that audit, fix and ship those products.",
    ctaProjects: "See projects",
    ctaAgent: "See Agente DEV at work",
    portraitAlt: "Amaro Júnior in a navy suit and white shirt",
    statsLabel: "In numbers",
    stats: { years: "Years coding", products: "Products in production", prs: "PRs shipped by Agente DEV" },
  },
  projects: {
    eyebrow: "Projects",
    title: "Work that is live",
    lead: "Products people use and agents that work with me every day.",
    filters: { label: "Filter projects", all: "All", products: "Products", agents: "Agents" },
    status: { live: "Live", inUse: "In use", thisSite: "This site" },
    private: "Private code",
    seeAll: "See case studies and archive",
  },
  tools: { eyebrow: "Tools", title: "What I build with" },
  about: {
    eyebrow: "About",
    title: "More than code",
    body: [
      "I'm a full-stack developer based in Atibaia, Brazil. I own the whole product: interface, API, database, tests and deploy.",
      "I also run digital communications for AD Madureira in Atibaia, so much of what I build starts from real problems: publishing the weekly schedule, running the service live stream, controlling the sound desk.",
      "Since 2026 I work alongside agents. Agente DEV follows the process I would follow, and nothing reaches production without my approval.",
    ],
    processTitle: "How a project moves",
    process: [
      { title: "Audit", text: "I read the code, run the tests and the build, and review security, performance and product, with evidence." },
      { title: "Batched plan", text: "Findings become small batches ordered by value and risk, each with acceptance criteria and a rollback." },
      { title: "Approval", text: "Nothing ships without the batch being approved. Product and cost decisions stay with their owners." },
      { title: "Delivery", text: "Each batch is a PR with atomic commits, green CI and a checked preview before merge." },
      { title: "Follow-up", text: "After deploy I watch errors and metrics. If anything regresses, it rolls back." },
    ],
  },
  journey: {
    eyebrow: "Journey",
    title: "Always building",
    items: [
      { year: "2022", title: "First lines of code", text: "Started programming with HTML, CSS and JavaScript." },
      { year: "2023–2024", title: "Full-stack training", text: "Bootcamp with projects in React, Node.js and REST APIs, including Kenzie Hub." },
      { year: "2024", title: "First products", text: "Control Finance, EBD Conectada and EcoVoz go from idea to production." },
      { year: "2026", title: "Products for the church", text: "AD Madureira Atibaia's website, the artwork generator and the agents for the sound desk and OBS." },
      { year: "2026", title: "Agente DEV", text: "Control Finance becomes a SaaS on Cloud Run and this portfolio is rebuilt in batches by Agente DEV." },
    ],
    liveTitle: "Live. In use.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell me what needs to get built",
    lead: "A new product, a system that needs care or a process worth automating. I reply personally.",
    channels: "Channels",
    form: { name: "Name", email: "Email", message: "Message", submit: "Send message", sending: "Sending…", success: "Message sent. I'll reply soon." },
  },
  footer: { archive: "Archive", engineering: "Engineering", rights: "Amaro Júnior" },
};

const es: Copy = {
  skip: "Saltar al contenido",
  nav: { label: "Secciones", projects: "Proyectos", about: "Sobre mí", journey: "Trayectoria", contact: "Contacto", talk: "Hablemos" },
  theme: { label: "Tema", light: "Claro", dark: "Oscuro" },
  locale: { label: "Idioma" },
  hero: {
    eyebrow: "Full-stack · Agentes de IA · Atibaia, Brasil",
    available: "Disponible para nuevos proyectos",
    hello: "Hola, soy",
    role: "Desarrollador full-stack y agentes de IA",
    pitch: "Construyo productos web y móviles de punta a punta, y los agentes que diagnostican, corrigen y publican esos productos.",
    ctaProjects: "Ver proyectos",
    ctaAgent: "Ver el Agente DEV en acción",
    portraitAlt: "Amaro Júnior con traje azul marino y camisa blanca",
    statsLabel: "En números",
    stats: { years: "Años programando", products: "Productos en producción", prs: "PRs entregadas por el Agente DEV" },
  },
  projects: {
    eyebrow: "Proyectos",
    title: "Trabajo que está en línea",
    lead: "Productos que la gente usa y agentes que trabajan conmigo todos los días.",
    filters: { label: "Filtrar proyectos", all: "Todos", products: "Productos", agents: "Agentes" },
    status: { live: "En línea", inUse: "En uso", thisSite: "Este sitio" },
    private: "Código privado",
    seeAll: "Ver estudios de caso y archivo",
  },
  tools: { eyebrow: "Herramientas", title: "Con qué construyo" },
  about: {
    eyebrow: "Sobre mí",
    title: "Más que código",
    body: [
      "Soy desarrollador full-stack en Atibaia, Brasil. Me ocupo del producto entero: interfaz, API, base de datos, pruebas y deploy.",
      "También coordino la comunicación digital de la AD Madureira en Atibaia, así que mucho de lo que construyo nace de problemas reales: publicar la programación semanal, operar la transmisión del culto, controlar la mesa de sonido.",
      "Desde 2026 trabajo junto con agentes. El Agente DEV sigue el mismo proceso que yo seguiría, y nada llega a producción sin mi aprobación.",
    ],
    processTitle: "Cómo avanza un proyecto",
    process: [
      { title: "Diagnóstico", text: "Leo el código, ejecuto las pruebas y el build, reviso seguridad, rendimiento y producto. Todo con evidencia." },
      { title: "Plan por lotes", text: "Los hallazgos se convierten en lotes pequeños, ordenados por valor y riesgo, con criterio de aceptación y rollback." },
      { title: "Aprobación", text: "Nada entra sin aprobar el lote. Las decisiones de producto y de costo quedan con sus dueños." },
      { title: "Entrega", text: "Cada lote es una PR con commits atómicos, CI en verde y preview validado antes del merge." },
      { title: "Seguimiento", text: "Después del deploy reviso errores y métricas. Si algo empeora, vuelve al estado anterior." },
    ],
  },
  journey: {
    eyebrow: "Trayectoria",
    title: "Siempre construyendo",
    items: [
      { year: "2022", title: "Primeras líneas de código", text: "Empecé a programar con HTML, CSS y JavaScript." },
      { year: "2023–2024", title: "Formación full-stack", text: "Bootcamp con proyectos en React, Node.js y APIs REST, entre ellos Kenzie Hub." },
      { year: "2024", title: "Primeros productos", text: "Control Finance, EBD Conectada y EcoVoz pasan de la idea a producción." },
      { year: "2026", title: "Productos para la iglesia", text: "El sitio de la AD Madureira Atibaia, el generador de artes y los agentes de la mesa de sonido y de OBS." },
      { year: "2026", title: "Agente DEV", text: "Control Finance se convierte en SaaS en Cloud Run y este portafolio se rehace por lotes con el Agente DEV." },
    ],
    liveTitle: "En línea. En uso.",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Cuéntame qué necesita salir del papel",
    lead: "Un producto nuevo, un sistema que necesita mantenimiento o un proceso que se puede automatizar. Respondo personalmente.",
    channels: "Canales",
    form: { name: "Nombre", email: "Correo", message: "Mensaje", submit: "Enviar mensaje", sending: "Enviando…", success: "Mensaje enviado. Respondo pronto." },
  },
  footer: { archive: "Archivo", engineering: "Ingeniería", rights: "Amaro Júnior" },
};

export const homeCopy: Record<V2Locale, Copy> = { "pt-BR": pt, "en-GB": en, es };
export type HomeCopy = Copy;

import {
  DEFAULT_V2_LOCALE,
  LOCALE_COOKIE_NAME,
  V2_LOCALE_SEGMENTS,
  getLanguageAlternates,
  getLocaleFromSegment,
  getSegmentFromLocale,
  isLocaleSegment,
  resolveLocale,
  resolveLocaleFromAcceptLanguage,
  type V2Locale,
  type V2LocaleSegment,
} from "./routing";

export {
  DEFAULT_V2_LOCALE,
  LOCALE_COOKIE_NAME,
  V2_LOCALE_SEGMENTS,
  getLanguageAlternates,
  getLocaleFromSegment,
  getSegmentFromLocale,
  isLocaleSegment,
  resolveLocale,
  resolveLocaleFromAcceptLanguage,
};
export type { V2Locale, V2LocaleSegment };

export function toLocalePath(path: string, locale: V2Locale, prefixed: boolean) {
  if (!prefixed) return path;
  const segment = getSegmentFromLocale(locale);
  return `/${segment}${path}`;
}

export function stripLocalePrefix(pathname: string) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const chunks = normalized.split("/").filter(Boolean);
  if (!chunks.length) return "/";

  const [first, ...rest] = chunks;
  if (!first || !isLocaleSegment(first)) return normalized;

  return `/${rest.join("/") || ""}`.replace(/\/$/, "") || "/";
}

export function localizePathname(pathname: string, locale: V2Locale) {
  const basePath = stripLocalePrefix(pathname);
  if (locale === "pt-BR") return basePath;
  return `/${getSegmentFromLocale(locale)}${basePath === "/" ? "" : basePath}`;
}

export type V2Messages = {
  locale: {
    label: string;
    options: Record<V2Locale, string>;
  };
  common: {
    homeHeroAriaLabel: string;
    lateralControlsAriaLabel: string;
  };
  nav: {
    brand: string;
    ariaLabel: string;
    openMenu: string;
    closeMenu: string;
    search: string;
    items: {
      home: string;
      projects: string;
      archive: string;
      architecture: string;
      engineering: string;
      metrics: string;
      principles: string;
      about: string;
      contact: string;
    };
    searchHint: string;
  };
  commandPalette: {
    dialogLabel: string;
    placeholder: string;
    empty: string;
    groups: {
      page: string;
      project: string;
    };
  };
  themeSwitcher: {
    light: string;
    dark: string;
    monospaced: string;
    switcher: string;
  };
  hero: {
    ariaLabel: string;
    role: string;
    summary: string;
    ctaWork: string;
    ctaGithub: string;
    ctaLinkedIn: string;
  };
  work: {
    selectedTitle: string;
    selectedSubtitle: string;
    allTitle: string;
    allSubtitle: string;
    viewAll: string;
    readTime: string;
    caseStudy: string;
    live: string;
    source: string;
    archiveLead: string;
    archiveLink: string;
  };
  engineeringLinks: {
    title: string;
    subtitle: string;
    open: string;
    docs: Array<{ key: "architecture" | "engineering" | "metrics" | "principles"; title: string; description: string }>;
  };
  engineering: {
    title: string;
    subtitle: string;
    publishedLabel: string;
    statusLabel: string;
    tagsLabel: string;
    readAdr: string;
    backToHub: string;
    readingProgressAria: string;
    sectionAnchorLabel: string;
    tableOfContents: string;
    paginationLabel: string;
    previousAdr: string;
    nextAdr: string;
    status: Record<"proposed" | "accepted" | "deprecated", string>;
    relatedTitle: string;
    relatedSubtitle: string;
    relatedLinks: {
      architecture: string;
      metrics: string;
      principles: string;
    };
  };
  architecture: {
    title: string;
    subtitle: string;
    roleLabel: string;
    rationaleLabel: string;
    layers: Array<{
      name: string;
      role: string;
      modules: string[];
      rationale: string;
    }>;
    c4Title: string;
    c4Subtitle: string;
    requestFlowTitle: string;
    requestFlowSubtitle: string;
    requestFlow: string[];
    relatedTitle: string;
    relatedSubtitle: string;
    relatedLinks: {
      engineering: string;
      caseStudies: string;
    };
  };
  principles: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    influenceTitle: string;
    influenceSubtitle: string;
    influences: string[];
    relatedLinks: {
      engineering: string;
      metrics: string;
      caseStudies: string;
    };
  };
  metrics: {
    title: string;
    subtitle: string;
    lastVerifiedLabel: string;
    lastVerifiedValue: string;
    summaryCards: Array<{
      name: string;
      value: string;
      note: string;
    }>;
    bundleEvolutionTitle: string;
    bundleEvolutionSubtitle: string;
    bundleReductionPrefix: string;
    bundleReductionSuffix: string;
    bundleHistory: Array<{
      milestone: string;
      note: string;
    }>;
    bundleBudgetsTitle: string;
    bundleBudgetsSubtitle: string;
    limitLabel: string;
    measuredLabel: string;
    pipelineTitle: string;
    pipelineSubtitle: string;
    pipelineSteps: Array<{
      step: string;
      purpose: string;
    }>;
    relatedTitle: string;
    relatedSubtitle: string;
    relatedLinks: {
      architecture: string;
      engineering: string;
    };
  };
  contactCta: {
    title: string;
    subtitle: string;
    body: string;
    viewContact: string;
    sendEmail: string;
  };
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
  };
  stack: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    lead: string;
    body: string;
    sendEmail: string;
    connectLinkedIn: string;
    viewGithub: string;
    availability: string;
    availabilityValue: string;
    response: string;
    responseValue: string;
    location: string;
    locationValue: string;
  };
  archive: {
    title: string;
    subtitle: string;
    backToMain: string;
    live: string;
    source: string;
  };
  caseStudy: {
    notFoundTitle: string;
    titleSuffix: string;
    back: string;
    minRead: string;
    sectionNavigation: string;
    overview: string;
    challenge: string;
    challengeSubtitle: string;
    solution: string;
    solutionSubtitle: string;
    timeline: string;
    timelineSubtitle: string;
    architecture: string;
    architectureSubtitle: string;
    features: string;
    featuresSubtitle: string;
    technicalChallenges: string;
    technicalChallengesSubtitle: string;
    techStack: string;
    techStackSubtitle: string;
    impact: string;
    impactSubtitle: string;
    nextIteration: string;
    nextIterationSubtitle: string;
    lessons: string;
    lessonsSubtitle: string;
    links: string;
    linksSubtitle: string;
    labels: {
      stack: string;
      year: string;
      role: string;
      status: string;
    };
    status: Record<"active" | "completed" | "experimental", string>;
    liveProduct: string;
    viewSource: string;
    readingProgressAria: string;
    coverAltPrefix: string;
    architectureDiagramAltPrefix: string;
    metricLabels: {
      accessibilityScore: string;
      avgLatency: string;
      completionRate: string;
      stackSize: string;
    };
  };
};

export const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Web Accessibility",
  "Testing (Vitest)",
  "CI/CD",
];

const baseMessages = {
  locale: {
    label: "Language",
    options: {
      "pt-BR": "PT-BR",
      "en-GB": "EN-GB",
      es: "ES",
    },
  },
} as const;

export const v2Messages: Record<V2Locale, V2Messages> = {
  "en-GB": {
    ...baseMessages,
    locale: {
      ...baseMessages.locale,
      label: "Language",
    },
    common: {
      homeHeroAriaLabel: "Home hero",
      lateralControlsAriaLabel: "Lateral controls",
    },
    nav: {
      brand: "JR Minimal",
      ariaLabel: "Primary navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      search: "Search",
      items: {
        home: "Home",
        projects: "Projects",
        archive: "Archive",
        architecture: "Architecture",
        engineering: "Engineering",
        metrics: "Metrics",
        principles: "Principles",
        about: "About",
        contact: "Contact",
      },
      searchHint: "Search - Ctrl + K",
    },
    commandPalette: {
      dialogLabel: "Command Menu",
      placeholder: "Search projects and docs...",
      empty: "No results found.",
      groups: {
        page: "Page",
        project: "Project",
      },
    },
    themeSwitcher: {
      light: "Light",
      dark: "Dark",
      monospaced: "Monospaced",
      switcher: "Theme switcher",
    },
    hero: {
      ariaLabel: "Home hero",
      role: "Full-Stack Developer",
      summary: "Building accessibility systems and AI-powered tools. Creator of EcoVoz.",
      ctaWork: "View Work",
      ctaGithub: "GitHub",
      ctaLinkedIn: "LinkedIn",
    },
    work: {
      selectedTitle: "Selected Work",
      selectedSubtitle: "Projects focused on product, user experience and software engineering.",
      allTitle: "All Projects",
      allSubtitle: "Case studies focused on digital products, pragmatic engineering and UX.",
      viewAll: "View all projects",
      readTime: "min read",
      caseStudy: "Case Study",
      live: "Live",
      source: "Source",
      archiveLead: "Want to explore study projects and previous iterations? Visit the",
      archiveLink: "Archive",
    },
    engineeringLinks: {
      title: "Engineering Docs",
      subtitle: "Public technical documentation for the portfolio.",
      open: "Open",
      docs: [
        {
          key: "architecture",
          title: "Architecture",
          description: "Layers, request flow and technical structure of the portfolio.",
        },
        {
          key: "engineering",
          title: "Engineering",
          description: "ADR hub with architecture decisions, trade-offs and technical notes.",
        },
        {
          key: "metrics",
          title: "Metrics",
          description: "Bundle budgets, quality pipeline and performance evolution.",
        },
        {
          key: "principles",
          title: "Principles",
          description: "Engineering principles guiding architecture, quality and delivery.",
        },
      ],
    },
    engineering: {
      title: "Engineering",
      subtitle: "Architecture decisions and technical notes from the evolution of the portfolio.",
      publishedLabel: "Published",
      statusLabel: "Status",
      tagsLabel: "Tags",
      readAdr: "Read ADR",
      backToHub: "Back to engineering",
      readingProgressAria: "ADR reading progress",
      sectionAnchorLabel: "Section link",
      tableOfContents: "Table of contents",
      paginationLabel: "ADR navigation",
      previousAdr: "Previous ADR",
      nextAdr: "Next ADR",
      status: {
        proposed: "Proposed",
        accepted: "Accepted",
        deprecated: "Deprecated",
      },
      relatedTitle: "Related Docs",
      relatedSubtitle: "Complementary pages that document architecture, metrics and engineering principles.",
      relatedLinks: {
        architecture: "Architecture",
        metrics: "Metrics",
        principles: "Principles",
      },
    },
    architecture: {
      title: "Architecture",
      subtitle: "How portfolio v2 organizes layers, data flow and technical governance.",
      roleLabel: "Role",
      rationaleLabel: "Rationale",
      layers: [
        {
          name: "Presentation Layer",
          role: "Define routes and page composition with the App Router.",
          modules: ["/src/app/v2/page.tsx", "/src/app/v2/projetos/[slug]/page.tsx", "/src/app/v2/layout.tsx"],
          rationale:
            "Keeps navigation and SEO centralized without coupling implementation details of components.",
        },
        {
          name: "Component Layer",
          role: "Encapsulate reusable UI and experience building blocks.",
          modules: ["/src/components/Hero.tsx", "/src/components/Work.tsx", "/src/components/ProjectCard.tsx"],
          rationale:
            "Allows sections to evolve without duplicating logic across home, project list and case studies.",
        },
        {
          name: "Domain/Data Layer",
          role: "Model projects and ordering rules.",
          modules: ["/src/data/projects.ts", "/src/data/projects.test.ts"],
          rationale: "Acts as a single source for portfolio v2 and keeps behavior aligned with tests.",
        },
        {
          name: "Infrastructure Layer",
          role: "Support observability, technical SEO and performance governance.",
          modules: [
            "/src/lib/analytics.ts",
            "/src/app/api/og/route.tsx",
            "/scripts/check-bundle.js",
            "/.github/workflows/ci.yml",
          ],
          rationale:
            "Reduces silent regressions with CI, bundle budgets and product-oriented telemetry.",
        },
      ],
      c4Title: "EcoVoz C4 Diagram",
      c4Subtitle: "Interactive view of EcoVoz system and container levels.",
      requestFlowTitle: "Request Flow",
      requestFlowSubtitle: "End-to-end navigation and delivery flow in the portfolio.",
      requestFlow: [
        "User enters /v2 and navigates to a case study",
        "App Router resolves the route and canonical/OG metadata",
        "Domain layer returns typed project data",
        "Component layer renders narrative sections and outbound links",
        "Infrastructure layer records events and enforces the CI budget gate",
      ],
      relatedTitle: "Related Docs",
      relatedSubtitle: "Complementary technical pages for portfolio v2.",
      relatedLinks: {
        engineering: "Engineering",
        caseStudies: "Case Studies",
      },
    },
    principles: {
      title: "Engineering Principles",
      subtitle: "Guidelines used when designing and building software systems and products.",
      items: [
        {
          title: "Performance budgets first",
          description:
            "Define clear limits for bundle size, latency and rendering cost before adding new features.",
        },
        {
          title: "Accessibility by default",
          description:
            "Accessibility should exist from the start with semantic HTML, keyboard navigation and proper contrast.",
        },
        {
          title: "Observability before scale",
          description:
            "Before scaling, the system needs observability through events, metrics and error monitoring.",
        },
        {
          title: "Simplicity over abstraction",
          description:
            "Prefer simple and explicit solutions before introducing extra layers of abstraction.",
        },
        {
          title: "Product thinking over framework thinking",
          description:
            "Engineering decisions should maximize product value and user experience, not just follow trends.",
        },
      ],
      influenceTitle: "How They Influence Projects",
      influenceSubtitle: "Practical application of these principles in case studies and the delivery pipeline.",
      influences: [
        "Performance budgets are defined and monitored in CI with regression blocking.",
        "Analytics and web vitals instrumentation guide evolution through data.",
        "Layered architecture with a typed domain keeps clarity and maintainability high.",
      ],
      relatedLinks: {
        engineering: "Engineering",
        metrics: "Metrics",
        caseStudies: "Case Studies",
      },
    },
    metrics: {
      title: "Metrics",
      subtitle: "Technical indicators used to govern performance, quality and release readiness in the portfolio.",
      lastVerifiedLabel: "Last verified",
      lastVerifiedValue: "March 6, 2026",
      summaryCards: [
        {
          name: "First Load JS (/v2)",
          value: "107 kB",
          note: "Reduced from ~145 kB to ~107 kB after the Hero optimization cycle.",
        },
        {
          name: "Domain Test Suite",
          value: "7 tests passing",
          note: "Domain coverage for legacy and v2 layers.",
        },
        {
          name: "CI Quality Gates",
          value: "6 checks",
          note: "Typecheck, lint, test, build and 2 bundle budgets.",
        },
      ],
      bundleEvolutionTitle: "Bundle Evolution",
      bundleEvolutionSubtitle: "History of First Load JS reduction during the v1.4 cycle.",
      bundleReductionPrefix: "Accumulated reduction:",
      bundleReductionSuffix: "of improvement between the baseline and the current state.",
      bundleHistory: [
        {
          milestone: "Baseline",
          note: "Initial state before the v1.4 optimization work.",
        },
        {
          milestone: "Hero optimization",
          note: "Animation runtime removed from the critical path.",
        },
        {
          milestone: "Bundle governance",
          note: "Payload adjustments with budgets and chunk auditing.",
        },
        {
          milestone: "Current",
          note: "Current state with an active CI budget gate.",
        },
      ],
      bundleBudgetsTitle: "Bundle Budgets",
      bundleBudgetsSubtitle: "CI baselines monitored to avoid silent payload regressions.",
      limitLabel: "Limit",
      measuredLabel: "Measured",
      pipelineTitle: "CI Pipeline",
      pipelineSubtitle: "Validation stages executed before every merge to main.",
      pipelineSteps: [
        {
          step: "Type Safety",
          purpose: "Guarantee type consistency across the domain and routes.",
        },
        {
          step: "Lint",
          purpose: "Keep code quality consistent and avoid style regressions.",
        },
        {
          step: "Domain Tests",
          purpose: "Validate domain rules such as slugs, ordering and minimum schema.",
        },
        {
          step: "Production Build",
          purpose: "Ensure compilation and static generation succeed without failures.",
        },
        {
          step: "Bundle Gate",
          purpose: "Block merges when payload exceeds the defined budget.",
        },
      ],
      relatedTitle: "Related Docs",
      relatedSubtitle: "Technical documentation connected to these indicators.",
      relatedLinks: {
        architecture: "Architecture",
        engineering: "Engineering",
      },
    },
    contactCta: {
      title: "Contact",
      subtitle: "Open to remote opportunities, freelance work and product collaborations.",
      body:
        "If you need a developer focused on product, performance and accessibility, I can support discovery, implementation and delivery.",
      viewContact: "View contact page",
      sendEmail: "Send email",
    },
    about: {
      title: "About",
      subtitle: "Building software focused on accessibility, real impact and code quality.",
      paragraphs: [
        "Full-stack developer focused on building accessible technology with React, Next.js, TypeScript and Node.js.",
        "Creator of EcoVoz, a multimodal assistive communication platform designed for real-world impact.",
        "Based in Brazil, focused on product engineering, performance and user experience.",
      ],
    },
    stack: {
      title: "Tech Stack",
      subtitle: "Technical foundation for building modern, scalable and observable web products.",
    },
    contact: {
      title: "Contact",
      subtitle: "Open to projects, product teams and remote opportunities.",
      lead: "Let's build something valuable",
      body:
        "If you need a developer focused on product, performance and user experience, I can contribute across discovery, implementation and delivery.",
      sendEmail: "Send email",
      connectLinkedIn: "Connect on LinkedIn",
      viewGithub: "View GitHub",
      availability: "Availability",
      availabilityValue: "Freelance and remote opportunities",
      response: "Response time",
      responseValue: "Usually within 24 hours",
      location: "Location",
      locationValue: "Atibaia, Sao Paulo, Brazil",
    },
    archive: {
      title: "Archive",
      subtitle: "Study projects, experiments and iterations that built the current foundation.",
      backToMain: "Back to main projects",
      live: "Live",
      source: "Source",
    },
    caseStudy: {
      notFoundTitle: "Project not found",
      titleSuffix: "Case Study",
      back: "Back to projects",
      minRead: "min read",
      sectionNavigation: "Section Navigation",
      overview: "Overview",
      challenge: "Challenge",
      challengeSubtitle: "Main product problem context.",
      solution: "Solution",
      solutionSubtitle: "Applied engineering and experience direction.",
      timeline: "Project Timeline",
      timelineSubtitle: "Project evolution from discovery to the current stage.",
      architecture: "Architecture",
      architectureSubtitle: "Main solution layers in production.",
      features: "Key Features",
      featuresSubtitle: "Core capabilities delivered in the product.",
      technicalChallenges: "Technical Challenges",
      technicalChallengesSubtitle:
        "Technical decisions to balance quality, delivery and scalability.",
      techStack: "Tech Stack",
      techStackSubtitle: "Main tools used in implementation.",
      impact: "Impact",
      impactSubtitle: "Outcome and perceived business value.",
      nextIteration: "Next Iteration",
      nextIterationSubtitle: "Planned evolution for the next cycles.",
      lessons: "What I Learned",
      lessonsSubtitle: "Technical learnings applied in the next cycles.",
      links: "Links",
      linksSubtitle: "Direct access to product and source code.",
      labels: {
        stack: "STACK",
        year: "YEAR",
        role: "ROLE",
        status: "STATUS",
      },
      status: {
        active: "Active Development",
        completed: "Completed",
        experimental: "Experimental",
      },
      liveProduct: "View product",
      viewSource: "View source",
      readingProgressAria: "Case study reading progress",
      coverAltPrefix: "Project cover",
      architectureDiagramAltPrefix: "Architecture diagram for project",
      metricLabels: {
        accessibilityScore: "Accessibility Score",
        avgLatency: "Avg Response Latency",
        completionRate: "Interaction Success",
        stackSize: "Tech Stack",
      },
    },
  },
  "pt-BR": {
    ...baseMessages,
    locale: {
      ...baseMessages.locale,
      label: "Idioma",
    },
    common: {
      homeHeroAriaLabel: "Hero da home",
      lateralControlsAriaLabel: "Controles laterais",
    },
    nav: {
      brand: "JR Minimal",
      ariaLabel: "Navegacao principal",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      search: "Buscar",
      items: {
        home: "Home",
        projects: "Projetos",
        archive: "Arquivo",
        architecture: "Arquitetura",
        engineering: "Engenharia",
        metrics: "Metricas",
        principles: "Principios",
        about: "Sobre",
        contact: "Contato",
      },
      searchHint: "Buscar - Ctrl + K",
    },
    commandPalette: {
      dialogLabel: "Menu de comandos",
      placeholder: "Buscar projetos e docs...",
      empty: "Nenhum resultado encontrado.",
      groups: {
        page: "Pagina",
        project: "Projeto",
      },
    },
    themeSwitcher: {
      light: "Claro",
      dark: "Escuro",
      monospaced: "Monoespacado",
      switcher: "Seletor de tema",
    },
    hero: {
      ariaLabel: "Hero da home",
      role: "Full-Stack Developer",
      summary: "Construindo sistemas de acessibilidade e ferramentas com IA. Criador do EcoVoz.",
      ctaWork: "Ver projetos",
      ctaGithub: "GitHub",
      ctaLinkedIn: "LinkedIn",
    },
    work: {
      selectedTitle: "Projetos em destaque",
      selectedSubtitle: "Projetos com foco em produto, experiencia do usuario e engenharia de software.",
      allTitle: "Todos os projetos",
      allSubtitle: "Cases focados em produto digital, engenharia pragmatica e experiencia.",
      viewAll: "Ver todos os projetos",
      readTime: "min de leitura",
      caseStudy: "Estudo de caso",
      live: "Produto",
      source: "Codigo",
      archiveLead: "Quer ver projetos de estudo e iteracoes anteriores? Explore o",
      archiveLink: "Arquivo",
    },
    engineeringLinks: {
      title: "Docs de Engenharia",
      subtitle: "Documentacao tecnica publica do portfolio.",
      open: "Abrir",
      docs: [
        {
          key: "architecture",
          title: "Arquitetura",
          description: "Camadas, fluxo de request e estrutura tecnica do portfolio.",
        },
        {
          key: "engineering",
          title: "Engenharia",
          description: "Hub de ADRs com decisoes de arquitetura, trade-offs e notas tecnicas.",
        },
        {
          key: "metrics",
          title: "Metricas",
          description: "Budgets de bundle, pipeline de qualidade e evolucao de performance.",
        },
        {
          key: "principles",
          title: "Principios",
          description: "Principios de engenharia que orientam arquitetura, qualidade e entrega.",
        },
      ],
    },
    engineering: {
      title: "Engenharia",
      subtitle: "Decisoes de arquitetura e notas tecnicas que documentam a evolucao do portfolio.",
      publishedLabel: "Publicado",
      statusLabel: "Status",
      tagsLabel: "Tags",
      readAdr: "Ler ADR",
      backToHub: "Voltar para engenharia",
      readingProgressAria: "Progresso de leitura do ADR",
      sectionAnchorLabel: "Link da secao",
      tableOfContents: "Indice",
      paginationLabel: "Navegacao entre ADRs",
      previousAdr: "ADR anterior",
      nextAdr: "Proximo ADR",
      status: {
        proposed: "Proposto",
        accepted: "Aceito",
        deprecated: "Descontinuado",
      },
      relatedTitle: "Docs Relacionadas",
      relatedSubtitle: "Paginas complementares com arquitetura, metricas e principios de engenharia.",
      relatedLinks: {
        architecture: "Arquitetura",
        metrics: "Metricas",
        principles: "Principios",
      },
    },
    architecture: {
      title: "Arquitetura",
      subtitle: "Visao de como o portfolio v2 organiza camadas, dados e governanca tecnica.",
      roleLabel: "Papel",
      rationaleLabel: "Justificativa",
      layers: [
        {
          name: "Camada de Apresentacao",
          role: "Define rotas e composicao de pagina com App Router.",
          modules: ["/src/app/v2/page.tsx", "/src/app/v2/projetos/[slug]/page.tsx", "/src/app/v2/layout.tsx"],
          rationale:
            "Mantem navegacao e SEO centralizados sem acoplar detalhes de implementacao de componentes.",
        },
        {
          name: "Camada de Componentes",
          role: "Encapsula UI reutilizavel e blocos de experiencia.",
          modules: ["/src/components/Hero.tsx", "/src/components/Work.tsx", "/src/components/ProjectCard.tsx"],
          rationale:
            "Permite evoluir secoes sem duplicar logica entre home, lista de projetos e case studies.",
        },
        {
          name: "Camada de Dominio e Dados",
          role: "Modela projetos e regras de ordenacao.",
          modules: ["/src/data/projects.ts", "/src/data/projects.test.ts"],
          rationale: "Funciona como fonte unica para o portfolio v2 e garante consistencia com testes.",
        },
        {
          name: "Camada de Infraestrutura",
          role: "Suporta observabilidade, SEO tecnico e governanca de performance.",
          modules: [
            "/src/lib/analytics.ts",
            "/src/app/api/og/route.tsx",
            "/scripts/check-bundle.js",
            "/.github/workflows/ci.yml",
          ],
          rationale:
            "Reduz regressao silenciosa com CI, budget de bundle e telemetria orientada a produto.",
        },
      ],
      c4Title: "Diagrama C4 do EcoVoz",
      c4Subtitle: "Visao interativa dos niveis de sistema e containers do EcoVoz.",
      requestFlowTitle: "Fluxo de Requisicao",
      requestFlowSubtitle: "Fluxo fim a fim de navegacao e entrega de valor no portfolio.",
      requestFlow: [
        "Usuario acessa /v2 e navega para um case study",
        "App Router resolve a rota e a metadata canonica/OG",
        "A camada de dominio entrega dados tipados do projeto",
        "A camada de componentes renderiza secoes de narrativa e links",
        "A infraestrutura registra eventos e aplica o budget gate no CI",
      ],
      relatedTitle: "Docs Relacionadas",
      relatedSubtitle: "Paginas tecnicas complementares do portfolio v2.",
      relatedLinks: {
        engineering: "Engenharia",
        caseStudies: "Estudos de caso",
      },
    },
    principles: {
      title: "Principios de Engenharia",
      subtitle: "Diretrizes usadas ao desenhar e construir sistemas e produtos de software.",
      items: [
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
      ],
      influenceTitle: "Como Influenciam os Projetos",
      influenceSubtitle: "Aplicacao pratica desses principios nos case studies e no pipeline.",
      influences: [
        "Performance budgets definidos e monitorados no CI com bloqueio de regressao.",
        "Instrumentacao de analytics e web vitals para evolucao orientada por dados.",
        "Arquitetura em camadas com dominio tipado para manter clareza e manutenibilidade.",
      ],
      relatedLinks: {
        engineering: "Engenharia",
        metrics: "Metricas",
        caseStudies: "Estudos de caso",
      },
    },
    metrics: {
      title: "Metricas",
      subtitle: "Indicadores tecnicos usados para governar performance, qualidade e release do portfolio.",
      lastVerifiedLabel: "Ultima verificacao",
      lastVerifiedValue: "6 de marco de 2026",
      summaryCards: [
        {
          name: "First Load JS (/v2)",
          value: "107 kB",
          note: "Reducao de ~145 kB para ~107 kB apos otimizacao do Hero.",
        },
        {
          name: "Domain Test Suite",
          value: "7 testes passando",
          note: "Cobertura de dominio para camadas legado e v2.",
        },
        {
          name: "CI Quality Gates",
          value: "6 checks",
          note: "Typecheck, lint, test, build e 2 budgets de bundle.",
        },
      ],
      bundleEvolutionTitle: "Evolucao do Bundle",
      bundleEvolutionSubtitle: "Historico de reducao do First Load JS no ciclo v1.4.",
      bundleReductionPrefix: "Reducao acumulada:",
      bundleReductionSuffix: "de melhoria entre o baseline e o estado atual.",
      bundleHistory: [
        {
          milestone: "Baseline",
          note: "Estado inicial antes das otimizacoes de v1.4.",
        },
        {
          milestone: "Hero optimization",
          note: "Remocao de runtime de animacao no caminho critico.",
        },
        {
          milestone: "Bundle governance",
          note: "Ajustes de payload com budget e auditoria de chunks.",
        },
        {
          milestone: "Current",
          note: "Estado atual com budget gate ativo no CI.",
        },
      ],
      bundleBudgetsTitle: "Budgets de Bundle",
      bundleBudgetsSubtitle: "Baselines monitorados em CI para evitar regressao silenciosa de payload.",
      limitLabel: "Limite",
      measuredLabel: "Medido",
      pipelineTitle: "Pipeline de CI",
      pipelineSubtitle: "Etapas de validacao executadas antes de cada merge para main.",
      pipelineSteps: [
        {
          step: "Type Safety",
          purpose: "Garantir consistencia de tipos no dominio e nas rotas.",
        },
        {
          step: "Lint",
          purpose: "Padronizar qualidade de codigo e evitar regressao de estilo.",
        },
        {
          step: "Domain Tests",
          purpose: "Validar regras de dominio como slugs, ordenacao e schema minimo.",
        },
        {
          step: "Production Build",
          purpose: "Assegurar compilacao e geracao estatica sem falhas.",
        },
        {
          step: "Bundle Gate",
          purpose: "Bloquear merge se o payload ultrapassar o budget definido.",
        },
      ],
      relatedTitle: "Docs Relacionadas",
      relatedSubtitle: "Documentacao tecnica conectada a estes indicadores.",
      relatedLinks: {
        architecture: "Arquitetura",
        engineering: "Engenharia",
      },
    },
    contactCta: {
      title: "Contato",
      subtitle: "Aberto para oportunidades remotas, freelance e colaboracoes em produto.",
      body:
        "Se voce precisa de um desenvolvedor focado em produto, performance e acessibilidade, posso contribuir em discovery, implementacao e entrega.",
      viewContact: "Ver pagina de contato",
      sendEmail: "Enviar email",
    },
    about: {
      title: "Sobre",
      subtitle: "Construindo software com foco em acessibilidade, impacto real e qualidade de codigo.",
      paragraphs: [
        "Full-stack developer focado em construir tecnologia acessivel, com React, Next.js, TypeScript e Node.js.",
        "Criador do EcoVoz, uma plataforma de comunicacao assistiva multimodal, orientada a impacto real.",
        "Baseado no Brasil, com foco em engenharia de produto, performance e experiencia do usuario.",
      ],
    },
    stack: {
      title: "Tech Stack",
      subtitle: "Base tecnica para construir produtos web modernos, escalaveis e observaveis.",
    },
    contact: {
      title: "Contato",
      subtitle: "Aberto para projetos, times de produto e oportunidades remotas.",
      lead: "Vamos construir algo valioso",
      body:
        "Se voce precisa de um desenvolvedor focado em produto, performance e experiencia de usuario, posso contribuir em discovery, implementacao e entrega.",
      sendEmail: "Enviar email",
      connectLinkedIn: "Conectar no LinkedIn",
      viewGithub: "Ver GitHub",
      availability: "Disponibilidade",
      availabilityValue: "Freelance e oportunidades remotas",
      response: "Resposta",
      responseValue: "Normalmente em ate 24 horas",
      location: "Localizacao",
      locationValue: "Atibaia, Sao Paulo, Brasil",
    },
    archive: {
      title: "Arquivo",
      subtitle: "Projetos de estudo, experimentos e iteracoes que ajudaram a construir a base atual.",
      backToMain: "Voltar para projetos principais",
      live: "Produto",
      source: "Codigo",
    },
    caseStudy: {
      notFoundTitle: "Projeto nao encontrado",
      titleSuffix: "Estudo de caso",
      back: "Voltar para projetos",
      minRead: "min de leitura",
      sectionNavigation: "Navegacao de secoes",
      overview: "Visao geral",
      challenge: "Desafio",
      challengeSubtitle: "Contexto principal do problema de produto.",
      solution: "Solucao",
      solutionSubtitle: "Direcao de engenharia e experiencia aplicada.",
      timeline: "Timeline do Projeto",
      timelineSubtitle: "Evolucao do projeto do discovery ate a fase atual.",
      architecture: "Arquitetura",
      architectureSubtitle: "Camadas principais da solucao em producao.",
      features: "Funcionalidades-chave",
      featuresSubtitle: "Capacidades centrais entregues no produto.",
      technicalChallenges: "Desafios Tecnicos",
      technicalChallengesSubtitle:
        "Decisoes tecnicas para equilibrar qualidade, entrega e escalabilidade.",
      techStack: "Tech Stack",
      techStackSubtitle: "Ferramentas principais usadas na implementacao.",
      impact: "Impacto",
      impactSubtitle: "Resultado e valor de negocio percebido.",
      nextIteration: "Proxima Iteracao",
      nextIterationSubtitle: "Evolucoes previstas para os proximos ciclos.",
      lessons: "Aprendizados",
      lessonsSubtitle: "Aprendizados tecnicos aplicados nos proximos ciclos.",
      links: "Links",
      linksSubtitle: "Acesso direto ao produto e ao codigo fonte.",
      labels: {
        stack: "STACK",
        year: "ANO",
        role: "PAPEL",
        status: "STATUS",
      },
      status: {
        active: "Em desenvolvimento",
        completed: "Concluido",
        experimental: "Experimental",
      },
      liveProduct: "Ver produto",
      viewSource: "Ver repositorio",
      readingProgressAria: "Progresso de leitura do case study",
      coverAltPrefix: "Capa do projeto",
      architectureDiagramAltPrefix: "Diagrama de arquitetura do projeto",
      metricLabels: {
        accessibilityScore: "Pontuacao de acessibilidade",
        avgLatency: "Latencia media de resposta",
        completionRate: "Sucesso de interacao",
        stackSize: "Tech Stack",
      },
    },
  },
  es: {
    ...baseMessages,
    locale: {
      ...baseMessages.locale,
      label: "Idioma",
    },
    common: {
      homeHeroAriaLabel: "Hero de inicio",
      lateralControlsAriaLabel: "Controles laterales",
    },
    nav: {
      brand: "JR Minimal",
      ariaLabel: "Navegacion principal",
      openMenu: "Abrir menu",
      closeMenu: "Cerrar menu",
      search: "Buscar",
      items: {
        home: "Inicio",
        projects: "Proyectos",
        archive: "Archivo",
        architecture: "Arquitectura",
        engineering: "Ingenieria",
        metrics: "Metricas",
        principles: "Principios",
        about: "Sobre mi",
        contact: "Contacto",
      },
      searchHint: "Buscar - Ctrl + K",
    },
    commandPalette: {
      dialogLabel: "Menu de comandos",
      placeholder: "Buscar proyectos y documentacion...",
      empty: "No se encontraron resultados.",
      groups: {
        page: "Pagina",
        project: "Proyecto",
      },
    },
    themeSwitcher: {
      light: "Claro",
      dark: "Oscuro",
      monospaced: "Monoespaciado",
      switcher: "Selector de tema",
    },
    hero: {
      ariaLabel: "Hero de inicio",
      role: "Desarrollador Full-Stack",
      summary: "Construyendo sistemas de accesibilidad y herramientas impulsadas por IA. Creador de EcoVoz.",
      ctaWork: "Ver proyectos",
      ctaGithub: "GitHub",
      ctaLinkedIn: "LinkedIn",
    },
    work: {
      selectedTitle: "Proyectos Destacados",
      selectedSubtitle: "Proyectos enfocados en producto, experiencia de usuario e ingenieria de software.",
      allTitle: "Todos los Proyectos",
      allSubtitle: "Case studies centrados en producto digital, ingenieria pragmatica y UX.",
      viewAll: "Ver todos los proyectos",
      readTime: "min de lectura",
      caseStudy: "Estudio de caso",
      live: "Producto",
      source: "Codigo",
      archiveLead: "Quieres ver proyectos de estudio e iteraciones anteriores? Explora el",
      archiveLink: "Archivo",
    },
    engineeringLinks: {
      title: "Documentacion de Ingenieria",
      subtitle: "Documentacion tecnica publica del portfolio.",
      open: "Abrir",
      docs: [
        {
          key: "architecture",
          title: "Arquitectura",
          description: "Capas, flujo de requests y estructura tecnica del portfolio.",
        },
        {
          key: "engineering",
          title: "Ingenieria",
          description: "Hub de ADRs con decisiones de arquitectura, trade-offs y notas tecnicas.",
        },
        {
          key: "metrics",
          title: "Metricas",
          description: "Presupuestos de bundle, pipeline de calidad y evolucion de performance.",
        },
        {
          key: "principles",
          title: "Principios",
          description: "Principios de ingenieria que guian arquitectura, calidad y entrega.",
        },
      ],
    },
    engineering: {
      title: "Ingenieria",
      subtitle: "Decisiones de arquitectura y notas tecnicas que documentan la evolucion del portfolio.",
      publishedLabel: "Publicado",
      statusLabel: "Estado",
      tagsLabel: "Tags",
      readAdr: "Leer ADR",
      backToHub: "Volver a ingenieria",
      readingProgressAria: "Progreso de lectura del ADR",
      sectionAnchorLabel: "Enlace de seccion",
      tableOfContents: "Indice",
      paginationLabel: "Navegacion entre ADRs",
      previousAdr: "ADR anterior",
      nextAdr: "ADR siguiente",
      status: {
        proposed: "Propuesto",
        accepted: "Aceptado",
        deprecated: "Descontinuado",
      },
      relatedTitle: "Docs Relacionadas",
      relatedSubtitle: "Paginas complementarias con arquitectura, metricas y principios de ingenieria.",
      relatedLinks: {
        architecture: "Arquitectura",
        metrics: "Metricas",
        principles: "Principios",
      },
    },
    architecture: {
      title: "Arquitectura",
      subtitle: "Vision de como el portfolio v2 organiza capas, datos y gobernanza tecnica.",
      roleLabel: "Rol",
      rationaleLabel: "Justificacion",
      layers: [
        {
          name: "Capa de Presentacion",
          role: "Define rutas y composicion de paginas con App Router.",
          modules: ["/src/app/v2/page.tsx", "/src/app/v2/projetos/[slug]/page.tsx", "/src/app/v2/layout.tsx"],
          rationale:
            "Mantiene navegacion y SEO centralizados sin acoplar detalles de implementacion de componentes.",
        },
        {
          name: "Capa de Componentes",
          role: "Encapsula UI reutilizable y bloques de experiencia.",
          modules: ["/src/components/Hero.tsx", "/src/components/Work.tsx", "/src/components/ProjectCard.tsx"],
          rationale:
            "Permite evolucionar secciones sin duplicar logica entre home, lista de proyectos y case studies.",
        },
        {
          name: "Capa de Dominio y Datos",
          role: "Modela proyectos y reglas de ordenamiento.",
          modules: ["/src/data/projects.ts", "/src/data/projects.test.ts"],
          rationale: "Funciona como fuente unica del portfolio v2 y mantiene consistencia con pruebas.",
        },
        {
          name: "Capa de Infraestructura",
          role: "Soporta observabilidad, SEO tecnico y gobernanza de performance.",
          modules: [
            "/src/lib/analytics.ts",
            "/src/app/api/og/route.tsx",
            "/scripts/check-bundle.js",
            "/.github/workflows/ci.yml",
          ],
          rationale:
            "Reduce regresiones silenciosas con CI, budgets de bundle y telemetria orientada a producto.",
        },
      ],
      c4Title: "Diagrama C4 de EcoVoz",
      c4Subtitle: "Vision interactiva de los niveles de sistema y contenedores de EcoVoz.",
      requestFlowTitle: "Flujo de Request",
      requestFlowSubtitle: "Flujo end to end de navegacion y entrega de valor en el portfolio.",
      requestFlow: [
        "El usuario entra en /v2 y navega hacia un case study",
        "App Router resuelve la ruta y la metadata canonica/OG",
        "La capa de dominio entrega datos tipados del proyecto",
        "La capa de componentes renderiza secciones narrativas y enlaces",
        "La infraestructura registra eventos y aplica el budget gate en CI",
      ],
      relatedTitle: "Docs Relacionadas",
      relatedSubtitle: "Paginas tecnicas complementarias del portfolio v2.",
      relatedLinks: {
        engineering: "Ingenieria",
        caseStudies: "Estudios de caso",
      },
    },
    principles: {
      title: "Principios de Ingenieria",
      subtitle: "Directrices usadas para disenar y construir sistemas y productos de software.",
      items: [
        {
          title: "Performance budgets first",
          description:
            "Definir limites claros de bundle size, latencia y costo de renderizado antes de agregar nuevas features.",
        },
        {
          title: "Accessibility by default",
          description:
            "La accesibilidad debe existir desde el inicio con HTML semantico, navegacion por teclado y contraste adecuado.",
        },
        {
          title: "Observability before scale",
          description:
            "Antes de escalar, el sistema necesita observabilidad con eventos, metricas y monitoreo de errores.",
        },
        {
          title: "Simplicity over abstraction",
          description:
            "Priorizar soluciones simples y explicitas antes de introducir capas adicionales de abstraccion.",
        },
        {
          title: "Product thinking over framework thinking",
          description:
            "Las decisiones de ingenieria deben maximizar valor de producto y experiencia de usuario, no solo seguir tendencias.",
        },
      ],
      influenceTitle: "Como Influyen en los Proyectos",
      influenceSubtitle: "Aplicacion practica de estos principios en los case studies y el pipeline.",
      influences: [
        "Performance budgets definidos y monitoreados en CI con bloqueo de regresiones.",
        "Instrumentacion de analytics y web vitals para evolucion guiada por datos.",
        "Arquitectura en capas con dominio tipado para mantener claridad y mantenibilidad.",
      ],
      relatedLinks: {
        engineering: "Ingenieria",
        metrics: "Metricas",
        caseStudies: "Estudios de caso",
      },
    },
    metrics: {
      title: "Metricas",
      subtitle: "Indicadores tecnicos usados para gobernar performance, calidad y release del portfolio.",
      lastVerifiedLabel: "Ultima verificacion",
      lastVerifiedValue: "6 de marzo de 2026",
      summaryCards: [
        {
          name: "First Load JS (/v2)",
          value: "107 kB",
          note: "Reduccion de ~145 kB a ~107 kB despues de la optimizacion del Hero.",
        },
        {
          name: "Domain Test Suite",
          value: "7 tests passing",
          note: "Cobertura de dominio para capas legacy y v2.",
        },
        {
          name: "CI Quality Gates",
          value: "6 checks",
          note: "Typecheck, lint, test, build y 2 budgets de bundle.",
        },
      ],
      bundleEvolutionTitle: "Evolucion del Bundle",
      bundleEvolutionSubtitle: "Historial de reduccion de First Load JS en el ciclo v1.4.",
      bundleReductionPrefix: "Reduccion acumulada:",
      bundleReductionSuffix: "de mejora entre el baseline y el estado actual.",
      bundleHistory: [
        {
          milestone: "Baseline",
          note: "Estado inicial antes de las optimizaciones de v1.4.",
        },
        {
          milestone: "Hero optimization",
          note: "Remocion del runtime de animacion del camino critico.",
        },
        {
          milestone: "Bundle governance",
          note: "Ajustes de payload con budget y auditoria de chunks.",
        },
        {
          milestone: "Current",
          note: "Estado actual con budget gate activo en CI.",
        },
      ],
      bundleBudgetsTitle: "Budgets de Bundle",
      bundleBudgetsSubtitle: "Baselines monitoreados en CI para evitar regresiones silenciosas de payload.",
      limitLabel: "Limite",
      measuredLabel: "Medido",
      pipelineTitle: "Pipeline de CI",
      pipelineSubtitle: "Etapas de validacion ejecutadas antes de cada merge a main.",
      pipelineSteps: [
        {
          step: "Type Safety",
          purpose: "Garantizar consistencia de tipos en dominio y rutas.",
        },
        {
          step: "Lint",
          purpose: "Estandarizar calidad de codigo y evitar regresiones de estilo.",
        },
        {
          step: "Domain Tests",
          purpose: "Validar reglas de dominio como slugs, ordenamiento y schema minimo.",
        },
        {
          step: "Production Build",
          purpose: "Asegurar compilacion y generacion estatica sin fallas.",
        },
        {
          step: "Bundle Gate",
          purpose: "Bloquear merges cuando el payload supera el budget definido.",
        },
      ],
      relatedTitle: "Docs Relacionadas",
      relatedSubtitle: "Documentacion tecnica conectada con estos indicadores.",
      relatedLinks: {
        architecture: "Arquitectura",
        engineering: "Ingenieria",
      },
    },
    contactCta: {
      title: "Contacto",
      subtitle: "Disponible para oportunidades remotas, freelance y colaboraciones de producto.",
      body:
        "Si necesitas un desarrollador enfocado en producto, performance y accesibilidad, puedo contribuir en discovery, implementacion y entrega.",
      viewContact: "Ver pagina de contacto",
      sendEmail: "Enviar email",
    },
    about: {
      title: "Sobre mi",
      subtitle: "Construyendo software con foco en accesibilidad, impacto real y calidad de codigo.",
      paragraphs: [
        "Desarrollador full-stack enfocado en construir tecnologia accesible con React, Next.js, TypeScript y Node.js.",
        "Creador de EcoVoz, una plataforma multimodal de comunicacion asistiva orientada a impacto real.",
        "Basado en Brasil, con foco en ingenieria de producto, performance y experiencia de usuario.",
      ],
    },
    stack: {
      title: "Stack Tecnologico",
      subtitle: "Base tecnica para construir productos web modernos, escalables y observables.",
    },
    contact: {
      title: "Contacto",
      subtitle: "Disponible para proyectos, equipos de producto y oportunidades remotas.",
      lead: "Construyamos algo valioso",
      body:
        "Si necesitas un desarrollador enfocado en producto, performance y experiencia de usuario, puedo contribuir en discovery, implementacion y entrega.",
      sendEmail: "Enviar email",
      connectLinkedIn: "Conectar en LinkedIn",
      viewGithub: "Ver GitHub",
      availability: "Disponibilidad",
      availabilityValue: "Freelance y oportunidades remotas",
      response: "Respuesta",
      responseValue: "Normalmente en hasta 24 horas",
      location: "Ubicacion",
      locationValue: "Atibaia, Sao Paulo, Brasil",
    },
    archive: {
      title: "Archivo",
      subtitle: "Proyectos de estudio, experimentos e iteraciones que construyeron la base actual.",
      backToMain: "Volver a proyectos principales",
      live: "Producto",
      source: "Codigo",
    },
    caseStudy: {
      notFoundTitle: "Proyecto no encontrado",
      titleSuffix: "Estudio de caso",
      back: "Volver a proyectos",
      minRead: "min de lectura",
      sectionNavigation: "Navegacion de secciones",
      overview: "Resumen",
      challenge: "Desafio",
      challengeSubtitle: "Contexto principal del problema de producto.",
      solution: "Solucion",
      solutionSubtitle: "Direccion aplicada de ingenieria y experiencia.",
      timeline: "Timeline del Proyecto",
      timelineSubtitle: "Evolucion del proyecto desde discovery hasta la fase actual.",
      architecture: "Arquitectura",
      architectureSubtitle: "Capas principales de la solucion en produccion.",
      features: "Funcionalidades Clave",
      featuresSubtitle: "Capacidades centrales entregadas en el producto.",
      technicalChallenges: "Desafios Tecnicos",
      technicalChallengesSubtitle:
        "Decisiones tecnicas para equilibrar calidad, entrega y escalabilidad.",
      techStack: "Stack Tecnologico",
      techStackSubtitle: "Herramientas principales usadas en la implementacion.",
      impact: "Impacto",
      impactSubtitle: "Resultado y valor de negocio percibido.",
      nextIteration: "Proxima Iteracion",
      nextIterationSubtitle: "Evoluciones previstas para los proximos ciclos.",
      lessons: "Aprendizajes",
      lessonsSubtitle: "Aprendizajes tecnicos aplicados en los siguientes ciclos.",
      links: "Enlaces",
      linksSubtitle: "Acceso directo al producto y al codigo fuente.",
      labels: {
        stack: "STACK",
        year: "ANO",
        role: "ROL",
        status: "ESTADO",
      },
      status: {
        active: "Desarrollo activo",
        completed: "Completado",
        experimental: "Experimental",
      },
      liveProduct: "Ver producto",
      viewSource: "Ver repositorio",
      readingProgressAria: "Progreso de lectura del case study",
      coverAltPrefix: "Portada del proyecto",
      architectureDiagramAltPrefix: "Diagrama de arquitectura del proyecto",
      metricLabels: {
        accessibilityScore: "Puntuacion de accesibilidad",
        avgLatency: "Latencia media de respuesta",
        completionRate: "Exito de interaccion",
        stackSize: "Stack tecnologico",
      },
    },
  },
};

export function getV2Messages(locale: V2Locale): V2Messages {
  return v2Messages[locale];
}

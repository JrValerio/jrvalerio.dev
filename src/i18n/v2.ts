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
    placeholder: string;
    empty: string;
    groups: {
      page: string;
      project: string;
    };
  };
  hero: {
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
      placeholder: "Search projects and docs...",
      empty: "No results found.",
      groups: {
        page: "Page",
        project: "Project",
      },
    },
    hero: {
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
    },
  },
  "pt-BR": {
    ...baseMessages,
    nav: {
      brand: "JR Minimal",
      ariaLabel: "Navegacao principal",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      search: "Buscar",
      items: {
        home: "Home",
        projects: "Projetos",
        archive: "Archive",
        architecture: "Architecture",
        engineering: "Engineering",
        metrics: "Metrics",
        principles: "Principles",
        about: "Sobre",
        contact: "Contato",
      },
      searchHint: "Buscar - Ctrl + K",
    },
    commandPalette: {
      placeholder: "Buscar projetos e docs...",
      empty: "Nenhum resultado encontrado.",
      groups: {
        page: "Pagina",
        project: "Projeto",
      },
    },
    hero: {
      role: "Full-Stack Developer",
      summary: "Construindo sistemas de acessibilidade e ferramentas com IA. Criador do EcoVoz.",
      ctaWork: "Ver projetos",
      ctaGithub: "GitHub",
      ctaLinkedIn: "LinkedIn",
    },
    work: {
      selectedTitle: "Selected Work",
      selectedSubtitle: "Projetos com foco em produto, experiencia do usuario e engenharia de software.",
      allTitle: "All Projects",
      allSubtitle: "Cases focados em produto digital, engenharia pragmatica e experiencia.",
      viewAll: "Ver todos os projetos",
      readTime: "min de leitura",
      caseStudy: "Case Study",
      live: "Live",
      source: "Source",
      archiveLead: "Quer ver projetos de estudo e iteracoes anteriores? Explore o",
      archiveLink: "Archive",
    },
    engineeringLinks: {
      title: "Engineering Docs",
      subtitle: "Documentacao tecnica publica do portfolio.",
      open: "Abrir",
      docs: [
        {
          key: "architecture",
          title: "Architecture",
          description: "Camadas, fluxo de request e estrutura tecnica do portfolio.",
        },
        {
          key: "engineering",
          title: "Engineering",
          description: "Hub de ADRs com decisoes de arquitetura, trade-offs e notas tecnicas.",
        },
        {
          key: "metrics",
          title: "Metrics",
          description: "Budgets de bundle, pipeline de qualidade e evolucao de performance.",
        },
        {
          key: "principles",
          title: "Principles",
          description: "Principios de engenharia que orientam arquitetura, qualidade e entrega.",
        },
      ],
    },
    engineering: {
      title: "Engineering",
      subtitle: "Decisoes de arquitetura e notas tecnicas que documentam a evolucao do portfolio.",
      publishedLabel: "Publicado",
      statusLabel: "Status",
      tagsLabel: "Tags",
      readAdr: "Ler ADR",
      backToHub: "Voltar para engineering",
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
        architecture: "Architecture",
        metrics: "Metrics",
        principles: "Principles",
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
      title: "Archive",
      subtitle: "Projetos de estudo, experimentos e iteracoes que ajudaram a construir a base atual.",
      backToMain: "Voltar para projetos principais",
      live: "Live",
      source: "Source",
    },
    caseStudy: {
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
    },
  },
  es: {
    ...baseMessages,
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
      placeholder: "Buscar proyectos y documentacion...",
      empty: "No se encontraron resultados.",
      groups: {
        page: "Pagina",
        project: "Proyecto",
      },
    },
    hero: {
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
      caseStudy: "Case Study",
      live: "Live",
      source: "Source",
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
      live: "Live",
      source: "Source",
    },
    caseStudy: {
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
    },
  },
};

export function getV2Messages(locale: V2Locale): V2Messages {
  return v2Messages[locale];
}

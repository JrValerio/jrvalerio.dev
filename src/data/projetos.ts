function generateSlug(repo: string): string {
  return repo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export type ProjetoCustom = {
  descricaoKey: string;
  imagem: string;
  stack: string[];
  links: {
    demo?: string;
    github?: string;
  };
};

export type Projeto = {
  name: string;
  repo: string;
  slug: string;
  custom: ProjetoCustom;
};

export type CategoriaDeProjetos = {
  fullStack: Projeto[];
  frontEnd: Projeto[];
};

const projetos: CategoriaDeProjetos = {
  fullStack: [
    {
      name: "Control Finance",
      repo: "Control-Finance-React-TailWind",
      slug: generateSlug("Control-Finance-React-TailWind"),
      custom: {
        descricaoKey: "projects.controlFinance.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/Control-Finance-React-TailWind/main/src/assets/Control%20Finance.png",
        stack: ["React", "Tailwind", "JavaScript"],
        links: {
          demo: "https://control-finance-react-tail-wind.vercel.app/",
          github:
            "https://github.com/JrValerio/Control-Finance-React-TailWind",
        },
      },
    },
    {
      name: "Post-it",
      repo: "postit",
      slug: generateSlug("postit"),
      custom: {
        descricaoKey: "projects.postit.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/postit/main/public/assets/postit.png",
        stack: ["Node.js", "Express", "HTMX", "SQLite"],
        links: {
          demo: "https://postit-8nii.onrender.com/",
          github: "https://github.com/JrValerio/postit",
        },
      },
    },
    {
      name: "Kenzie Hub",
      repo: "Kenzie-Hub",
      slug: generateSlug("Kenzie-Hub"),
      custom: {
        descricaoKey: "projects.kenzieHub.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/Kenzie-Hub/main/src/assets/Kenzie%20Hub.png",
        stack: ["React", "React Hook Form", "Zod", "SASS"],
        links: {
          demo: "https://kenzie-hub-seven-blue.vercel.app/",
          github: "https://github.com/JrValerio/Kenzie-Hub",
        },
      },
    },
    {
      name: "Portfolio Template",
      repo: "portfolio-template-JrValerio",
      slug: generateSlug("portfolio-template-JrValerio"),
      custom: {
        descricaoKey: "projects.portfolioTemplate.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/portfolio-template-JrValerio/main/src/assets/portfolio-template-JrValerio.png",
        stack: ["React", "CSS", "Vercel"],
        links: {
          demo: "https://portfolio-template-jr-valerio.vercel.app/",
          github:
            "https://github.com/JrValerio/portfolio-template-JrValerio",
        },
      },
    },
    {
      name: "Hamburgueria Kenzie",
      repo: "template-hamburgueria",
      slug: generateSlug("template-hamburgueria"),
      custom: {
        descricaoKey: "projects.hamburgueria.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/template-hamburgueria/main/src/assets/Hamburgueria%20-Page.png",
        stack: ["React", "Axios", "SASS"],
        links: {
          demo: "https://template-hamburgueria.vercel.app/",
          github: "https://github.com/JrValerio/template-hamburgueria",
        },
      },
    },
    {
      name: "Buscador de CEP",
      repo: "buscadorcep",
      slug: generateSlug("buscadorcep"),
      custom: {
        descricaoKey: "projects.buscadorCEP.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/buscadorcep/main/Buscador%20CEP.png",
        stack: ["React", "JavaScript", "Axios", "Styled Components"],
        links: {
          demo:
            "https://buscadorcep-3qzvzd239-amaro-juniors-projects.vercel.app/",
          github: "https://github.com/JrValerio/buscadorcep",
        },
      },
    },
    {
      name: "Git Search",
      repo: "gitSearchBase",
      slug: generateSlug("gitSearchBase"),
      custom: {
        descricaoKey: "projects.gitSearch.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/gitSearchBase/main/src/assets/Git%20Search.png",
        stack: ["HTML", "CSS", "JavaScript", "API Integration"],
        links: {
          demo: "https://jrvalerio.github.io/gitSearchBase/index.html",
          github: "https://github.com/JrValerio/gitSearchBase",
        },
      },
    },
  ],
  frontEnd: [
    {
      name: "News Portal",
      repo: "newsportal",
      slug: generateSlug("newsportal"),
      custom: {
        descricaoKey: "projects.newsPortal.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/newsportal/main/assets/Screenshot%20News%20Portal.png",
        stack: ["HTML5", "CSS3"],
        links: {
          demo: "https://jrvalerio.github.io/newsportal/",
          github: "https://github.com/JrValerio/newsportal",
        },
      },
    },
    {
      name: "Travelgram",
      repo: "travelgram",
      slug: generateSlug("travelgram"),
      custom: {
        descricaoKey: "projects.travelgram.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/travelgram/main/assets/Screenshot%20Travelgram.png",
        stack: ["HTML5", "CSS3", "Google Fonts"],
        links: {
          demo: "https://jrvalerio.github.io/travelgram/",
          github: "https://github.com/JrValerio/travelgram",
        },
      },
    },
    {
      name: "Portfolio Dev",
      repo: "Portfolio-Dev",
      slug: generateSlug("Portfolio-Dev"),
      custom: {
        descricaoKey: "projects.portfolioDev.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/Portfolio-Dev/main/assets/Screenshot%20Portifolio%20DEV.png",
        stack: ["HTML5", "CSS3"],
        links: {
          demo: "https://jrvalerio.github.io/Portfolio-Dev/",
          github: "https://github.com/JrValerio/Portfolio-Dev",
        },
      },
    },
    {
      name: "Decodificador de Textos",
      repo: "decodificador-de-textos",
      slug: generateSlug("decodificador-de-textos"),
      custom: {
        descricaoKey: "projects.decodificadorDeTextos.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/decodificador-de-textos/main/assets/img/Decodificador%20de%20Textos.png",
        stack: ["JavaScript", "Tailwind CSS"],
        links: {
          demo: "https://decodificador-de-textos-lilac.vercel.app/",
          github: "https://github.com/JrValerio/decodificador-de-textos",
        },
      },
    },
    {
      name: "Site Institucional Genérico",
      repo: "site-institucional-generico",
      slug: generateSlug("site-institucional-generico"),
      custom: {
        descricaoKey: "projects.siteInstitucionalGenerico.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/site-institucional-generico/main/src/assets/P%C3%A1gina%20Institucional%20Gen%C3%A9rica%20Preview.png",
        stack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        links: {
          demo:
            "https://jrvalerio.github.io/site-institucional-generico/",
          github:
            "https://github.com/JrValerio/site-institucional-generico",
        },
      },
    },
    {
      name: "Open Music",
      repo: "open-music",
      slug: generateSlug("open-music"),
      custom: {
        descricaoKey: "projects.openMusic.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/open-music/main/src/assets/img/Open%20Music.png",
        stack: [
          "HTML",
          "CSS",
          "JavaScript",
          "Dark Mode",
          "Responsive Design",
        ],
        links: {
          demo: "https://jrvalerio.github.io/open-music/",
          github: "https://github.com/JrValerio/open-music",
        },
      },
    },
    {
      name: "Fylo",
      repo: "Fylo",
      slug: generateSlug("Fylo"),
      custom: {
        descricaoKey: "projects.fylo.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/jrvalerio/main/desktop-preview.jpg",
        stack: ["HTML", "CSS"],
        links: {
          demo: "https://jrvalerio.github.io/Fylo/",
          github: "https://github.com/JrValerio/Fylo",
        },
      },
    },
    {
      name: "Profile card component",
      repo: "Profile-card-component",
      slug: generateSlug("Profile-card-component"),
      custom: {
        descricaoKey: "projects.profileCardComponent.description",
        imagem:
          "https://raw.githubusercontent.com/JrValerio/jrvalerio/main/Profile-card-component.jpeg",
        stack: ["HTML", "CSS", "Styled Components", "Mobile First"],
        links: {
          demo:
            "https://jrvalerio.github.io/Profile-card-component/",
          github:
            "https://github.com/JrValerio/Profile-card-component",
        },
      },
    },
  ],
};

export default projetos;

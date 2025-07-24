function generateSlug(repo: string): string {
  return repo.toLowerCase().replace(/\s+/g, "-");
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
        imagem: "https://raw.githubusercontent.com/JrValerio/Control-Finance-React-TailWind/main/src/assets/Control%20Finance.png",
        stack: ["React", "Tailwind", "JavaScript"],
        links: {
          demo: "https://control-finance-react-tail-wind.vercel.app/",
          github: "https://github.com/JrValerio/Control-Finance-React-TailWind",
        },
      },
    },
    {
      name: "Post-it",
      repo: "postit",
      slug: generateSlug("postit"),
      custom: {
        descricaoKey: "projects.postit.description",
        imagem: "https://github.com/JrValerio/postit/blob/main/public/assets/postit.png?raw=true",
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
        imagem: "https://raw.githubusercontent.com/JrValerio/Kenzie-Hub/main/src/assets/Kenzie%20Hub.png",
        stack: ["React", "React Hook Form", "Zod", "SASS"],
        links: {
          demo: "https://kenzie-hub-seven-blue.vercel.app/",
          github: "https://github.com/JrValerio/Kenzie-Hub",
        },
      },
    },
  ],
  frontEnd: [
    {
      name: "Hamburgueria",
      repo: "template-hamburgueria",
      slug: generateSlug("template-hamburgueria"),
      custom: {
        descricaoKey: "projects.hamburgueria.description",
        imagem: "https://raw.githubusercontent.com/JrValerio/template-hamburgueria/main/src/assets/Hamburgueria%20-Page.png",
        stack: ["React", "Axios", "SASS"],
        links: {
          demo: "https://template-hamburgueria.vercel.app/",
          github: "https://github.com/JrValerio/template-hamburgueria",
        },
      },
    },
    {
      name: "Portfolio Template",
      repo: "portfolio-template-JrValerio",
      slug: generateSlug("portfolio-template-JrValerio"),
      custom: {
        descricaoKey: "projects.portfolioTemplate.description",
        imagem: "https://raw.githubusercontent.com/JrValerio/portfolio-template-JrValerio/main/src/assets/portfolio-template-JrValerio.png",
        stack: ["React", "CSS", "Vercel"],
        links: {
          demo: "https://portfolio-template-jr-valerio.vercel.app/",
          github: "https://github.com/JrValerio/portfolio-template-JrValerio",
        },
      },
    },
    {
      name: "News Portal",
      repo: "newsportal",
      slug: generateSlug("newsportal"),
      custom: {
        descricaoKey: "projects.newsPortal.description",
        imagem: "https://github.com/JrValerio/newsportal/blob/main/assets/Screenshot%20News%20Portal.png?raw=true",
        stack: ["HTML5", "CSS3"],
        links: {
          demo: "https://jrvalerio.github.io/newsportal/",
          github: "https://github.com/JrValerio/newsportal",
        },
      },
    },
    {
      name: "Decodificador de Textos",
      repo: "decodificador-de-textos",
      slug: generateSlug("decodificador-de-textos"),
      custom: {
        descricaoKey: "projects.decodificadorDeTextos.description",
        imagem: "https://raw.githubusercontent.com/JrValerio/decodificador-de-textos/main/assets/img/Decodificador%20de%20Textos.png",
        stack: ["JavaScript", "Tailwind CSS"],
        links: {
          demo: "https://decodificador-de-textos-lilac.vercel.app/",
          github: "https://github.com/JrValerio/decodificador-de-textos",
        },
      },
    },
    {
      name: "Fylo",
      repo: "Fylo",
      slug: generateSlug("Fylo"),
      custom: {
        descricaoKey: "projects.fylo.description",
        imagem: "https://github.com/JrValerio/jrvalerio/raw/main/desktop-preview.jpg",
        stack: ["HTML", "CSS"],
        links: {
          demo: "https://jrvalerio.github.io/Fylo/",
          github: "https://github.com/JrValerio/Fylo",
        },
      },
    },
  ],
};

export default projetos;

import type { GetStaticProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {
  FaGithub,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaCss3Alt,
  FaHtml5,
  FaJs,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
  SiExpress,
  SiRedux,
  SiVite,
  SiSpringboot,
  SiDjango,
  SiFigma,
  SiSass,
  SiStyledcomponents,
  SiGit,
} from "react-icons/si";

const techs = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" />, descKey: "html5" },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" />, descKey: "css3" },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" />, descKey: "javascript" },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, descKey: "typescript" },
  { name: "React", icon: <FaReact className="text-cyan-400" />, descKey: "react" },
  { name: "Next.js", icon: <SiNextdotjs className="text-gray-100" />, descKey: "nextjs" },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" />, descKey: "nodejs" },
  { name: "Express", icon: <SiExpress className="text-gray-200" />, descKey: "express" },
  { name: "Redux", icon: <SiRedux className="text-purple-600" />, descKey: "redux" },
  { name: "Vite", icon: <SiVite className="text-indigo-400" />, descKey: "vite" },
  { name: "Spring Boot", icon: <SiSpringboot className="text-green-400" />, descKey: "springboot" },
  { name: "Django", icon: <SiDjango className="text-green-900" />, descKey: "django" },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-800" />, descKey: "postgresql" },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, descKey: "mongodb" },
  { name: "Docker", icon: <FaDocker className="text-blue-400" />, descKey: "docker" },
  { name: "Git", icon: <SiGit className="text-orange-600" />, descKey: "git" },
  { name: "GitHub", icon: <FaGithub className="text-gray-300" />, descKey: "github" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" />, descKey: "tailwindcss" },
  { name: "SASS", icon: <SiSass className="text-pink-400" />, descKey: "sass" },
  { name: "styled-components", icon: <SiStyledcomponents className="text-pink-600" />, descKey: "styledcomponents" },
  { name: "Figma", icon: <SiFigma className="text-pink-500" />, descKey: "figma" },
];

export default function Techs() {
  const { t } = useTranslation("common");

  const pageUrl = "https://jrvalerio.dev/techs";
  const imageUrl = "https://jrvalerio.dev/img/perfil2.png";
  const pageTitle = `${t("techs.title")} - Amaro Junior`;
  const pageDescription = t(
    "techs.intro",
    "Conheca a stack completa de tecnologias de Amaro Junior."
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <link rel="canonical" href={pageUrl} />
      </Head>

      <section className="min-h-[80vh] flex flex-col items-center justify-center py-12 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
        <div className="max-w-4xl w-full px-6 py-10 rounded-2xl bg-white/5 backdrop-blur-md border border-gray-800 shadow-lg mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-center">
            {t("techs.title")}
          </h1>
          <p className="text-center text-white/70 max-w-2xl mx-auto mb-6">{t("techs.intro")}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8" role="list">
            {techs.map((tech) => {
              const tooltipId = `tooltip-${tech.descKey}`;
              return (
                <div
                  key={tech.name}
                  role="listitem"
                  tabIndex={0}
                  aria-label={tech.name}
                  aria-describedby={tooltipId}
                  className="relative group flex flex-col items-center gap-2 bg-black/40 rounded-xl p-4 shadow transition hover:scale-105 hover:bg-teal-950/60 focus:outline-none"
                >
                  <span className="text-4xl">{tech.icon}</span>
                  <span className="text-xs sm:text-sm text-white/80 text-center">{tech.name}</span>
                  <span
                    id={tooltipId}
                    className="
                    absolute bottom-14 left-1/2 z-10 -translate-x-1/2
                    px-3 py-2 min-w-[160px] rounded bg-gray-900 text-xs text-gray-100
                    opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg
                    text-center
                  "
                  >
                    {t(`techs.desc.${tech.descKey}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "pt", ["common"])),
  },
});

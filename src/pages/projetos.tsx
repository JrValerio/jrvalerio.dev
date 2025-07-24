import { useEffect, useState } from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import CardProjeto from "../components/CardProjeto";
import projetos, { Projeto } from "../data/projetos";

export default function Projetos() {
  const { t, ready, i18n } = useTranslation("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (ready) {
      document.title = t("pageTitles.projects");
    }
  }, [ready, t]);

  if (!mounted || !ready) return null;

  return (
    <>
      <Head>
        <title>{t("projects.title")} - Portfólio Amaro Júnior</title>
        <meta
          name="description"
          content={t(
            "projects.metaDescription",
            "Meus principais projetos de desenvolvimento Full Stack, Front End e soluções reais. Veja meus cases!"
          )}
        />
        <meta property="og:title" content={`${t("projects.title")} - Amaro Júnior`} />
        <meta property="og:description" content={t(
          "projects.metaDescription",
          "Meus principais projetos de desenvolvimento Full Stack, Front End e soluções reais. Veja meus cases!"
        )} />
        <meta property="og:url" content="https://jrvalerio.dev/projetos" />
        <meta property="og:image" content="/img/perfil2.png" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent">
          {t("projects.title")}
        </h1>
        {Object.entries(projetos).map(([categoria, lista]) => (
          <div key={categoria} className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-white capitalize">
              {t(`projects.categories.${categoria}`) || categoria}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(lista) &&
                lista.map((proj: Projeto) => (
                  <CardProjeto key={proj.slug} projeto={proj} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

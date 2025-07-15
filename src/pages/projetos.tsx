import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CardProjeto from "../components/CardProjeto";
import projetos, { Projeto } from "../data/projetos";

export default function Projetos() {
  const { t, ready } = useTranslation("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (ready) {
      document.title = t("pageTitles.projects");
    }
  }, [ready]);

  if (!mounted || !ready) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-400">
        {t("projects.title")}
      </h1>

      {Object.entries(projetos).map(([categoria, lista]) => (
        <div key={categoria} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white capitalize">
            {t(`projects.categories.${categoria}`) || categoria}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(lista) &&
              lista.map((proj: Projeto) => (
                <CardProjeto key={proj.slug} projeto={proj} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Projeto } from "../data/projetos";

type Props = { projeto: Projeto };

interface RepoData {
  description: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
}

export default function CardProjeto({ projeto }: Props) {
  const { t, i18n } = useTranslation("common");
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/repos/JrValerio/${projeto.repo}`)
      .then((res) => res.json())
      .then((data) => setRepoData(data))
      .finally(() => setLoading(false));
  }, [projeto.repo]);

  return (
    <div className="
      border border-gray-700 p-6 rounded-2xl bg-black/70
      hover:shadow-2xl hover:scale-[1.025] transition-all duration-300 text-white
      flex flex-col justify-between
    ">
      {projeto.custom.imagem && (
        <img
          src={projeto.custom.imagem}
          alt={t("projects.imgAlt", { name: projeto.name }) || `Imagem do projeto ${projeto.name}`}
          className="rounded-lg w-full h-52 object-cover mb-6"
          loading="lazy"
        />
      )}

      <h2 className="text-xl font-semibold mb-2 text-teal-300">
        {projeto.name}
      </h2>

      <p className="text-gray-300 text-base leading-relaxed mb-2 min-h-[44px]">
        {t(projeto.custom.descricaoKey) || repoData?.description || t("no_description")}
      </p>

      <div className="flex flex-wrap gap-2 my-2">
        {projeto.custom.stack.map((tech) => (
          <span
            key={tech}
            className="bg-cyan-800 text-white text-xs px-2 py-1 rounded-full"
            title={tech}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-400 mt-4 flex flex-wrap gap-4 items-center">
        {loading && <span>{t("loading")}</span>}
        {!loading && (
          <>
            {repoData?.stargazers_count !== undefined && (
              <span>⭐ {repoData.stargazers_count}</span>
            )}
            {repoData?.forks_count !== undefined && (
              <span>🍴 {repoData.forks_count}</span>
            )}
            {repoData?.updated_at && (
              <span>
                📅 {new Date(repoData.updated_at).toLocaleDateString(i18n.language)}
              </span>
            )}
          </>
        )}
      </div>

      <div className="mt-4 flex gap-4">
        {repoData?.html_url && (
          <a
            href={repoData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 text-sm transition-colors"
          >
            <Github className="w-4 h-4" /> {t("github")}
          </a>
        )}
        {projeto.custom.links?.demo && (
          <a
            href={projeto.custom.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-600 rounded-lg hover:bg-cyan-800 text-sm text-cyan-300 transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> {t("demo")}
          </a>
        )}
      </div>
    </div>
  );
}

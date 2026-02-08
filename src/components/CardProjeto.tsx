import Image from "next/image";
import { CalendarDays, ExternalLink, Github, GitFork, Star } from "lucide-react";
import { useTranslation } from "next-i18next";
import { Projeto } from "../data/projetos";

export interface RepoData {
  description?: string;
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
  html_url?: string;
}

type Props = {
  projeto: Projeto;
  repoData?: RepoData | null;
};

export default function CardProjeto({ projeto, repoData = null }: Props) {
  const { t, i18n } = useTranslation("common");

  const translatedDescription = t(projeto.custom.descricaoKey);
  const description =
    translatedDescription !== projeto.custom.descricaoKey
      ? translatedDescription
      : repoData?.description || t("no_description");

  const githubUrl = projeto.custom.links?.github ?? repoData?.html_url;

  return (
    <div
      className="
        border border-gray-200 dark:border-gray-700 p-6 rounded-2xl bg-white/90 dark:bg-black/70
        hover:shadow-2xl hover:scale-[1.025] transition-all duration-300 transition-colors text-gray-900 dark:text-white
        flex flex-col justify-between
      "
    >
      {projeto.custom.imagem && (
        <div className="relative mb-6 h-52 w-full overflow-hidden rounded-lg">
          <Image
            src={projeto.custom.imagem}
            alt={
              t("projects.imgAlt", { name: projeto.name }) ||
              `Imagem do projeto ${projeto.name}`
            }
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2 text-teal-700 dark:text-teal-300">{projeto.name}</h2>

      <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2 min-h-[44px]">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 my-2">
        {projeto.custom.stack.map((tech) => (
          <span
            key={tech}
            className="bg-cyan-100 dark:bg-cyan-800 text-cyan-900 dark:text-white text-xs px-2 py-1 rounded-full"
            title={tech}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400 mt-4 flex flex-wrap gap-4 items-center">
        {typeof repoData?.stargazers_count === "number" && (
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4" /> {repoData.stargazers_count}
          </span>
        )}
        {typeof repoData?.forks_count === "number" && (
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-4 w-4" /> {repoData.forks_count}
          </span>
        )}
        {repoData?.updated_at && (
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {new Date(repoData.updated_at).toLocaleDateString(i18n.language)}
          </span>
        )}
      </div>

      <div className="mt-4 flex gap-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm transition-colors"
            aria-label={t("viewOnGithub", {
              name: projeto.name,
              defaultValue: "Ver no GitHub",
            })}
          >
            <Github className="w-4 h-4" /> {t("github")}
          </a>
        )}
        {projeto.custom.links?.demo && (
          <a
            href={projeto.custom.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500 dark:border-cyan-600 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-800 text-sm text-cyan-700 dark:text-cyan-300 transition-colors"
            aria-label={t("viewDemo", {
              name: projeto.name,
              defaultValue: "Ver demonstracao",
            })}
          >
            <ExternalLink className="w-4 h-4" /> {t("demo")}
          </a>
        )}
      </div>
    </div>
  );
}

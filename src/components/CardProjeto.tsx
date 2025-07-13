import { useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";

interface Props {
  repoName: string;
  custom?: {
    descricao?: string;
    stack?: string[];
    imagem?: string;
    links?: {
      demo?: string;
    };
  } | null;
}

interface RepoData {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
}

export default function CardProjeto({ repoName, custom }: Props) {
  const [repoData, setRepoData] = useState<RepoData | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/JrValerio/${repoName}`)
      .then((res) => res.json())
      .then((data) => setRepoData(data))
      .catch((err) => console.error(err));
  }, [repoName]);

  return (
    <div className="border border-gray-700 p-6 rounded-2xl bg-black/70 hover:shadow-xl transition-all duration-300 text-white">
      {custom?.imagem && (
        <img
          src={custom.imagem}
          alt={`Imagem do projeto ${repoName}`}
          className="rounded-lg w-full h-52 object-cover mb-6"
          loading="lazy"
        />
      )}

      <div className="flex flex-col justify-between">
        <h2 className="text-xl font-semibold mb-2 text-teal-300">
          {repoData?.name || repoName}
        </h2>

        <p className="text-gray-300 text-base leading-relaxed mb-2">
          {custom?.descricao ||
            repoData?.description ||
            "Sem descrição disponível."}
        </p>

        {custom?.stack && (
          <div className="flex flex-wrap gap-2 my-2">
            {custom.stack.map((tech) => (
              <span
                key={tech}
                className="bg-cyan-800 text-white text-xs px-2 py-1 rounded-full transition-all hover:bg-cyan-600 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="text-sm text-gray-400 mt-4 flex flex-wrap gap-4 items-center">
          {repoData?.stargazers_count !== undefined && (
            <span>⭐ {repoData.stargazers_count}</span>
          )}
          {repoData?.forks_count !== undefined && (
            <span>🍴 {repoData.forks_count}</span>
          )}
          {repoData?.updated_at && (
            <span>
              📅 {new Date(repoData.updated_at).toLocaleDateString("pt-BR")}
            </span>
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
              <Github className="w-4 h-4" /> GitHub
            </a>
          )}
          {custom?.links?.demo && custom.links.demo.length > 0 && (
            <a
              href={custom.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-600 rounded-lg hover:bg-cyan-800 text-sm text-cyan-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Abrir Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

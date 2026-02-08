import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CardProjeto, { RepoData } from "../components/CardProjeto";
import projetos, { Projeto } from "../data/projetos";

const GITHUB_USER = "JrValerio";
const REVALIDATE_SECONDS = 60 * 60;
const BUILD_CACHE_TTL_MS = 5 * 60 * 1000;

let repoDataCache: Record<string, RepoData | null> | null = null;
let repoDataCacheAt = 0;

async function fetchRepoDataByRepo(): Promise<Record<string, RepoData | null>> {
  const now = Date.now();
  if (repoDataCache && now - repoDataCacheAt < BUILD_CACHE_TTL_MS) {
    return repoDataCache;
  }

  const repos = Array.from(
    new Set(Object.values(projetos).flat().map((project: Projeto) => project.repo))
  );

  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "jrvalerio-portfolio",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const entries = await Promise.all(
    repos.map(async (repo) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo}`, {
          headers,
        });

        if (!response.ok) {
          return [repo, null] as const;
        }

        const payload = (await response.json()) as {
          description?: string | null;
          stargazers_count?: number;
          forks_count?: number;
          updated_at?: string;
          html_url?: string;
        };

        const repoData: RepoData = {
          description: payload.description ?? undefined,
          stargazers_count:
            typeof payload.stargazers_count === "number"
              ? payload.stargazers_count
              : undefined,
          forks_count:
            typeof payload.forks_count === "number" ? payload.forks_count : undefined,
          updated_at: payload.updated_at ?? undefined,
          html_url: payload.html_url ?? undefined,
        };

        return [repo, repoData] as const;
      } catch {
        return [repo, null] as const;
      }
    })
  );

  repoDataCache = Object.fromEntries(entries);
  repoDataCacheAt = now;

  return repoDataCache;
}

type ProjetosProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Projetos({ repoDataByRepo }: ProjetosProps) {
  const { t } = useTranslation("common");

  const pageUrl = "https://jrvalerio.dev/projetos";
  const imageUrl = "https://jrvalerio.dev/img/perfil2.png";
  const pageTitle = `${t("projects.title")} - Portfolio Amaro Junior`;
  const pageDescription = t(
    "projects.metaDescription",
    "Meus principais projetos de desenvolvimento Full Stack, Front End e solucoes reais. Veja meus cases!"
  );

  const categories = Object.entries(projetos);

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

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent">
          {t("projects.title")}
        </h1>
        {categories.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-300">
            {t("projects.noProjects", "Nenhum projeto encontrado.")}
          </p>
        )}
        {categories.map(([categoria, lista]) => (
          <div key={categoria} className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white capitalize">
              {t(`projects.categories.${categoria}`) || categoria}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(lista) &&
                lista.map((proj: Projeto) => (
                  <CardProjeto
                    key={proj.slug}
                    projeto={proj}
                    repoData={repoDataByRepo[proj.repo] ?? null}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  repoDataByRepo: Record<string, RepoData | null>;
}> = async ({ locale }) => {
  const repoDataByRepo = await fetchRepoDataByRepo();

  return {
    props: {
      repoDataByRepo,
      ...(await serverSideTranslations(locale ?? "pt", ["common"])),
    },
    revalidate: REVALIDATE_SECONDS,
  };
};

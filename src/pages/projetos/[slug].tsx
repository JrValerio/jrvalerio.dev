import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import projetosData, { Projeto } from "../../data/projetos";

const todosProjetos: Projeto[] = Object.values(projetosData).flat();

export default function ProjetoDetalhado({ projeto }: { projeto: Projeto }) {
  const { t, ready, i18n } = useTranslation("common");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (router.isFallback || !mounted || !ready) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <p>{t("loading")}</p>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>
          {projeto.name} - {t("projects.title")} | Amaro Júnior
        </title>
        <meta
          name="description"
          content={projeto.custom.descricao}
        />
        <meta property="og:title" content={`${projeto.name} - Amaro Júnior`} />
        <meta property="og:description" content={projeto.custom.descricao} />
        <meta property="og:url" content={`https://jrvalerio.dev/projetos/${projeto.slug}`} />
        <meta property="og:image" content={projeto.custom.imagem} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${projeto.name} - Amaro Júnior`} />
        <meta name="twitter:description" content={projeto.custom.descricao} />
        <meta name="twitter:image" content={projeto.custom.imagem} />
        <link rel="canonical" href={`https://jrvalerio.dev/projetos/${projeto.slug}`} />
      </Head>
      <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
        <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-700">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent">
            {projeto.name}
          </h1>
          {projeto.custom.imagem && (
            <img
              src={projeto.custom.imagem}
              alt={t("projects.imgAlt", { name: projeto.name }) || projeto.name}
              className="w-full h-auto rounded-lg mb-6 shadow"
            />
          )}
          <p className="text-lg mb-4 text-gray-300">
            {projeto.custom.descricao}
          </p>
          {projeto.custom.stack?.length > 0 && (
            <div className="mb-4">
              <strong className="text-teal-400">{t("projects.stack", "Stack")}:</strong>{" "}
              <span className="flex flex-wrap gap-2 mt-2">
                {projeto.custom.stack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-cyan-800 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </span>
            </div>
          )}
          <div className="flex gap-4 mt-6">
            {projeto.custom.links?.demo && (
              <a
                href={projeto.custom.links.demo}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("demo")}
              </a>
            )}
            {projeto.custom.links?.github && (
              <a
                href={projeto.custom.links.github}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("github")}
              </a>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.values(projetosData)
    .flat()
    .map((p) => ({
      params: { slug: p.slug },
    }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug;
  const projeto = Object.values(projetosData)
    .flat()
    .find((p) => p.slug === slug);

  if (!projeto) return { notFound: true };

  const { serverSideTranslations } = await import("next-i18next/serverSideTranslations");
  return {
    props: {
      projeto,
      ...(await serverSideTranslations(locale ?? "pt", ["common"])),
    },
  };
};

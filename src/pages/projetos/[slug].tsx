import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import projetosData, { Projeto } from "../../data/projetos";
import Link from "next/link";
import Image from "next/image";

export default function ProjetoDetalhado({ projeto }: { projeto: Projeto }) {
  const { t } = useTranslation("common");

  const descricao = t(projeto.custom.descricaoKey);

  return (
    <>
      <Head>
        <title>
          {projeto.name} - {t("projects.title")} | Amaro Júnior
        </title>
        <meta name="description" content={descricao} />
        <meta property="og:title" content={`${projeto.name} - Amaro Júnior`} />
        <meta property="og:description" content={descricao} />
        <meta
          property="og:url"
          content={`https://jrvalerio.dev/projetos/${projeto.slug}`}
        />
        <meta property="og:image" content={projeto.custom.imagem} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${projeto.name} - Amaro Júnior`}
        />
        <meta name="twitter:description" content={descricao} />
        <meta name="twitter:image" content={projeto.custom.imagem} />
        <link
          rel="canonical"
          href={`https://jrvalerio.dev/projetos/${projeto.slug}`}
        />
      </Head>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-12 transition-colors">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/projetos"
            className="text-teal-700 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 underline mb-6 inline-block"
          >
            {"<-"} {t("projects.back", "Voltar para projetos")}
          </Link>
          <article className="bg-white/95 dark:bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 transition-colors">
            <header>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent">
                {projeto.name}
              </h1>
              {projeto.custom.imagem && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={projeto.custom.imagem}
                    alt={
                      t("projects.imgAlt", { name: projeto.name }) ||
                      projeto.name
                    }
                    width={1200}
                    height={675}
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="h-auto w-full object-cover shadow"
                    loading="lazy"
                  />
                </div>
              )}
            </header>
            <section className="mb-4">
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">{descricao}</p>
            </section>
            {projeto.custom.stack?.length > 0 && (
              <section className="mb-4">
                <strong className="text-teal-700 dark:text-teal-400">
                  {t("projects.stack", "Stack")}:
                </strong>{" "}
                <span className="flex flex-wrap gap-2 mt-2">
                  {projeto.custom.stack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-cyan-100 dark:bg-cyan-800 text-cyan-900 dark:text-white text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </span>
              </section>
            )}
            <section className="flex gap-4 mt-6">
              {projeto.custom.links?.demo && (
                <a
                  href={projeto.custom.links.demo}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("demo")}
                >
                  {t("demo")}
                </a>
              )}
              {projeto.custom.links?.github && (
                <a
                  href={projeto.custom.links.github}
                  className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded transition flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("github")}
                >
                  {t("github")}
                </a>
              )}
            </section>
          </article>
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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug;
  const projeto = Object.values(projetosData)
    .flat()
    .find((p) => p.slug === slug);

  if (!projeto) return { notFound: true };

  return {
    props: {
      projeto,
      ...(await serverSideTranslations(locale ?? "pt", ["common"])),
    },
  };
};

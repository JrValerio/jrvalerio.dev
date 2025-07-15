// src/pages/projetos/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import projetosData, { Projeto } from "../../data/projetos";

const todosProjetos: Projeto[] = Object.values(projetosData).flat();

export default function ProjetoDetalhado({ projeto }: { projeto: Projeto }) {
  const { t, ready } = useTranslation("common");
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
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold mb-4">{projeto.name}</h1>
        <img
          src={projeto.custom.imagem}
          alt={projeto.name}
          className="w-full h-auto rounded-lg mb-6"
        />
        <p className="text-lg mb-4 text-gray-300">{projeto.custom.descricao}</p>
        <div className="mb-4">
          <strong className="text-teal-400">Stack:</strong>{" "}
          <span>{projeto.custom.stack.join(", ")}</span>
        </div>
        <div className="flex gap-4 mt-6">
          {projeto.custom.links?.demo && (
            <a
              href={projeto.custom.links.demo}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("demo")}
            </a>
          )}
          {projeto.custom.links?.github && (
            <a
              href={projeto.custom.links.github}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("github")}
            </a>
          )}
        </div>
      </div>
    </main>
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

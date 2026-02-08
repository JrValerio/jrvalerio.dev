import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function NotFoundPage() {
  const { t } = useTranslation("common");
  const title = `404 - ${t("pageTitles.home", "Inicio")}`;
  const description = t("notFound.description", "Page not found.");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {description}
        </p>
        <Link
          href="/"
          className="px-5 py-2 rounded bg-teal-500 text-white hover:bg-teal-600 transition"
        >
          {t("header.home", "Inicio")}
        </Link>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "pt", ["common"])),
  },
});

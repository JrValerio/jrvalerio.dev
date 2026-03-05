import type { GetStaticProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import HeroSection from "../components/HeroSection";

export default function LegacyHome() {
  const { t } = useTranslation("common");

  const baseUrl = "https://jrvalerio.dev";
  const title = t("seo.home.title", "Portfolio Legacy - Amaro Junior (JrValerio)");
  const description = t("seo.home.description");
  const url = `${baseUrl}/legacy`;
  const imageUrl = `${baseUrl}/img/perfil.png`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <link rel="canonical" href={url} />
      </Head>
      <HeroSection />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "pt", ["common"])),
  },
});

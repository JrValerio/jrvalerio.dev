import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "../../../components/Hero";
import {
  getLanguageAlternates,
  getLocaleFromSegment,
  getV2Messages,
  type V2LocaleSegment,
} from "../../../i18n/v2";

type LocalizedHomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalizedHomePageProps): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) return {};

  return {
    alternates: {
      canonical: `/${segment}/v2`,
      languages: getLanguageAlternates("/v2"),
    },
  };
}

export default async function LocalizedHomePage({ params }: LocalizedHomePageProps) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) notFound();
  const messages = getV2Messages(locale);

  return (
    <main className="jr-home-main" aria-label={messages.hero.ariaLabel}>
      <Hero locale={locale} prefixed />
    </main>
  );
}

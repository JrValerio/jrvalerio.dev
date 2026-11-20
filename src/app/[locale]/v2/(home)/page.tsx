import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "../../../../features/home/HomePage";
import { homeCopy } from "../../../../content/home";
import {
  getLanguageAlternates,
  getLocaleFromSegment,
  type V2LocaleSegment,
} from "../../../../i18n/v2";

export const dynamic = "force-static";

type Props = { params: Promise<{ locale: string }> };

const titles = {
  "pt-BR": "Amaro Júnior — Desenvolvedor full-stack & agentes de IA",
  "en-GB": "Amaro Júnior — Full-stack developer & AI agents",
  es: "Amaro Júnior — Desarrollador full-stack y agentes de IA",
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) return {};

  return {
    title: { absolute: titles[locale] },
    description: homeCopy[locale].hero.pitch,
    alternates: {
      canonical: `/${segment}/v2`,
      languages: getLanguageAlternates("/v2"),
    },
  };
}

export default async function LocalizedHomePage({ params }: Props) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) notFound();

  return <HomePage locale={locale} prefixed />;
}

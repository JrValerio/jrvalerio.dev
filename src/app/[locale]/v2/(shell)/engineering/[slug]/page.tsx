import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../../../components/JsonLd";
import AdrDetailContent from "../../../../../features/v2/adr-detail-content";
import {
  V2_LOCALE_SEGMENTS,
  getLocaleFromSegment,
  getSegmentFromLocale,
  type V2LocaleSegment,
} from "../../../../../i18n/v2";
import { getAdrBySlug, getAllAdrs } from "../../../../../lib/adr";
import { getAdrTechArticleJsonLd } from "../../../../../lib/structured-data";

type LocalizedAdrPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return V2_LOCALE_SEGMENTS.flatMap((locale) =>
    getAllAdrs().map((adr) => ({
      locale,
      slug: adr.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: LocalizedAdrPageProps): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  const adr = getAdrBySlug(slug);

  if (!locale || !adr) {
    return {};
  }

  return {
    title: `${adr.id} | ${adr.title}`,
    description: adr.summary,
    alternates: {
      canonical: `/${segment}/v2/engineering/${adr.slug}`,
    },
  };
}

export default async function LocalizedAdrPage({
  params,
}: LocalizedAdrPageProps) {
  const { locale: segment, slug } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  const adr = getAdrBySlug(slug);

  if (!locale || !adr) {
    notFound();
  }

  const pagePath = `/${getSegmentFromLocale(locale)}/v2/engineering/${adr.slug}`;

  return (
    <>
      <JsonLd data={getAdrTechArticleJsonLd(adr, pagePath, locale)} />
      <AdrDetailContent adr={adr} locale={locale} prefixed />
    </>
  );
}

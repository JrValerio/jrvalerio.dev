import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdrDetailContent from "../../../../../features/v2/adr-detail-content";
import {
  V2_LOCALE_SEGMENTS,
  getLocaleFromSegment,
  type V2LocaleSegment,
} from "../../../../../i18n/v2";
import { getAdrBySlug, getAllAdrs } from "../../../../../lib/adr";

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

  return <AdrDetailContent adr={adr} locale={locale} prefixed />;
}

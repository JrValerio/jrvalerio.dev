import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrinciplesContent from "../../../../features/v2/principles-content";
import { getLocaleFromSegment, type V2LocaleSegment } from "../../../../i18n/v2";

export const dynamic = "force-static";

type LocalizedPrinciplesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedPrinciplesPageProps): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) return {};

  return {
    alternates: {
      canonical: `/${segment}/v2/principles`,
    },
  };
}

export default async function LocalizedPrinciplesPage({
  params,
}: LocalizedPrinciplesPageProps) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) notFound();

  return <PrinciplesContent locale={locale} prefixed />;
}

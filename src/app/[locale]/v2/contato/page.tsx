import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "../../../../components/Contact";
import { getLocaleFromSegment, type V2LocaleSegment } from "../../../../i18n/v2";

export const dynamic = "force-static";

type LocalizedContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedContactPageProps): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) return {};

  return {
    alternates: {
      canonical: `/${segment}/v2/contato`,
    },
  };
}

export default async function LocalizedContactPage({ params }: LocalizedContactPageProps) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) notFound();

  return <Contact locale={locale} />;
}

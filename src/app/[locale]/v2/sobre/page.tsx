import type { Metadata } from "next";
import { notFound } from "next/navigation";
import About from "../../../../components/About";
import Stack from "../../../../components/Stack";
import { getLocaleFromSegment, type V2LocaleSegment } from "../../../../i18n/v2";

type LocalizedAboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalizedAboutPageProps): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) return {};

  return {
    alternates: {
      canonical: `/${segment}/v2/sobre`,
    },
  };
}

export default async function LocalizedAboutPage({ params }: LocalizedAboutPageProps) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) notFound();

  return (
    <>
      <About locale={locale} />
      <Stack locale={locale} />
    </>
  );
}

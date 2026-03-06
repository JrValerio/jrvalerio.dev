import type { Metadata } from "next";
import { notFound } from "next/navigation";
import V2EngineeringPage from "../../../v2/engineering/page";
import { getLocaleFromSegment, type V2LocaleSegment } from "../../../../i18n/v2";

type LocalizedEngineeringPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedEngineeringPageProps): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) return {};

  return {
    alternates: {
      canonical: `/${segment}/v2/engineering`,
    },
  };
}

export default async function LocalizedEngineeringPage({
  params,
}: LocalizedEngineeringPageProps) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) notFound();

  return <V2EngineeringPage />;
}

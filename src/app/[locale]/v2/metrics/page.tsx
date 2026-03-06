import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MetricsContent from "../../../../features/v2/metrics-content";
import { getLocaleFromSegment, type V2LocaleSegment } from "../../../../i18n/v2";
import { getCaseStudyDashboard } from "../../../../lib/case-study-dashboard";

type LocalizedMetricsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedMetricsPageProps): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) return {};

  return {
    alternates: {
      canonical: `/${segment}/v2/metrics`,
    },
  };
}

export default async function LocalizedMetricsPage({ params }: LocalizedMetricsPageProps) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) notFound();

  const dashboard = await getCaseStudyDashboard();

  return <MetricsContent locale={locale} prefixed dashboard={dashboard} />;
}

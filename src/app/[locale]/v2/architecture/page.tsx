import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArchitectureContent from "../../../../features/v2/architecture-content";
import { getLocaleFromSegment, type V2LocaleSegment } from "../../../../i18n/v2";
// ReactFlow CSS scoped to this page only — matches v2/architecture/page.tsx
import "reactflow/dist/style.css";

export const dynamic = "force-static";

type LocalizedArchitecturePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedArchitecturePageProps): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) return {};

  return {
    alternates: {
      canonical: `/${segment}/v2/architecture`,
    },
  };
}

export default async function LocalizedArchitecturePage({
  params,
}: LocalizedArchitecturePageProps) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) notFound();

  return <ArchitectureContent locale={locale} prefixed />;
}

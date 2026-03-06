import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import V2LayoutShell from "../../../features/v2/layout-shell";
import {
  V2_LOCALE_SEGMENTS,
  getLocaleFromSegment,
  type V2LocaleSegment,
} from "../../../i18n/v2";

type LocalizedV2LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return V2_LOCALE_SEGMENTS.map((locale) => ({ locale }));
}

export default async function LocalizedV2Layout({
  children,
  params,
}: LocalizedV2LayoutProps) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);

  if (!locale) notFound();

  return (
    <div lang={locale}>
      <V2LayoutShell locale={locale} prefixed>
        {children}
      </V2LayoutShell>
    </div>
  );
}

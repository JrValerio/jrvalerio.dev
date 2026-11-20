import type { ReactNode } from "react";
import V2LayoutShell from "../../../../features/v2/layout-shell";
import { getLocaleFromSegment, type V2LocaleSegment } from "../../../../i18n/v2";

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export default async function LocalizedShellLayout({ children, params }: Props) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment) ?? "pt-BR";

  return (
    <V2LayoutShell locale={locale} prefixed>
      {children}
    </V2LayoutShell>
  );
}

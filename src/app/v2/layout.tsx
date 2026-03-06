import type { ReactNode } from "react";
import V2LayoutShell from "../../features/v2/layout-shell";

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <V2LayoutShell locale="pt-BR" prefixed={false}>
      {children}
    </V2LayoutShell>
  );
}


import type { Metadata } from "next";
import MetricsContent from "../../../features/v2/metrics-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Metrics",
  description:
    "Indicadores de engenharia do portfolio v2: performance, budgets de bundle e pipeline de qualidade.",
  alternates: {
    canonical: "/v2/metrics",
  },
};

export default function V2MetricsPage() {
  return <MetricsContent locale="pt-BR" prefixed={false} />;
}

import type { Metadata } from "next";
import MetricsContent from "../../../features/v2/metrics-content";
import { getCaseStudyDashboard } from "../../../lib/case-study-dashboard";

export const metadata: Metadata = {
  title: "Metrics",
  description:
    "Indicadores de engenharia do portfolio v2: performance, budgets de bundle e pipeline de qualidade.",
  alternates: {
    canonical: "/v2/metrics",
  },
};

export default async function V2MetricsPage() {
  const dashboard = await getCaseStudyDashboard();

  return <MetricsContent locale="pt-BR" prefixed={false} dashboard={dashboard} />;
}

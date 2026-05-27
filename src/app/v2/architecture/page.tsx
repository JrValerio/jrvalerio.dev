import type { Metadata } from "next";
import ArchitectureContent from "../../../features/v2/architecture-content";
// ReactFlow CSS is scoped to this page only — removed from global layout.tsx
import "reactflow/dist/style.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Mapa de arquitetura do portfolio v2: camadas, fluxo de dados e decisoes de engenharia.",
  alternates: {
    canonical: "/v2/architecture",
  },
};

export default function V2ArchitecturePage() {
  return <ArchitectureContent locale="pt-BR" prefixed={false} />;
}


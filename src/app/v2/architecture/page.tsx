import type { Metadata } from "next";
import ArchitectureContent from "../../../features/v2/architecture-content";

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


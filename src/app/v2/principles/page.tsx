import type { Metadata } from "next";
import PrinciplesContent from "../../../features/v2/principles-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Engineering Principles",
  description:
    "Principios de engenharia usados para projetar sistemas, manter qualidade e orientar evolucao de produto.",
  alternates: {
    canonical: "/v2/principles",
  },
};

export default function V2PrinciplesPage() {
  return <PrinciplesContent locale="pt-BR" prefixed={false} />;
}


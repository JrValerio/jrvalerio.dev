import type { Metadata } from "next";
import Work from "../../../components/Work";

export const metadata: Metadata = {
  alternates: {
    canonical: "/v2/projetos",
  },
};

export default function V2ProjectsPage() {
  return (
    <Work
      title="All Projects"
      subtitle="Cases focados em produto digital, engenharia pragmatica e experiencia."
    />
  );
}

import type { Metadata } from "next";
import EngineeringContent from "../../../features/v2/engineering-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Architecture decisions and technical notes that document the evolution of the portfolio.",
  alternates: {
    canonical: "/v2/engineering",
  },
};

export default function V2EngineeringPage() {
  return <EngineeringContent locale="pt-BR" prefixed={false} />;
}

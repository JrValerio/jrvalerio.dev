import type { Metadata } from "next";
import Contact from "../../../components/Contact";

export const metadata: Metadata = {
  alternates: {
    canonical: "/v2/contato",
  },
};

export default function V2ContactPage() {
  return <Contact locale="pt-BR" />;
}

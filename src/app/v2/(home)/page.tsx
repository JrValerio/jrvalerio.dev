import type { Metadata } from "next";
import HomePage from "../../../features/home/HomePage";
import { homeCopy } from "../../../content/home";
import { getLanguageAlternates } from "../../../i18n/v2";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: "Amaro Júnior — Desenvolvedor full-stack & agentes de IA" },
  description: homeCopy["pt-BR"].hero.pitch,
  alternates: {
    canonical: "/v2",
    languages: getLanguageAlternates("/v2"),
  },
};

export default function V2HomePage() {
  return <HomePage locale="pt-BR" prefixed={false} />;
}

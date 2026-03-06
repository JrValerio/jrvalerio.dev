import type { Metadata } from "next";
import Hero from "../../components/Hero";
import { getLanguageAlternates } from "../../i18n/v2";

export const metadata: Metadata = {
  alternates: {
    canonical: "/v2",
    languages: getLanguageAlternates("/v2"),
  },
};

export default function V2HomePage() {
  return (
    <main className="jr-home-main" aria-label="Home hero">
      <Hero locale="pt-BR" prefixed={false} />
    </main>
  );
}

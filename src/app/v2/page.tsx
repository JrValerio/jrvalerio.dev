import type { Metadata } from "next";
import Hero from "../../components/Hero";
import { getLanguageAlternates, getV2Messages } from "../../i18n/v2";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: {
    canonical: "/v2",
    languages: getLanguageAlternates("/v2"),
  },
};

export default function V2HomePage() {
  const messages = getV2Messages("pt-BR");

  return (
    <main className="jr-home-main" aria-label={messages.hero.ariaLabel}>
      <Hero locale="pt-BR" prefixed={false} />
    </main>
  );
}

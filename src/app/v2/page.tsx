import type { Metadata } from "next";
import Hero from "../../components/Hero";
import Work from "../../components/Work";
import EngineeringLinks from "../../components/EngineeringLinks";
import ContactCta from "../../components/ContactCta";
import { getLanguageAlternates } from "../../i18n/v2";

export const metadata: Metadata = {
  alternates: {
    canonical: "/v2",
    languages: getLanguageAlternates("/v2"),
  },
};

export default function V2HomePage() {
  return (
    <>
      <Hero locale="pt-BR" prefixed={false} />
      <Work limit={3} locale="pt-BR" prefixed={false} />
      <EngineeringLinks locale="pt-BR" prefixed={false} />
      <ContactCta locale="pt-BR" prefixed={false} />
    </>
  );
}

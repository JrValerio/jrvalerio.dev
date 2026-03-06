import Link from "next/link";
import Section from "./UI/Section";
import { getV2Messages, toLocalePath, type V2Locale } from "../i18n/v2";

type ContactCtaProps = {
  locale?: V2Locale;
  prefixed?: boolean;
};

export default function ContactCta({ locale = "pt-BR", prefixed = false }: ContactCtaProps) {
  const messages = getV2Messages(locale);

  return (
    <Section
      id="contact-cta"
      title={messages.contactCta.title}
      subtitle={messages.contactCta.subtitle}
    >
      <div className="jr-surface-card flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
        <p className="jr-body jr-prose text-[var(--jr-muted)]">
          {messages.contactCta.body}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href={toLocalePath("/v2/contato", locale, prefixed)} className="jr-link">
            {messages.contactCta.viewContact}
          </Link>
          <a href="mailto:amarovsjr81@gmail.com" className="jr-link">
            {messages.contactCta.sendEmail}
          </a>
        </div>
      </div>
    </Section>
  );
}

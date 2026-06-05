import Section from "./UI/Section";
import { getV2Messages, type V2Locale } from "../i18n/v2";

type AboutProps = {
  locale?: V2Locale;
};

export default function About({ locale = "pt-BR" }: AboutProps) {
  const messages = getV2Messages(locale);

  return (
    <Section
      id="about"
      title={messages.about.title}
      subtitle={messages.about.subtitle}
      headingAs="h1"
    >
      <div className="jr-prose space-y-4">
        {messages.about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="jr-body text-[var(--jr-muted)]">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}

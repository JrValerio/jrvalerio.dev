import Button from "./UI/Button";
import Card from "./UI/Card";
import Section from "./UI/Section";
import { getV2Messages, type V2Locale } from "../i18n/v2";

type ContactProps = {
  locale?: V2Locale;
};

export default function Contact({ locale = "pt-BR" }: ContactProps) {
  const messages = getV2Messages(locale);

  return (
    <Section
      id="contact"
      title={messages.contact.title}
      subtitle={messages.contact.subtitle}
    >
      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <Card>
          <p className="jr-meta mb-3">{messages.contact.lead}</p>
          <p className="jr-body max-w-2xl text-[var(--jr-muted)]">
            {messages.contact.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              as="a"
              href="mailto:amarovsjr81@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {messages.contact.sendEmail}
            </Button>
            <Button
              as="a"
              href="https://www.linkedin.com/in/jrvalerio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {messages.contact.connectLinkedIn}
            </Button>
            <Button
              as="a"
              href="https://github.com/JrValerio"
              target="_blank"
              rel="noopener noreferrer"
            >
              {messages.contact.viewGithub}
            </Button>
          </div>
        </Card>

        <Card className="space-y-3">
          <p className="jr-meta">{messages.contact.availability}</p>
          <p className="text-sm text-[var(--jr-text)]">{messages.contact.availabilityValue}</p>
          <p className="jr-meta">{messages.contact.response}</p>
          <p className="text-sm text-[var(--jr-text)]">{messages.contact.responseValue}</p>
          <p className="jr-meta">{messages.contact.location}</p>
          <p className="text-sm text-[var(--jr-text)]">{messages.contact.locationValue}</p>
        </Card>
      </div>
    </Section>
  );
}

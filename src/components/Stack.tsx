import Section from "./UI/Section";
import { getV2Messages, techStack, type V2Locale } from "../i18n/v2";

type StackProps = {
  locale?: V2Locale;
};

export default function Stack({ locale = "pt-BR" }: StackProps) {
  const messages = getV2Messages(locale);

  return (
    <Section
      id="stack"
      title={messages.stack.title}
      subtitle={messages.stack.subtitle}
    >
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.map((item) => (
          <li
            key={item}
            className="border-b border-[var(--jr-border)] py-3 text-sm text-[var(--jr-text)] transition-colors hover:border-[var(--jr-accent)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}

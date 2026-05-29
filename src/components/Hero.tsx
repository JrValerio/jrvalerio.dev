import Container from "./UI/Container";
import { getV2Messages, toLocalePath, type V2Locale } from "../i18n/v2";

type HeroProps = {
  locale?: V2Locale;
  prefixed?: boolean;
};

export default function Hero({ locale = "pt-BR", prefixed = false }: HeroProps) {
  const messages = getV2Messages(locale);

  return (
    <section className="jr-hero flex items-center py-0">
      <Container>
        <div className="max-w-180">
          <h1 className="jr-hero-title jr-slide-in jr-slide-in-1">
            Amaro Junior
          </h1>

          <p className="jr-hero-role jr-slide-in jr-slide-in-2 mt-3">
            {messages.hero.role}
          </p>

          <p className="jr-hero-summary jr-slide-in jr-slide-in-3 mt-7">
            {messages.hero.summary}
          </p>

          <div className="jr-slide-in jr-slide-in-4 mt-11 flex flex-wrap gap-6">
            <a
              href={toLocalePath("/v2/projetos", locale, prefixed)}
              className="jr-link inline-block transition-transform duration-200 hover:-translate-y-0.5"
            >
              {messages.hero.ctaWork}
            </a>
            <a
              href="https://github.com/jrvalerio"
              target="_blank"
              rel="noopener noreferrer"
              className="jr-link inline-block transition-transform duration-200 hover:-translate-y-0.5"
            >
              {messages.hero.ctaGithub}
            </a>
            <a
              href="https://linkedin.com/in/jrvalerio"
              target="_blank"
              rel="noopener noreferrer"
              className="jr-link inline-block transition-transform duration-200 hover:-translate-y-0.5"
            >
              {messages.hero.ctaLinkedIn}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

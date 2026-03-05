import Container from "./UI/Container";

export default function Hero() {
  return (
    <section className="flex min-h-[88vh] items-center border-b border-[var(--jr-border)] py-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="jr-hero-title jr-reveal jr-reveal-delay-1">
            Amaro Junior
          </h1>

          <p className="jr-hero-subtitle jr-reveal jr-reveal-delay-2 mt-6">
            Full-Stack Developer
          </p>

          <p className="jr-body jr-reveal jr-reveal-delay-3 mt-6 max-w-xl text-[var(--jr-muted)]">
            I build technology that helps people communicate. Creator of EcoVoz.
          </p>

          <div className="jr-reveal jr-reveal-delay-4 mt-10 flex flex-wrap gap-6">
            <a
              href="#work"
              className="jr-link inline-block transition-transform duration-200 hover:-translate-y-0.5"
            >
              View Work
            </a>
            <a
              href="https://github.com/jrvalerio"
              target="_blank"
              rel="noopener noreferrer"
              className="jr-link inline-block transition-transform duration-200 hover:-translate-y-0.5"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/jrvalerio"
              target="_blank"
              rel="noopener noreferrer"
              className="jr-link inline-block transition-transform duration-200 hover:-translate-y-0.5"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

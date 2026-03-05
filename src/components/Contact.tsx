import Button from "./UI/Button";
import Card from "./UI/Card";
import Section from "./UI/Section";

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="Aberto para projetos, times de produto e oportunidades remotas."
    >
      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <Card>
          <p className="jr-meta mb-3">Let&apos;s build something valuable</p>
          <p className="jr-body max-w-2xl text-[var(--jr-muted)]">
            Se voce precisa de um desenvolvedor focado em produto, performance e experiencia
            de usuario, posso contribuir em discovery, implementacao e entrega.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              as="a"
              href="mailto:amarovsjr81@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enviar email
            </Button>
            <Button
              as="a"
              href="https://www.linkedin.com/in/jrvalerio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conectar no LinkedIn
            </Button>
            <Button
              as="a"
              href="https://github.com/JrValerio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver GitHub
            </Button>
          </div>
        </Card>

        <Card className="space-y-3">
          <p className="jr-meta">Disponibilidade</p>
          <p className="text-sm text-[var(--jr-text)]">Freelance e oportunidades remotas</p>
          <p className="jr-meta">Resposta</p>
          <p className="text-sm text-[var(--jr-text)]">Normalmente em ate 24 horas</p>
          <p className="jr-meta">Localizacao</p>
          <p className="text-sm text-[var(--jr-text)]">Atibaia, Sao Paulo, Brasil</p>
        </Card>
      </div>
    </Section>
  );
}

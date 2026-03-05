import Section from "./UI/Section";

export default function About() {
  return (
    <Section
      id="about"
      title="About"
      subtitle="Construindo software com foco em acessibilidade, impacto real e qualidade de codigo."
    >
      <div className="max-w-3xl space-y-4">
        <p className="jr-body text-[var(--jr-muted)]">
          Full-stack developer focado em construir tecnologia acessivel com React, Next.js,
          TypeScript e Node.js.
        </p>
        <p className="jr-body text-[var(--jr-muted)]">
          Criador do EcoVoz, uma plataforma de comunicacao assistiva multimodal orientada a
          impacto real.
        </p>
        <p className="jr-body text-[var(--jr-muted)]">
          Baseado no Brasil, com foco em engenharia de produto, performance e experiencia do
          usuario.
        </p>
      </div>
    </Section>
  );
}

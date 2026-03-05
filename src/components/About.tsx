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
          Sou desenvolvedor Full-Stack com foco em React, Next.js, TypeScript e Node.js.
          Gosto de transformar problemas de negocio em interfaces objetivas e sistemas
          confiaveis.
        </p>
        <p className="jr-body text-[var(--jr-muted)]">
          Minha direcao de carreira combina produto, engenharia e performance. O objetivo e
          entregar experiencias que parecem simples para o usuario, mas sao robustas por
          baixo.
        </p>
      </div>
    </Section>
  );
}

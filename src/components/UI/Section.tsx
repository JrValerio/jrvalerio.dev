import type { ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="jr-section">
      <Container>
        <header className="mb-10">
          <h2 className="jr-section-title">{title}</h2>
          {subtitle ? <p className="jr-section-subtitle mt-3">{subtitle}</p> : null}
        </header>
        {children}
      </Container>
    </section>
  );
}

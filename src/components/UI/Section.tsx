import type { ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
  id?: string;
  analyticsId?: string;
  title: string;
  subtitle?: string;
  headingAnchorHref?: string;
  headingAnchorLabel?: string;
  children: ReactNode;
};

export default function Section({
  id,
  analyticsId,
  title,
  subtitle,
  headingAnchorHref,
  headingAnchorLabel,
  children,
}: SectionProps) {
  return (
    <section id={id} data-analytics={analyticsId ?? id} className="jr-section scroll-mt-20">
      <Container>
        <header className="mb-10">
          <div className="jr-section-heading">
            <h2 className="jr-section-title">{title}</h2>
            {headingAnchorHref ? (
              <a
                href={headingAnchorHref}
                className="jr-section-anchor"
                aria-label={headingAnchorLabel ?? title}
              >
                #
              </a>
            ) : null}
          </div>
          {subtitle ? <p className="jr-section-subtitle mt-3">{subtitle}</p> : null}
        </header>
        {children}
      </Container>
    </section>
  );
}

import type { ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
  id?: string;
  analyticsId?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /**
   * Heading level for the section title. Defaults to h2.
   * Use h1 on the primary content section of each page.
   */
  headingAs?: "h1" | "h2";
  headingAnchorHref?: string;
  headingAnchorLabel?: string;
  children: ReactNode;
};

export default function Section({
  id,
  analyticsId,
  title,
  subtitle,
  headingAs = "h2",
  headingAnchorHref,
  headingAnchorLabel,
  children,
}: SectionProps) {
  const Heading = headingAs;

  return (
    <section id={id} data-analytics={analyticsId ?? id} className="jr-section scroll-mt-20">
      <Container>
        <header className="mb-10">
          <div className="jr-section-heading">
            <Heading className="jr-section-title">{title}</Heading>
            {headingAnchorHref ? (
              <a
                href={headingAnchorHref}
                className="jr-section-anchor"
                aria-label={
                  headingAnchorLabel ?? (typeof title === "string" ? title : "Section anchor")
                }
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

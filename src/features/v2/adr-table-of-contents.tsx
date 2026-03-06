"use client";

import { useMemo } from "react";
import { useScrollSpy } from "../../hooks/useScrollSpy";

type AdrTableOfContentsSection = {
  id: string;
  title: string;
};

type AdrTableOfContentsProps = {
  label: string;
  sections: AdrTableOfContentsSection[];
};

export default function AdrTableOfContents({
  label,
  sections,
}: AdrTableOfContentsProps) {
  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);
  const activeId = useScrollSpy(sectionIds);

  if (!sections.length) {
    return null;
  }

  return (
    <nav className="jr-adr-toc" aria-label={label}>
      <p className="jr-meta mb-4">{label}</p>
      <ol className="jr-adr-toc-list">
        {sections.map((section, index) => {
          const isActive = activeId === section.id;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`jr-adr-toc-link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                <span className="jr-adr-toc-index">{String(index + 1).padStart(2, "0")}.</span>
                <span>{section.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

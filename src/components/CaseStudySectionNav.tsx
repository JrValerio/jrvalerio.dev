"use client";

import { useEffect, useMemo, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

type CaseStudySectionNavProps = {
  items: NavItem[];
  readingTime: number;
  label: string;
  minReadLabel: string;
};

export default function CaseStudySectionNav({
  items,
  readingTime,
  label,
  minReadLabel,
}: CaseStudySectionNavProps) {
  const defaultId = items[0]?.id ?? "";
  const [activeId, setActiveId] = useState(defaultId);

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;
        const id = visible[0].target.getAttribute("id");
        if (id) setActiveId(id);
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0.1, 0.4, 0.7],
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [ids]);

  if (!items.length) return null;

  return (
    <div className="mt-8 border-t border-[var(--jr-border)] pt-5">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="jr-meta">{label}</span>
        <span className="jr-meta">•</span>
        <span className="jr-meta">
          {readingTime} {minReadLabel}
        </span>
      </div>

      <nav aria-label="Case study sections" className="-mx-1 overflow-x-auto">
        <ul className="flex min-w-max gap-2 px-1 pb-1">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    active
                      ? "border-[var(--jr-accent)] text-[var(--jr-accent)]"
                      : "border-[var(--jr-border)] text-[var(--jr-muted)] hover:text-[var(--jr-text)]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

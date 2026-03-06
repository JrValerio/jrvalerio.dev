"use client";

import { useEffect, useRef } from "react";
import { getOrCreateCaseSessionId, trackCaseSectionView } from "../lib/analytics";

type CaseStudySectionTrackerProps = {
  slug: string;
  category: string;
  locale?: string;
};

export default function CaseStudySectionTracker({
  slug,
  category,
  locale,
}: CaseStudySectionTrackerProps) {
  const seenSectionsRef = useRef<Set<string>>(new Set());
  const sessionIdRef = useRef("");

  useEffect(() => {
    seenSectionsRef.current.clear();
    sessionIdRef.current = getOrCreateCaseSessionId(slug);

    const sectionNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-analytics]")
    );

    if (!sectionNodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.45) continue;

          const section = entry.target.getAttribute("data-analytics");
          if (!section || seenSectionsRef.current.has(section)) continue;

          seenSectionsRef.current.add(section);
          trackCaseSectionView({
            project_slug: slug,
            project_category: category,
            section,
            locale,
            session_id: sessionIdRef.current,
          });
        }
      },
      {
        threshold: [0.35, 0.55, 0.75],
        rootMargin: "0px 0px -15% 0px",
      }
    );

    sectionNodes.forEach((sectionNode) => observer.observe(sectionNode));

    return () => {
      observer.disconnect();
    };
  }, [slug, category, locale]);

  return null;
}

"use client";

import { useEffect, useState } from "react";

const SHELL_SCROLL_CONTAINER_ID = "ContentScroll";

type UseScrollSpyOptions = {
  rootId?: string;
};

export function useScrollSpy(ids: string[], options: UseScrollSpyOptions = {}) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (!ids.length) {
      setActiveId(null);
      return;
    }

    const initialHash = window.location.hash.replace(/^#/, "");
    if (initialHash && ids.includes(initialHash)) {
      setActiveId(initialHash);
    } else {
      setActiveId(ids[0] ?? null);
    }

    const visibleSections = new Map<string, IntersectionObserverEntry>();
    const root = document.getElementById(options.rootId ?? SHELL_SCROLL_CONTAINER_ID);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const resolveActiveSection = () => {
      const visible = Array.from(visibleSections.values())
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => {
          const topDifference =
            Math.abs(left.boundingClientRect.top) - Math.abs(right.boundingClientRect.top);

          if (topDifference !== 0) {
            return topDifference;
          }

          return right.intersectionRatio - left.intersectionRatio;
        });

      if (visible[0]?.target.id) {
        setActiveId(visible[0].target.id);
        return;
      }

      const scrollOffset = root ? root.scrollTop : window.scrollY;
      if (scrollOffset <= 24) {
        setActiveId(ids[0] ?? null);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleSections.set(entry.target.id, entry);
        });

        resolveActiveSection();
      },
      {
        root,
        rootMargin: "-18% 0px -64% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    const onHashChange = () => {
      const nextHash = window.location.hash.replace(/^#/, "");
      if (nextHash && ids.includes(nextHash)) {
        setActiveId(nextHash);
      }
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [ids, options.rootId]);

  return activeId;
}

"use client";

import { useEffect, useMemo, useRef } from "react";
import { getScrollMetrics } from "../lib/scroll-metrics";

const READING_MILESTONES = [25, 50, 75, 100] as const;

type ReadingMilestone = (typeof READING_MILESTONES)[number];

type ReadingAnalyticsOptions = {
  sectionIds?: string[];
  onView?: () => void;
  onStart?: () => void;
  onProgress?: (payload: { depth: number; milestone: ReadingMilestone }) => void;
  onComplete?: (payload: { depth: number }) => void;
  onSectionView?: (sectionId: string) => void;
};

export function useReadingAnalytics({
  sectionIds = [],
  onView,
  onStart,
  onProgress,
  onComplete,
  onSectionView,
}: ReadingAnalyticsOptions) {
  const firedMilestones = useRef<Set<number>>(new Set());
  const viewedSections = useRef<Set<string>>(new Set());
  const completed = useRef(false);
  const stableSectionIds = useMemo(() => sectionIds.filter(Boolean), [sectionIds]);

  useEffect(() => {
    onView?.();
    onStart?.();
  }, [onStart, onView]);

  useEffect(() => {
    firedMilestones.current.clear();
    completed.current = false;

    const evaluateDepth = () => {
      const { maxScroll, scrollOffset } = getScrollMetrics();
      const depth = maxScroll > 0 ? Math.min(1, Math.max(0, scrollOffset / maxScroll)) : 1;
      const depthPercent = Math.round(depth * 100);

      for (const milestone of READING_MILESTONES) {
        if (depthPercent < milestone || firedMilestones.current.has(milestone)) {
          continue;
        }

        firedMilestones.current.add(milestone);
        onProgress?.({ depth, milestone });
      }

      if (depthPercent >= 100 && !completed.current) {
        completed.current = true;
        onComplete?.({ depth });
      }
    };

    const { target } = getScrollMetrics();

    evaluateDepth();
    target.addEventListener("scroll", evaluateDepth, { passive: true });
    window.addEventListener("resize", evaluateDepth);

    return () => {
      target.removeEventListener("scroll", evaluateDepth);
      window.removeEventListener("resize", evaluateDepth);
    };
  }, [onComplete, onProgress]);

  useEffect(() => {
    viewedSections.current.clear();
    if (!stableSectionIds.length || !onSectionView) return;

    const { root } = getScrollMetrics();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const sectionId = entry.target.getAttribute("data-analytics") || entry.target.id;
          if (!sectionId || viewedSections.current.has(sectionId)) continue;

          viewedSections.current.add(sectionId);
          onSectionView(sectionId);
        }
      },
      {
        root,
        rootMargin: "-18% 0px -58% 0px",
        threshold: 0.2,
      }
    );

    const elements = stableSectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((element): element is HTMLElement => Boolean(element));

    for (const element of elements) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [onSectionView, stableSectionIds]);
}

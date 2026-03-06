"use client";

import { useEffect, useRef } from "react";
import {
  getOrCreateCaseSessionId,
  trackCaseReadComplete,
  trackCaseReadDepth,
  trackCaseReadStart,
  trackEvent,
} from "../lib/analytics";

type CaseStudyReadingTrackerProps = {
  slug: string;
  category: string;
  estimatedReadMinutes: number;
  locale?: string;
};

const READ_THRESHOLDS = [50, 90] as const;

export default function CaseStudyReadingTracker({
  slug,
  category,
  estimatedReadMinutes,
  locale,
}: CaseStudyReadingTrackerProps) {
  const sentThresholdsRef = useRef<Set<number>>(new Set());
  const maxDepthRef = useRef(0);
  const completedRef = useRef(false);
  const sessionStartRef = useRef(0);
  const visibleFromRef = useRef(0);
  const activeMsRef = useRef(0);
  const sentSessionRef = useRef(false);
  const sessionIdRef = useRef("");

  useEffect(() => {
    const now = Date.now();
    sessionStartRef.current = now;
    visibleFromRef.current = now;
    sentThresholdsRef.current.clear();
    maxDepthRef.current = 0;
    completedRef.current = false;
    activeMsRef.current = 0;
    sentSessionRef.current = false;
    sessionIdRef.current = getOrCreateCaseSessionId(slug);

    trackCaseReadStart({
      project_slug: slug,
      project_category: category,
      estimated_read_minutes: estimatedReadMinutes,
      locale,
      session_id: sessionIdRef.current,
    });

    const getDepthPercent = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 100;
      return Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));
    };

    const onScroll = () => {
      const depth = getDepthPercent();
      if (depth > maxDepthRef.current) {
        maxDepthRef.current = depth;
      }

      for (const threshold of READ_THRESHOLDS) {
        if (depth < threshold || sentThresholdsRef.current.has(threshold)) continue;

        sentThresholdsRef.current.add(threshold);
        trackCaseReadDepth({
          project_slug: slug,
          project_category: category,
          estimated_read_minutes: estimatedReadMinutes,
          depth: threshold / 100,
          milestone: threshold,
          locale,
          session_id: sessionIdRef.current,
        });

        if (threshold === 90 && !completedRef.current) {
          completedRef.current = true;
          trackCaseReadComplete({
            project_slug: slug,
            project_category: category,
            estimated_read_minutes: estimatedReadMinutes,
            depth: threshold / 100,
            locale,
            session_id: sessionIdRef.current,
          });
        }
      }
    };

    const flushSession = (reason: "pagehide" | "visibilitychange" | "unmount") => {
      if (sentSessionRef.current) return;

      const current = Date.now();
      if (visibleFromRef.current > 0) {
        activeMsRef.current += Math.max(0, current - visibleFromRef.current);
        visibleFromRef.current = 0;
      }

      sentSessionRef.current = true;
      trackEvent("case_read_session", {
        project_slug: slug,
        project_category: category,
        reason,
        source: "portfolio",
        sessionId: sessionIdRef.current,
        session_id: sessionIdRef.current,
        active_seconds: Number((activeMsRef.current / 1000).toFixed(1)),
        session_seconds: Number(((current - sessionStartRef.current) / 1000).toFixed(1)),
        max_depth_percent: Number(maxDepthRef.current.toFixed(1)),
        completed: completedRef.current,
        estimated_read_minutes: estimatedReadMinutes,
        locale,
      });
      trackEvent("case_study_read_session", {
        project_slug: slug,
        project_category: category,
        reason,
        active_seconds: Number((activeMsRef.current / 1000).toFixed(1)),
        session_seconds: Number(((current - sessionStartRef.current) / 1000).toFixed(1)),
        max_depth_percent: Number(maxDepthRef.current.toFixed(1)),
        completed: completedRef.current,
        estimated_read_minutes: estimatedReadMinutes,
        locale,
      });
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (visibleFromRef.current > 0) {
          activeMsRef.current += Math.max(0, Date.now() - visibleFromRef.current);
          visibleFromRef.current = 0;
        }
        return;
      }

      if (document.visibilityState === "visible") {
        visibleFromRef.current = Date.now();
      }
    };

    const onPageHide = () => flushSession("pagehide");

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      flushSession("unmount");
    };
  }, [slug, category, estimatedReadMinutes, locale]);

  return null;
}

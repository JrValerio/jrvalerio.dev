"use client";

import { useEffect, useMemo, useRef } from "react";
import { trackEvent } from "../lib/analytics";
import { getScrollMetrics } from "../lib/scroll-metrics";

type ScrollDepthTrackerProps = {
  path: string;
  routeType: "app" | "pages";
};

const DEPTH_THRESHOLDS = [25, 50, 75, 100] as const;

function normalizePath(path: string) {
  return path.split("?")[0]?.split("#")[0] ?? "/";
}

export default function ScrollDepthTracker({ path, routeType }: ScrollDepthTrackerProps) {
  const sentThresholds = useRef<Set<number>>(new Set());
  const safePath = useMemo(() => normalizePath(path), [path]);

  useEffect(() => {
    sentThresholds.current.clear();

    const evaluateDepth = () => {
      const { maxScroll, scrollOffset } = getScrollMetrics();
      const isScrollable = maxScroll > 0;
      const depth = isScrollable
        ? Math.min(100, Math.max(0, (scrollOffset / maxScroll) * 100))
        : 100;
      const thresholds = isScrollable ? DEPTH_THRESHOLDS : [100];

      for (const threshold of thresholds) {
        if (depth < threshold || sentThresholds.current.has(threshold)) {
          continue;
        }

        sentThresholds.current.add(threshold);
        trackEvent("scroll_depth", {
          percent: threshold,
          page_path: safePath,
          route_type: routeType,
        });
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
  }, [safePath, routeType]);

  return null;
}

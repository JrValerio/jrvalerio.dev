"use client";

import { useRef } from "react";
import type { NextWebVitalsMetric } from "next/app";
import { useReportWebVitals } from "next/web-vitals";
import { trackEvent } from "../lib/analytics";

type WebVitalsTrackerProps = {
  routeType: "app" | "pages";
};

const TRACKED_METRICS = new Set(["LCP", "CLS", "INP"]);

function formatMetricValue(metric: NextWebVitalsMetric) {
  if (metric.name === "CLS") {
    return Number(metric.value.toFixed(4));
  }
  return Number(metric.value.toFixed(2));
}

export default function WebVitalsTracker({ routeType }: WebVitalsTrackerProps) {
  const sentMetrics = useRef<Set<string>>(new Set());

  useReportWebVitals((metric) => {
    if (!TRACKED_METRICS.has(metric.name)) return;

    const key = `${metric.id}:${metric.name}`;
    if (sentMetrics.current.has(key)) return;
    sentMetrics.current.add(key);

    const pagePath =
      typeof window === "undefined"
        ? "/"
        : window.location.pathname + window.location.search;

    trackEvent("web_vital", {
      metric_name: metric.name,
      metric_value: formatMetricValue(metric),
      metric_rating: metric.rating,
      metric_delta: Number(metric.delta.toFixed(2)),
      page_path: pagePath,
      route_type: routeType,
    });
  });

  return null;
}

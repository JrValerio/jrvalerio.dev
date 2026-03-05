"use client";

import { track } from "@vercel/analytics";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: EventParams) => void;
  }
}

export function trackEvent(action: string, params: EventParams = {}) {
  const payload = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  ) as Record<string, string | number | boolean>;

  try {
    track(action, payload);
  } catch {
    // no-op: analytics provider may be unavailable in local builds
  }

  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", action, payload);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics:event]", action, payload);
  }
}

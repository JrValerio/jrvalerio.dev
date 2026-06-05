"use client";

import { track } from "@vercel/analytics";

type EventParams = Record<string, string | number | boolean | undefined>;
type CaseAnalyticsParams = {
  project_slug: string;
  project_category: string;
  locale?: string;
  session_id?: string;
  source?: "case" | "list";
};
type AdrAnalyticsParams = {
  adr_slug: string;
  adr_id: string;
  locale?: string;
  source?: "engineering";
};

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com";

let posthogInitialized = false;
let posthogInitPromise: Promise<void> | null = null;
const POSTHOG_EVENT_BUFFER_LIMIT = 40;
const CASE_SESSION_STORAGE_PREFIX = "jr-case-session";

type PostHogClient = typeof import("posthog-js")["default"];
let posthogClient: PostHogClient | null = null;
const pendingPosthogEvents: Array<{
  action: string;
  payload: Record<string, string | number | boolean>;
}> = [];

function bufferPosthogEvent(
  action: string,
  payload: Record<string, string | number | boolean>
) {
  if (pendingPosthogEvents.length >= POSTHOG_EVENT_BUFFER_LIMIT) {
    pendingPosthogEvents.shift();
  }

  pendingPosthogEvents.push({ action, payload });
}

function flushPendingPosthogEvents() {
  if (!posthogClient) return;

  for (const event of pendingPosthogEvents.splice(0, pendingPosthogEvents.length)) {
    try {
      posthogClient.capture(event.action, event.payload);
    } catch {
      // no-op: analytics provider may be unavailable in local builds
    }
  }
}

async function ensurePosthogInitialized() {
  if (typeof window === "undefined") return;
  if (posthogInitialized) return;
  if (!POSTHOG_KEY) return;
  if (posthogInitPromise) return posthogInitPromise;

  posthogInitPromise = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: true,
        capture_pageleave: true,
      });

      posthogClient = posthog;
      posthogInitialized = true;
      flushPendingPosthogEvents();
    })
    .catch(() => {
      // no-op: analytics provider may be unavailable in local builds
    })
    .finally(() => {
      if (!posthogInitialized) {
        posthogInitPromise = null;
      }
    });

  return posthogInitPromise;
}

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

  initAnalytics();

  if (posthogInitialized && posthogClient) {
    try {
      posthogClient.capture(action, payload);
    } catch {
      // no-op: analytics provider may be unavailable in local builds
    }
  } else if (POSTHOG_KEY) {
    bufferPosthogEvent(action, payload);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", action, payload);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics:event]", action, payload);
  }
}

export function initAnalytics() {
  void ensurePosthogInitialized();
}

function normalizeCasePayload(
  params: CaseAnalyticsParams,
  extra: EventParams = {}
): EventParams {
  return {
    project: params.project_slug,
    project_slug: params.project_slug,
    category: params.project_category,
    project_category: params.project_category,
    locale: params.locale,
    source: params.source ?? "portfolio",
    sessionId: params.session_id,
    session_id: params.session_id,
    ...extra,
  };
}

function normalizeAdrPayload(
  params: AdrAnalyticsParams,
  extra: EventParams = {}
): EventParams {
  return {
    adr: params.adr_slug,
    adr_slug: params.adr_slug,
    adr_id: params.adr_id,
    locale: params.locale,
    source: params.source ?? "engineering",
    ...extra,
  };
}

function createSessionId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  if (typeof globalThis.crypto?.getRandomValues === "function") {
    const bytes = new Uint8Array(8);
    globalThis.crypto.getRandomValues(bytes);
    const randomSuffix = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

    return `${Date.now()}-${randomSuffix}`;
  }

  throw new Error("Web Crypto is required to create analytics session IDs.");
}

export function getOrCreateCaseSessionId(projectSlug: string) {
  if (typeof window === "undefined") {
    return `${projectSlug}-ssr`;
  }

  const key = `${CASE_SESSION_STORAGE_PREFIX}:${projectSlug}`;

  try {
    const current = window.sessionStorage.getItem(key);
    if (current) return current;

    const created = createSessionId();
    window.sessionStorage.setItem(key, created);
    return created;
  } catch {
    return createSessionId();
  }
}

export function trackCaseView(params: CaseAnalyticsParams) {
  const payload = normalizeCasePayload(params);
  trackEvent("case_view", payload);
  trackEvent("case_study_view", payload);
}

export function trackCaseReadStart(
  params: CaseAnalyticsParams & { estimated_read_minutes: number }
) {
  const payload = normalizeCasePayload(params, {
    estimated_read_minutes: params.estimated_read_minutes,
  });
  trackEvent("case_read_start", payload);
  trackEvent("case_study_read_start", payload);
}

export function trackCaseReadDepth(
  params: CaseAnalyticsParams & {
    estimated_read_minutes: number;
    depth: number;
    milestone?: 25 | 50 | 75 | 90 | 95 | 100;
  }
) {
  const depth = Math.min(1, Math.max(0, params.depth));
  const depthPercent = Math.round(depth * 100);
  const payload = normalizeCasePayload(params, {
    estimated_read_minutes: params.estimated_read_minutes,
    depth,
    depth_percent: depthPercent,
  });

  trackEvent("case_read_depth", payload);

  if (params.milestone) {
    trackEvent(`case_read_${params.milestone}`, payload);
  }

  trackEvent("reading_progress", {
    ...payload,
    milestone: params.milestone ?? depthPercent,
    document_type: "case_study",
  });
  if (params.milestone) {
    trackEvent(`reading_progress_${params.milestone}`, {
      ...payload,
      document_type: "case_study",
    });
  }

  trackEvent("case_study_read_depth", {
    ...payload,
    percent: params.milestone ?? depthPercent,
  });
}

export function trackCaseReadComplete(
  params: CaseAnalyticsParams & {
    estimated_read_minutes: number;
    depth: number;
  }
) {
  const depth = Math.min(1, Math.max(0, params.depth));
  const payload = normalizeCasePayload(params, {
    estimated_read_minutes: params.estimated_read_minutes,
    depth,
    depth_percent: Math.round(depth * 100),
  });
  trackEvent("case_read_complete", payload);
  trackEvent("case_study_complete", payload);
  trackEvent("case_study_read_complete", payload);
}

export function trackCaseOutbound(
  target: "repo" | "live",
  params: CaseAnalyticsParams
) {
  const payload = normalizeCasePayload(params, { target });
  trackEvent("case_outbound_click", payload);

  if (target === "repo") {
    trackEvent("case_outbound_repo", payload);
    trackEvent("project_source_click", payload);
    return;
  }

  trackEvent("case_outbound_live", payload);
  trackEvent("project_live_click", payload);
}

export function trackCaseSectionView(
  params: CaseAnalyticsParams & { section: string }
) {
  const payload = normalizeCasePayload(params, { section: params.section });
  trackEvent("case_section_view", payload);
  trackEvent("case_study_section_view", payload);
  trackEvent("section_view", {
    ...payload,
    document_type: "case_study",
  });
}

export function trackAdrView(params: AdrAnalyticsParams) {
  const payload = normalizeAdrPayload(params);
  trackEvent("adr_view", payload);
  trackEvent("engineering_doc_view", payload);
}

export function trackAdrReadStart(
  params: AdrAnalyticsParams & { estimated_read_minutes: number }
) {
  const payload = normalizeAdrPayload(params, {
    estimated_read_minutes: params.estimated_read_minutes,
  });
  trackEvent("adr_read_start", payload);
  trackEvent("engineering_doc_read_start", payload);
}

export function trackAdrReadDepth(
  params: AdrAnalyticsParams & {
    estimated_read_minutes: number;
    depth: number;
    milestone: 25 | 50 | 75 | 100;
  }
) {
  const depth = Math.min(1, Math.max(0, params.depth));
  const payload = normalizeAdrPayload(params, {
    estimated_read_minutes: params.estimated_read_minutes,
    depth,
    depth_percent: Math.round(depth * 100),
    milestone: params.milestone,
  });

  trackEvent("adr_read_depth", payload);
  trackEvent(`adr_read_${params.milestone}`, payload);
  trackEvent("reading_progress", {
    ...payload,
    document_type: "adr",
  });
  trackEvent(`reading_progress_${params.milestone}`, {
    ...payload,
    document_type: "adr",
  });
}

export function trackAdrReadComplete(
  params: AdrAnalyticsParams & {
    estimated_read_minutes: number;
    depth: number;
  }
) {
  const depth = Math.min(1, Math.max(0, params.depth));
  const payload = normalizeAdrPayload(params, {
    estimated_read_minutes: params.estimated_read_minutes,
    depth,
    depth_percent: Math.round(depth * 100),
  });
  trackEvent("adr_read_complete", payload);
  trackEvent("reading_complete", {
    ...payload,
    document_type: "adr",
  });
  trackEvent("engineering_doc_read_complete", payload);
}

export function trackAdrSectionView(
  params: AdrAnalyticsParams & { section: string }
) {
  const payload = normalizeAdrPayload(params, { section: params.section });
  trackEvent("adr_section_view", payload);
  trackEvent("section_view", {
    ...payload,
    document_type: "adr",
  });
}

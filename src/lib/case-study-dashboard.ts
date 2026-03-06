import "server-only";

import { projects } from "../data/projects";

type PostHogRow = Record<string, unknown>;

export type CaseStudyDashboardRow = {
  slug: string;
  views: number;
  readCompletions: number;
  completionRate: number;
  repoClicks: number;
  repoClickRate: number;
  liveClicks: number;
  liveClickRate: number;
  avgDepthPercent: number | null;
  avgActiveSeconds: number | null;
};

export type CaseStudyDashboard = {
  source: "posthog" | "fallback";
  configured: boolean;
  windowDays: number;
  generatedAt: string;
  totals: {
    views: number;
    completionRate: number;
    repoClickRate: number;
    liveClickRate: number;
    avgDepthPercent: number | null;
    avgActiveSeconds: number | null;
  };
  topProjectSlug: string | null;
  rows: CaseStudyDashboardRow[];
  notice?: string;
};

const DEFAULT_WINDOW_DAYS = 30;
const MAX_WINDOW_DAYS = 180;
const DEFAULT_API_HOST = "https://us.posthog.com";

function clampWindowDays(value: number) {
  if (!Number.isFinite(value)) return DEFAULT_WINDOW_DAYS;
  const normalized = Math.trunc(value);
  if (normalized < 1) return 1;
  if (normalized > MAX_WINDOW_DAYS) return MAX_WINDOW_DAYS;
  return normalized;
}

function getWindowDays() {
  return clampWindowDays(Number(process.env.POSTHOG_METRICS_WINDOW_DAYS ?? DEFAULT_WINDOW_DAYS));
}

function normalizeHost(host: string) {
  return host.replace(/\/+$/, "");
}

function resolveApiHost() {
  const explicitHost = process.env.POSTHOG_API_HOST;
  if (explicitHost) return normalizeHost(explicitHost);

  const browserHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!browserHost) return DEFAULT_API_HOST;

  const normalized = normalizeHost(browserHost);
  if (normalized.includes("eu.i.posthog.com")) return "https://eu.posthog.com";
  if (normalized.includes("us.i.posthog.com")) return "https://us.posthog.com";
  if (normalized.includes("app.posthog.com")) return "https://us.posthog.com";
  return normalized;
}

function toNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function toNullableNumber(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const numberValue = toNumber(value);
  if (Number.isNaN(numberValue)) return null;
  return numberValue;
}

function toSlug(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

function buildFallbackRows(): CaseStudyDashboardRow[] {
  return projects.map((project) => ({
    slug: project.slug,
    views: 0,
    readCompletions: 0,
    completionRate: 0,
    repoClicks: 0,
    repoClickRate: 0,
    liveClicks: 0,
    liveClickRate: 0,
    avgDepthPercent: null,
    avgActiveSeconds: null,
  }));
}

function createFallbackDashboard(windowDays: number, notice: string): CaseStudyDashboard {
  return {
    source: "fallback",
    configured: false,
    windowDays,
    generatedAt: new Date().toISOString(),
    totals: {
      views: 0,
      completionRate: 0,
      repoClickRate: 0,
      liveClickRate: 0,
      avgDepthPercent: null,
      avgActiveSeconds: null,
    },
    topProjectSlug: null,
    rows: buildFallbackRows(),
    notice,
  };
}

async function queryPostHog(query: string, name: string): Promise<PostHogRow[]> {
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const personalApiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const apiHost = resolveApiHost();

  if (!projectId || !personalApiKey) {
    throw new Error("MISSING_CREDENTIALS");
  }

  const endpoint = `${apiHost}/api/projects/${projectId}/query/`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${personalApiKey}`,
    },
    body: JSON.stringify({
      query: {
        kind: "HogQLQuery",
        query,
      },
      name,
      refresh: "blocking",
    }),
    next: { revalidate: 60 * 15 },
  });

  if (!response.ok) {
    throw new Error(`POSTHOG_QUERY_FAILED:${response.status}`);
  }

  const payload = (await response.json()) as { results?: unknown };
  if (!Array.isArray(payload.results)) return [];

  return payload.results.filter(
    (item): item is PostHogRow =>
      typeof item === "object" && item !== null && !Array.isArray(item)
  );
}

function buildMetricsQuery(windowDays: number) {
  return `
    SELECT
      coalesce(nullIf(properties.project_slug, ''), nullIf(properties.project, '')) AS slug,
      countIf(event = 'case_view') AS views_new,
      countIf(event = 'case_study_view') AS views_legacy,
      countIf(event = 'case_read_complete') AS completions_new,
      countIf(event = 'case_study_read_complete') AS completions_legacy,
      countIf(event = 'case_outbound_click' AND properties.target = 'repo') AS repo_clicks_new,
      countIf(event = 'project_source_click' AND properties.source = 'case') AS repo_clicks_legacy,
      countIf(event = 'case_outbound_click' AND properties.target = 'live') AS live_clicks_new,
      countIf(event = 'project_live_click' AND properties.source = 'case') AS live_clicks_legacy,
      avgIf(toFloat64OrNull(properties.max_depth_percent), event = 'case_read_session') AS avg_depth_percent_new,
      avgIf(toFloat64OrNull(properties.max_depth_percent), event = 'case_study_read_session') AS avg_depth_percent_legacy,
      avgIf(toFloat64OrNull(properties.active_seconds), event = 'case_read_session') AS avg_active_seconds_new,
      avgIf(toFloat64OrNull(properties.active_seconds), event = 'case_study_read_session') AS avg_active_seconds_legacy
    FROM events
    WHERE timestamp >= now() - INTERVAL ${windowDays} DAY
      AND event IN (
        'case_view',
        'case_study_view',
        'case_read_complete',
        'case_study_read_complete',
        'case_outbound_click',
        'project_source_click',
        'project_live_click',
        'case_read_session',
        'case_study_read_session'
      )
      AND coalesce(nullIf(properties.project_slug, ''), nullIf(properties.project, '')) IS NOT NULL
    GROUP BY slug
    HAVING (views_new > 0 OR views_legacy > 0)
    ORDER BY (views_new + views_legacy) DESC
    LIMIT 20
  `;
}

function pickCanonicalValue(primary: number, legacy: number) {
  return primary > 0 ? primary : legacy;
}

function pickCanonicalNullableNumber(primary: number | null, legacy: number | null) {
  if (primary !== null && !Number.isNaN(primary)) return primary;
  if (legacy !== null && !Number.isNaN(legacy)) return legacy;
  return null;
}

function toDashboardRows(rows: PostHogRow[]): CaseStudyDashboardRow[] {
  const normalizedRows = rows
    .map((row) => {
      const slug = toSlug(row.slug);
      const views = pickCanonicalValue(toNumber(row.views_new), toNumber(row.views_legacy));
      const readCompletions = pickCanonicalValue(
        toNumber(row.completions_new),
        toNumber(row.completions_legacy)
      );
      const repoClicks = pickCanonicalValue(
        toNumber(row.repo_clicks_new),
        toNumber(row.repo_clicks_legacy)
      );
      const liveClicks = pickCanonicalValue(
        toNumber(row.live_clicks_new),
        toNumber(row.live_clicks_legacy)
      );

      const avgDepthPercent = pickCanonicalNullableNumber(
        toNullableNumber(row.avg_depth_percent_new),
        toNullableNumber(row.avg_depth_percent_legacy)
      );
      const avgActiveSeconds = pickCanonicalNullableNumber(
        toNullableNumber(row.avg_active_seconds_new),
        toNullableNumber(row.avg_active_seconds_legacy)
      );

      if (!slug || views <= 0) return null;

      return {
        slug,
        views,
        readCompletions,
        completionRate: views > 0 ? (readCompletions / views) * 100 : 0,
        repoClicks,
        repoClickRate: views > 0 ? (repoClicks / views) * 100 : 0,
        liveClicks,
        liveClickRate: views > 0 ? (liveClicks / views) * 100 : 0,
        avgDepthPercent,
        avgActiveSeconds,
      } satisfies CaseStudyDashboardRow;
    })
    .filter((row): row is CaseStudyDashboardRow => row !== null);

  normalizedRows.sort((a, b) => b.views - a.views);
  return normalizedRows;
}

function computeTotals(rows: CaseStudyDashboardRow[]) {
  const views = rows.reduce((sum, row) => sum + row.views, 0);
  const readCompletions = rows.reduce((sum, row) => sum + row.readCompletions, 0);
  const repoClicks = rows.reduce((sum, row) => sum + row.repoClicks, 0);
  const liveClicks = rows.reduce((sum, row) => sum + row.liveClicks, 0);

  let depthWeightedSum = 0;
  let depthWeight = 0;
  let activeWeightedSum = 0;
  let activeWeight = 0;

  for (const row of rows) {
    if (row.avgDepthPercent !== null) {
      depthWeightedSum += row.avgDepthPercent * row.views;
      depthWeight += row.views;
    }
    if (row.avgActiveSeconds !== null) {
      activeWeightedSum += row.avgActiveSeconds * row.views;
      activeWeight += row.views;
    }
  }

  return {
    views,
    completionRate: views > 0 ? (readCompletions / views) * 100 : 0,
    repoClickRate: views > 0 ? (repoClicks / views) * 100 : 0,
    liveClickRate: views > 0 ? (liveClicks / views) * 100 : 0,
    avgDepthPercent: depthWeight > 0 ? depthWeightedSum / depthWeight : null,
    avgActiveSeconds: activeWeight > 0 ? activeWeightedSum / activeWeight : null,
  };
}

export async function getCaseStudyDashboard(): Promise<CaseStudyDashboard> {
  const windowDays = getWindowDays();
  const hasCredentials =
    Boolean(process.env.POSTHOG_PROJECT_ID) && Boolean(process.env.POSTHOG_PERSONAL_API_KEY);

  if (!hasCredentials) {
    return createFallbackDashboard(
      windowDays,
      "Set POSTHOG_PROJECT_ID and POSTHOG_PERSONAL_API_KEY to enable live metrics."
    );
  }

  try {
    const query = buildMetricsQuery(windowDays);
    const rawRows = await queryPostHog(query, "portfolio_case_study_dashboard");
    const rows = toDashboardRows(rawRows);
    const totals = computeTotals(rows);

    return {
      source: "posthog",
      configured: true,
      windowDays,
      generatedAt: new Date().toISOString(),
      totals,
      topProjectSlug: rows[0]?.slug ?? null,
      rows: rows.length ? rows : buildFallbackRows(),
      notice:
        rows.length === 0
          ? "No analytics events found in the selected window yet."
          : undefined,
    };
  } catch {
    return createFallbackDashboard(
      windowDays,
      "Unable to read live metrics from PostHog. Check API host, project id and key scopes."
    );
  }
}

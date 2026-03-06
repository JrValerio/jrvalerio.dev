# ADR-003 - Portfolio observability through analytics

Status: Accepted  
Date: 2026-03-06

## Context

Without telemetry, portfolio iteration is opinion-based.
Case studies were long enough to justify measuring reading behavior and conversion signals.

## Decision

Implement an analytics adapter (`src/lib/analytics.ts`) and track case-study funnel events.

Core events:
- `case_view`
- `case_read_start`
- `case_read_depth`
- `case_read_complete`
- `case_section_view`
- `case_outbound_click`

Add a metrics aggregation layer (`src/lib/case-study-dashboard.ts`) to query PostHog server-side with fallback when credentials are unavailable.

## Alternatives considered

### Vercel Analytics only
Pros:
- Minimal setup

Cons:
- Limited event funnel analysis for case-study depth and section reach

### Plausible
Pros:
- Privacy-forward and simple

Cons:
- Less flexible for custom funnel and section-level analysis

## Consequences

Positive:
- Product-style observability in a public portfolio
- Clear feedback loop for content and UX refinement
- Metrics page can display real data in production

Negative:
- Additional integration complexity
- Optional dependency on PostHog API credentials for live dashboard mode

## Notes

Instrumentation remains provider-agnostic at component call-sites via the analytics adapter.

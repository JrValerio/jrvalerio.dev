# C4 Level 2 - Container Diagram

## Containers

1. Web Application (Next.js)
- Renders `/v2` experience, case studies, docs pages, and localized routes.
- Handles metadata, sitemap, robots, and OG route integration.

2. Domain/Content Layer (`src/data/projects.ts`)
- Typed source of truth for project data and case study content.
- Powers cards, project pages, and metrics labels.

3. Analytics Adapter (`src/lib/analytics.ts`)
- Tracks client events with provider abstraction.
- Supports Vercel Analytics and optional PostHog buffering/init.

4. Metrics Aggregation (`src/lib/case-study-dashboard.ts`)
- Server-side query layer for PostHog HogQL.
- Generates dashboard payload with fallback when credentials are missing.

5. CI/Quality Gate
- Typecheck, lint, test, build, and bundle budget checks.

## Container flow

```text
User
  |
  v
Next.js Web App (routes/components)
  |
  +--> Domain/Content Layer (projects model)
  |
  +--> Analytics Adapter (events)
  |         |
  |         v
  |     Analytics Providers
  |
  +--> Metrics Aggregation (server)
            |
            v
        Metrics page
```

## Notes

- Current architecture is intentionally hybrid (`pages` + `app`) to preserve migration safety.
- Main user path is concentrated in `/v2`.

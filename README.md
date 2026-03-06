# jrvalerio.dev

Personal engineering portfolio of **Amaro Junior**.

This repository is not only a website. It is an **engineering documentation artifact** built to show product thinking, architecture decisions, and measurable quality gates.

## Overview

Main public sections:

- Home
- Projects (technical case studies)
- Archive
- Architecture
- Engineering Decisions
- Metrics
- Principles
- About
- Contact

The portfolio is implemented in a hybrid migration model (`pages` + `app`) with the main experience in `/v2`.

## Engineering Evolution (Stacked PR rollout)

V2 was introduced through stacked pull requests with clear scope boundaries:

1. `feat(v2): foundation shell, i18n routing, theme system and analytics base`
2. `feat(v2): information architecture and public documentation pages`
3. `feat(v2): case study engine with typed domain and reading telemetry`
4. `feat(v2): live case-study metrics dashboard with PostHog fallback`

This keeps review focused, risk controlled, and history clean.

## Architecture docs (C4)

Architecture documentation lives in [`docs/architecture`](docs/architecture):

- [`context.md`](docs/architecture/context.md)
- [`container.md`](docs/architecture/container.md)
- [`component.md`](docs/architecture/component.md)
- [`domain.md`](docs/architecture/domain.md)

## Engineering Decision Log (ADR)

Architecture decisions are documented in [`docs/adr`](docs/adr):

- [`ADR-001-nextjs-platform.md`](docs/adr/ADR-001-nextjs-platform.md)
- [`ADR-002-case-study-domain.md`](docs/adr/ADR-002-case-study-domain.md)
- [`ADR-003-analytics-observability.md`](docs/adr/ADR-003-analytics-observability.md)
- [`ADR-004-i18n-routing.md`](docs/adr/ADR-004-i18n-routing.md)

## EcoVoz Strategy Docs

EcoVoz strategy, roadmap, and governance documents live in [`docs/ecovoz`](docs/ecovoz):

- [`README.md`](docs/ecovoz/README.md)
- [`ROADMAP.md`](docs/ecovoz/ROADMAP.md)
- [`PLAN.md`](docs/ecovoz/PLAN.md)
- [`BUSINESS-RULES.md`](docs/ecovoz/BUSINESS-RULES.md)

## Current technical capabilities

- Typed case study domain model
- Locale-aware routing (`pt-BR`, `en-GB`, `es`)
- Command palette + global search
- Reading telemetry for case studies (view, depth, completion, sections, outbound clicks)
- Metrics dashboard with PostHog live query + safe fallback
- Bundle budget gates in CI
- OG image generation route

## Tech stack

- Next.js (App Router + Pages Router in migration)
- React + TypeScript
- Tailwind CSS
- next-themes
- Fuse.js + cmdk
- Vercel Analytics
- PostHog
- Vitest

## Local development

```bash
npm install
npm run dev
```

Validation commands:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run check:bundle
npm run check:bundle:case
```

## Contact

- LinkedIn: https://www.linkedin.com/in/jrvalerio/
- GitHub: https://github.com/JrValerio
- Email: amarovsjr81@gmail.com

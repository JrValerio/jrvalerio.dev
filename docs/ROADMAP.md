# Portfolio Roadmap

## v1.1 - Production Hardening (Completed)

Objective:
- Consolidate portfolio identity and stabilize production routing.

Delivered:
- Root redirect from `/` to `/v2`.
- Legacy experience available at `/legacy`.
- Canonical metadata for main v2 routes.
- Navigation cleaned to keep a single primary identity.
- Safe coexistence of Pages Router and App Router.

## v1.2 - Case Studies and Curation (Completed)

Objective:
- Turn the portfolio into an engineering narrative focused on high-signal projects.

Delivered:
- Home curated to 4 flagship projects.
- New archive route at `/v2/archive` for smaller and legacy work.
- Expanded case study structure on `/v2/projetos/[slug]`:
  - Challenge
  - Solution
  - Architecture
  - Key Features
  - Technical Challenges
  - Tech Stack
  - Impact

## v1.3 - Premium UX Layer (Planned)

Objective:
- Improve perceived quality with refined interaction and visual consistency.

Planned scope:
- Hero motion polish and micro-interactions.
- Timeline and section transition refinements.
- Subtle shader/noise background treatment.
- Consistent spacing and typography calibration.

## v1.4 - Performance and Scalability (Planned)

Objective:
- Keep production quality while reducing payload and improving runtime metrics.

Target:
- First Load JS under 100 kB for v2 routes.
- Lighthouse score 95+ on key pages.

Planned scope:
- Bundle analysis and dependency trimming.
- Lazy loading for non-critical UI sections.
- i18n split strategy for hybrid router setup.
- Additional media and image optimization.

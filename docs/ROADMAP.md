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

## v1.3 - Premium UX Layer (Completed)

Objective:
- Improve perceived quality with refined interaction and visual consistency.

Delivered:
- Hero motion polish with subtle hover interactions on primary links.
- Work section converted to a cleaner minimal list style.
- Case study metrics block rendered from structured domain data.
- EcoVoz architecture diagram added under `/public/diagrams`.
- Next Iteration section added to each case study page.
- About and Stack sections simplified for clearer scanning.

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

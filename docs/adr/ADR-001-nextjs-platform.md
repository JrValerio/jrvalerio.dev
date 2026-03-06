# ADR-001 - Next.js as the portfolio platform

Status: Accepted  
Date: 2026-03-06

## Context

The portfolio requires:
- SEO-friendly rendering
- Route-level metadata support
- Fast navigation and static generation where possible
- Incremental migration from a legacy pages-based structure

## Decision

Use Next.js as the primary framework, with `app` routes as the main V2 experience and temporary hybrid coexistence with `pages`.

## Alternatives considered

### Vite + React SPA
Pros:
- Simpler runtime model
- Fast local dev loop

Cons:
- Weaker native SEO and metadata workflow
- More manual routing/documentation scaffolding

### Astro
Pros:
- Excellent static performance baseline

Cons:
- Lower flexibility for current React-heavy interactive flows
- Higher migration overhead from existing Next code

## Consequences

Positive:
- Strong SEO path with metadata/OG primitives
- Good fit for docs-like route architecture
- Easy deployment pipeline

Negative:
- Temporary hybrid complexity (`pages` + `app`)
- Known i18n warning in App Router while migration remains partial

## Notes

This decision prioritizes delivery continuity and controlled migration risk.

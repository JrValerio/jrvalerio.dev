# ADR-004 - Locale-aware routing strategy

Status: Accepted  
Date: 2026-03-06

## Context

The portfolio targets both local and international audiences.
The system needed:
- explicit locale routes
- automatic locale detection
- consistent links between localized and default V2 routes

## Decision

Use middleware-driven locale resolution with canonical segments:
- `pt-BR` -> `pt-br`
- `en-GB` -> `en-gb`
- `es` -> `es-intl`

Routing behavior:
- `/v2` remains default unprefixed experience
- localized experience lives in `/{segment}/v2/*`
- middleware reads cookie first, then `Accept-Language`

## Alternatives considered

### Single-language experience
Pros:
- Lowest maintenance

Cons:
- Lower international reach and weaker recruiter UX outside default locale

### Auto-translation only
Pros:
- Faster initial rollout

Cons:
- Inconsistent terminology and lower translation quality for technical text

## Consequences

Positive:
- Predictable localized URLs
- Better international UX and SEO alternates
- Clear contract for navigation and switcher logic

Negative:
- Extra maintenance for localized copy
- Added middleware and route complexity

## Notes

Current setup is intentionally compatible with hybrid router migration while preserving stable public URLs.

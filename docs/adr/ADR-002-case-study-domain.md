# ADR-002 - Typed case-study domain model

Status: Accepted  
Date: 2026-03-06

## Context

Simple project-card portfolios do not communicate engineering depth or product reasoning.
The portfolio needed a consistent structure to present technical narratives.

## Decision

Adopt a typed domain model in `src/data/projects.ts` and render each flagship project as a structured case study.

Standardized sections:
- Challenge
- Solution
- Architecture
- Key Features
- Technical Challenges
- Impact
- Next Iteration
- Lessons Learned

## Alternatives considered

### Flat project list with repository links
Pros:
- Minimal implementation effort

Cons:
- Low storytelling value
- Weak architecture signal

### Free-form markdown posts per project
Pros:
- Flexible authoring

Cons:
- Inconsistent structure between projects
- Harder to compare projects quickly

## Consequences

Positive:
- Consistent technical narrative across projects
- Reusable UI/route composition
- Better input quality for telemetry and metrics

Negative:
- Higher content maintenance effort
- Requires domain tests and stricter data discipline

## Notes

Domain tests in `src/data/projects.test.ts` enforce slug uniqueness, ordering, and required fields.

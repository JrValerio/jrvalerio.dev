# C4 Level 1 - System Context

## Purpose

`jrvalerio.dev` is a public engineering portfolio focused on case studies, architecture documentation, and measurable product signals.

## Primary actors

- Visitor: explores projects and documentation.
- Recruiter: evaluates technical maturity and impact.
- Engineer/Tech Lead: reviews architecture decisions and trade-offs.

## External systems

- GitHub: source links for projects and repository history.
- LinkedIn: professional profile and contact channel.
- Email provider: direct contact from CTA flows.
- Analytics providers:
  - Vercel Analytics
  - PostHog (optional, for live metrics dashboard)

## Context diagram (text)

```text
Visitor / Recruiter / Engineer
            |
            v
       jrvalerio.dev
            |
   +--------+-------------------------+
   |        |                         |
   v        v                         v
GitHub   LinkedIn                Analytics stack
                                   (Vercel + PostHog)
```

## Core system outcome

The system should communicate engineering quality quickly and generate measurable interaction signals for continuous improvement.

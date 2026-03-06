# C4 Level 3 - Component Diagram

## Major components

### Layout and shell
- `src/features/v2/layout-shell.tsx`
- `src/app/v2/layout.tsx`
- `src/app/[locale]/v2/layout.tsx`

Responsibilities:
- Navigation, locale switcher, theme toggle, command palette integration.

### Navigation and discovery
- `src/components/UI/CommandPalette.tsx`
- `src/data/searchIndex.ts`

Responsibilities:
- Keyboard-first navigation and fuzzy search over pages/projects.

### Content presentation
- `src/components/Hero.tsx`
- `src/components/Work.tsx`
- `src/components/ProjectCard.tsx`
- `src/features/v2/project-detail-content.tsx`

Responsibilities:
- Main narrative flow and case study rendering.

### Case-study experience
- `ProjectMeta`
- `ProjectTimeline`
- `ReadingProgressBar`
- `CaseStudySectionNav`

Responsibilities:
- Structured technical reading experience.

### Telemetry components
- `CaseStudyViewTracker`
- `CaseStudyReadingTracker`
- `CaseStudySectionTracker`
- `ProjectOutboundLinks` (evented links)

Responsibilities:
- Collect reading and engagement events.

### Metrics and observability
- `src/features/v2/metrics-content.tsx`
- `src/lib/case-study-dashboard.ts`

Responsibilities:
- Show quality gates and live/fallback telemetry summary.

## Component flow (case study)

```text
Project route
  -> project-detail-content
    -> meta/timeline/sections
    -> tracking components
      -> analytics adapter
        -> providers
```

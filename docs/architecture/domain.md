# C4 Level 4 - Domain and Code Model

## Core domain object

The portfolio is centered around a typed `Project` model (see `src/data/projects.ts`).

Representative fields:

```ts
type Project = {
  slug: string;
  title: string;
  year: number;
  updatedAt: Date;
  category: ProjectCategory;
  role: string;
  status: ProjectStatus;
  summary: string;
  challenge: string;
  solution: string;
  architecture: { layer: string; detail: string }[];
  keyFeatures: string[];
  technicalChallenges: string[];
  nextIteration: string[];
  lessonsLearned: string[];
  impact: string;
  highlights: string[];
};
```

## Why this model exists

- Guarantees consistent case study structure.
- Decouples UI rendering from raw content storage.
- Supports domain tests (`src/data/projects.test.ts`).
- Enables telemetry tagging by `project_slug` and `project_category`.

## Reading telemetry flow

```text
case_view
  -> case_read_start
  -> case_read_depth (milestones)
  -> case_read_complete
  -> case_outbound_click (repo/live)
```

## Output surfaces driven by the same domain

- Home featured work
- Projects index
- Dynamic case study route
- Localized routes
- Metrics dashboard labels

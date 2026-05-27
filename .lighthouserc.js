/**
 * Lighthouse CI configuration — portfolio-jrvalerio
 *
 * Strategy: Option B (local build).
 *   The CI job runs `npm run build` then starts the production server via
 *   `npm run start`. LHCI audits the running server and asserts scores.
 *
 * Thresholds rationale:
 *   - Performance: warn-only at 0.85 — WebGL background adds real cost and is
 *     intentional. Blocking PRs here would penalise the design rather than bugs.
 *   - Accessibility: error at 0.95 — EcoVoz (a11y project) is the flagship case
 *     study; regressions here are high-signal.
 *   - SEO: error at 0.95 — generateMetadata + OG images are a key portfolio
 *     signal. Below 0.95 always indicates a regression.
 *   - Best Practices: error at 0.90 — reasonable floor; HTTPS in CI may cap at
 *     0.96 due to localhost, so 0.90 avoids false failures.
 *
 * See ADR-006-testing-strategy.mdx for the full decision record.
 */

module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/v2"],
      startServerCommand: "npm run start",
      // Next.js 15 outputs "✓ Ready in Xms" — match on "Ready in" which is
      // stable across patch versions. Alternative: "Local:.*3000".
      startServerReadyPattern: "Ready in",
      startServerReadyTimeout: 60000,
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.85 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};

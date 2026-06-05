import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// axe-core rules that are intentionally relaxed for this project:
// - "color-contrast": skipped — custom CSS variables require a real browser paint to
//   evaluate correctly; local axe often false-positive on --jr-muted against backgrounds.
// - "landmark-unique": skipped — Next.js App Router may render duplicate <main> during
//   route transitions; this is benign.
const DISABLED_RULES = ["color-contrast", "landmark-unique"];

test.describe("Accessibility (axe-core)", () => {
  test("every page has exactly one h1", async ({ page }) => {
    const routes = [
      "/v2",
      "/v2/projetos",
      "/v2/architecture",
      "/v2/engineering",
      "/v2/metrics",
      "/v2/principles",
      "/v2/sobre",
      "/v2/contato",
      "/v2/archive",
      "/en-gb/v2",
      "/en-gb/v2/projetos",
      "/en-gb/v2/architecture",
      "/es-intl/v2/projetos",
    ];

    for (const route of routes) {
      await page.goto(route, { waitUntil: "networkidle" });
      const h1Count = await page.locator("h1").count();

      expect(h1Count, `Route ${route} should have exactly one h1`).toBe(1);
    }
  });

  test("home page has no critical a11y violations", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      .disableRules(DISABLED_RULES)
      .analyze();

    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(
      critical,
      `Critical violations: ${critical.map((v) => `${v.id} — ${v.description}`).join("; ")}`,
    ).toHaveLength(0);
  });

  test("projects listing page has no critical a11y violations", async ({ page }) => {
    await page.goto("/v2/projetos", { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      .disableRules(DISABLED_RULES)
      .analyze();

    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(
      critical,
      `Critical violations: ${critical.map((v) => `${v.id} — ${v.description}`).join("; ")}`,
    ).toHaveLength(0);
  });

  test("EcoVoz case study (flagship a11y project) has no serious violations", async ({
    page,
  }) => {
    await page.goto("/v2/projetos/ecovoz", { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      .disableRules(DISABLED_RULES)
      .analyze();

    // For the flagship accessibility case study, also assert no serious violations
    const serious = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(
      serious,
      `Serious violations on EcoVoz: ${serious.map((v) => `${v.id}`).join(", ")}`,
    ).toHaveLength(0);
  });

  test("engineering ADR page has no critical violations", async ({ page }) => {
    await page.goto("/v2/engineering", { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      .disableRules(DISABLED_RULES)
      .analyze();

    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical).toHaveLength(0);
  });
});

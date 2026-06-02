import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// axe-core rules that are intentionally relaxed for this project:
// - "color-contrast": skipped — custom CSS variables require a real browser paint to
//   evaluate correctly; local axe often false-positive on --jr-muted against backgrounds.
// - "landmark-unique": skipped — Next.js App Router may render duplicate <main> during
//   route transitions; this is benign.
const DISABLED_RULES = ["color-contrast", "landmark-unique"];

test.describe("Accessibility (axe-core)", () => {
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

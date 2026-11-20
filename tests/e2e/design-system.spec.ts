import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// The redesign tokens are plain colours, so colour-contrast stays ON here,
// unlike the legacy pages in accessibility.spec.ts.
test.describe("Design system preview", () => {
  test("has no axe violations in either theme, contrast included", async ({ page }) => {
    await page.goto("/design-system", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("[data-jv-theme]")).toHaveCount(2);

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });

  test("project filter tabs work from the keyboard", async ({ page }) => {
    await page.goto("/design-system", { waitUntil: "networkidle" });
    const dark = page.locator('[data-jv-theme="dark"]');
    const firstTab = dark.getByRole("tab", { name: "Todos" });

    await firstTab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(dark.getByRole("tab", { name: "Agentes" })).toBeFocused();
    await expect(dark.getByRole("tab", { name: "Agentes" })).toHaveAttribute("aria-selected", "true");
    await expect(dark.getByRole("tabpanel")).toContainText("Agente DEV");
  });

  test("is excluded from indexing", async ({ page }) => {
    await page.goto("/design-system");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});

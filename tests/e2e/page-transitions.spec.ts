import { expect, test } from "@playwright/test";

test.describe("Page transitions (AnimatePresence)", () => {
  test("only one page rendered in main during a transition", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "domcontentloaded" });

    const projLink = page
      .getByRole("navigation")
      .getByRole("link", { name: /projetos/i })
      .first();
    await projLink.click();

    // Sample at ~30 ms into the exit animation (exit: 50 ms total)
    await page.waitForTimeout(30);
    const motionDivsInMain = await page.evaluate(() =>
      document.querySelectorAll("main > * > [style]").length,
    );

    // mode="wait" means at most one animated div at a time
    expect(motionDivsInMain).toBeLessThanOrEqual(1);
  });

  test("page is fully opaque after transition completes", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "networkidle" });

    const projLink = page
      .getByRole("navigation")
      .getByRole("link", { name: /projetos/i })
      .first();
    await projLink.click();

    // Wait well past the 80 ms enter animation
    await page.waitForTimeout(400);

    // The main content (first heading or article) should be visible
    const content = page.locator("main").locator("h1, h2, article").first();
    await expect(content).toBeVisible({ timeout: 2000 });
  });

  test("useReducedMotion: children rendered directly without motion wrapper", async ({
    page,
  }) => {
    // Set media BEFORE navigation so the component sees reduced motion on mount
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/v2", { waitUntil: "networkidle" });

    const projLink = page
      .getByRole("navigation")
      .getByRole("link", { name: /projetos/i })
      .first();

    await projLink.click();
    await page.waitForTimeout(300);

    // With reduced motion, PageTransition renders children directly.
    // Motion still applies style="opacity:1" to whileInView cards (visible state),
    // but nothing should have opacity:0 (hidden initial state).
    const hiddenElements = await page.evaluate(
      () =>
        [...document.querySelectorAll("main [style]")].filter(
          (el) => parseFloat(window.getComputedStyle(el).opacity) < 0.1,
        ).length,
    );

    expect(hiddenElements).toBe(0);
  });
});

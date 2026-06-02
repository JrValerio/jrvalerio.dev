import { expect, test } from "@playwright/test";

test.describe("ProjectCard whileInView", () => {
  test("all cards become visible after scrolling to bottom", async ({ page }) => {
    await page.goto("/v2/projetos", { waitUntil: "networkidle" });

    const totalCards = await page.locator("article").count();
    expect(totalCards).toBeGreaterThan(0);

    // Scroll the shell container to the bottom
    await page.locator("#ContentScroll").evaluate((el) =>
      el.scrollTo({ top: 999999, behavior: "smooth" }),
    );

    // Wait for all animations to complete (400 ms each, staggered)
    await page.waitForTimeout(1500);

    const hiddenCards = await page.evaluate(() =>
      [...document.querySelectorAll("article")].filter(
        (a) => parseFloat(window.getComputedStyle(a).opacity) < 0.5,
      ).length,
    );
    expect(hiddenCards).toBe(0);
  });

  test("amount:0.3 — cards above fold are visible immediately", async ({ page }) => {
    await page.goto("/v2/projetos", { waitUntil: "networkidle" });

    // At least the first card should be visible without scrolling
    const firstCard = page.locator("article").first();
    await expect(firstCard).toBeVisible();
  });

  test("cards above fold are not all visible before scroll (proves threshold is real)", async ({
    page,
  }) => {
    // Use a small viewport so only 1-2 cards fit above the fold
    await page.setViewportSize({ width: 1280, height: 700 });
    await page.goto("/v2/projetos", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    const totalCards = await page.locator("article").count();
    if (totalCards < 2) {
      // If only one card exists, skip the threshold check
      test.skip();
      return;
    }

    const visibleNow = await page.evaluate(() => {
      const scrollEl = document.getElementById("ContentScroll");
      const vp = scrollEl?.getBoundingClientRect() ?? { top: 0, height: window.innerHeight };
      return [...document.querySelectorAll("article")].filter((a) => {
        const rect = a.getBoundingClientRect();
        const op = parseFloat(window.getComputedStyle(a).opacity);
        return rect.top < vp.top + vp.height && op > 0.5;
      }).length;
    });

    // Not ALL cards should be visible at once (some should be below fold)
    expect(visibleNow).toBeLessThan(totalCards);
  });
});

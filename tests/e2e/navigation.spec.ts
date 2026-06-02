import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("nav links route to correct pages", async ({ page }) => {
    await page.goto("/v2");

    const routes = [
      { label: /projetos/i, expectedPath: "/projetos" },
      { label: /sobre/i, expectedPath: "/sobre" },
      { label: /contato/i, expectedPath: "/contato" },
    ];

    for (const { label, expectedPath } of routes) {
      const link = page.getByRole("navigation").getByRole("link", { name: label }).first();
      await link.click();
      await page.waitForURL(`**${expectedPath}`);
      expect(page.url()).toContain(expectedPath);
    }
  });

  test("browser back button restores previous page and scroll", async ({ page }) => {
    await page.goto("/v2/projetos", { waitUntil: "networkidle" });

    const sobreLink = page.getByRole("navigation").getByRole("link", { name: /sobre/i }).first();
    await sobreLink.click();
    await page.waitForURL("**/sobre");

    await page.goBack();
    await page.waitForURL("**/projetos");
    expect(page.url()).toContain("projetos");

    // Scroll position should be near top (shell container resets on route change)
    const scrollTop = await page.evaluate(() => {
      return document.getElementById("ContentScroll")?.scrollTop ?? window.scrollY;
    });
    expect(scrollTop).toBeLessThan(200);
  });

  test("hard refresh on a non-home route retains content", async ({ page }) => {
    await page.goto("/v2/projetos", { waitUntil: "networkidle" });
    await page.reload({ waitUntil: "networkidle" });

    expect(page.url()).toContain("projetos");
    const cards = page.locator("article");
    await expect(cards.first()).toBeVisible();
  });

  test("404 on unknown route shows not-found page", async ({ page }) => {
    const response = await page.goto("/v2/rota-que-nao-existe");
    // Next.js returns 404 for unknown routes
    expect(response?.status()).toBe(404);
  });
});

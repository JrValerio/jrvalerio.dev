import { expect, test } from "@playwright/test";

// The mobile nav hamburger is lg:hidden — not visible at default 1280px viewport.
// Tests use the custom event (jr:open-command-palette) which is also how the
// keyboard shortcut trigger works in production (Ctrl+K dispatches this event).

test.describe("Command palette", () => {
  test("opens via jr:open-command-palette custom event", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "networkidle" });

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("jr:open-command-palette"));
    });

    // cmdk renders the palette as role=dialog
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 3000 });
  });

  test("Escape closes the palette", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "networkidle" });

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("jr:open-command-palette"));
    });

    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 3000 });

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 2000 });
  });

  test("typing a query produces results", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "networkidle" });

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("jr:open-command-palette"));
    });

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 3000 });

    await page.keyboard.type("projetos");

    const items = dialog.getByRole("option");
    await expect(items.first()).toBeVisible({ timeout: 2000 });
  });

  test("mobile: search button opens palette on small viewport", async ({ page }) => {
    // Use a viewport below lg breakpoint (1024 px) so the mobile nav is visible
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/v2", { waitUntil: "networkidle" });

    // Open mobile menu
    const menuButton = page.getByRole("button", { name: /abrir menu|open menu/i });
    await expect(menuButton).toBeVisible({ timeout: 5000 });
    await menuButton.click();

    // Click the search button inside the mobile panel
    const searchButton = page.getByRole("button", { name: /buscar|search/i }).first();
    await expect(searchButton).toBeVisible({ timeout: 3000 });
    await searchButton.click();

    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 3000 });
  });
});

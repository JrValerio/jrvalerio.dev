import { expect, test } from "@playwright/test";

// ThemeProvider uses attribute="class" — dark mode adds "dark" to <html>.
// ThemeSwitcher uses <label><input type="radio"><span>Light/Dark</span></label>,
// so we target with getByLabel (not getByRole button).
test.describe("Theme toggle", () => {
  test("starts in light mode when system preference is light", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/v2", { waitUntil: "networkidle" });

    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    expect(isDark).toBe(false);
  });

  test("toggling to Dark adds 'dark' class to <html>", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "networkidle" });

    // getByLabel matches <input> inside a <label> whose text is "Dark" (or "Escuro")
    const darkInput = page.getByLabel(/^(dark|escuro)$/i).first();
    await darkInput.click();
    await page.waitForTimeout(300);

    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    expect(isDark).toBe(true);
  });

  test("toggling back to Light removes 'dark' class", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "networkidle" });

    const darkInput = page.getByLabel(/^(dark|escuro)$/i).first();
    await darkInput.click();
    await page.waitForTimeout(300);

    const lightInput = page.getByLabel(/^(light|claro)$/i).first();
    await lightInput.click();
    await page.waitForTimeout(300);

    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    expect(isDark).toBe(false);
  });

  test("dark theme persists after hard refresh (localStorage)", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "networkidle" });

    const darkInput = page.getByLabel(/^(dark|escuro)$/i).first();
    await darkInput.click();
    await page.waitForTimeout(300);

    await page.reload({ waitUntil: "networkidle" });

    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    expect(isDark).toBe(true);
  });
});

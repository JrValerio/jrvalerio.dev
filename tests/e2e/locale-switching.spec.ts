import { expect, test } from "@playwright/test";

// Locale option labels as rendered by LateralControls
const LOCALE_LABELS = {
  "en-GB": "EN-GB",
  es: "ES",       // v2.ts options: { es: "ES" } — not "ES-INTL"
  "pt-BR": "PT-BR",
} as const;

// URL segments for each locale
const LOCALE_SEGMENTS = {
  "en-GB": "/en-gb",
  es: "/es-intl",
  "pt-BR": "",
} as const;

test.describe("Locale switching", () => {
  test("switching to EN-GB navigates to /en-gb/v2", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "networkidle" });

    const enButton = page.getByRole("button", { name: LOCALE_LABELS["en-GB"] });
    await enButton.click();

    await page.waitForURL("**/en-gb/v2**");
    expect(page.url()).toContain("/en-gb/v2");
  });

  test("/en-gb/v2 renders page content in English", async ({ page }) => {
    await page.goto("/en-gb/v2", { waitUntil: "networkidle" });

    // The EN-GB locale button should be in pressed state
    const enButton = page.getByRole("button", { name: LOCALE_LABELS["en-GB"] });
    await expect(enButton).toHaveAttribute("aria-pressed", "true");
  });

  test("switching to ES-INTL navigates to /es-intl/v2", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "networkidle" });

    const esButton = page.getByRole("button", { name: LOCALE_LABELS.es });
    await esButton.click();

    await page.waitForURL("**/es-intl/v2**");
    expect(page.url()).toContain("/es-intl/v2");
  });

  test("switching back to PT-BR from EN-GB navigates to /v2", async ({ page }) => {
    await page.goto("/en-gb/v2", { waitUntil: "networkidle" });

    const ptButton = page.getByRole("button", { name: LOCALE_LABELS["pt-BR"] });
    await ptButton.click();

    await page.waitForURL("**/v2");
    // pt-BR has no prefix segment — URL should be just /v2 (no /pt-br/)
    expect(page.url()).not.toContain("/pt-br");
    expect(page.url()).toMatch(/\/v2$/);
  });

  test("locale segments resolve to correct page (no 404)", async ({ page }) => {
    const localeRoutes = ["/v2", "/en-gb/v2", "/es-intl/v2"];

    for (const route of localeRoutes) {
      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.status(), `Expected 200 for ${route}`).toBe(200);
    }
  });
});

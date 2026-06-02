import { expect, test } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/v2/contato");
  });

  test("renders form fields and submit button", async ({ page }) => {
    await expect(page.locator("#cf-name")).toBeVisible();
    await expect(page.locator("#cf-email")).toBeVisible();
    await expect(page.locator("#cf-message")).toBeVisible();
    await expect(page.getByRole("button", { name: /enviar mensagem/i })).toBeVisible();
  });

  test("honeypot field is present but hidden", async ({ page }) => {
    const honeypot = page.locator('input[name="website_url_secondary"]');
    await expect(honeypot).toBeAttached();
    // Must not be interactable / visible to the user
    await expect(honeypot).not.toBeVisible();
  });

  test("shows inline error when name is empty", async ({ page }) => {
    await page.locator("#cf-email").fill("valid@example.com");
    await page.locator("#cf-message").fill("Mensagem de teste com mais de dez caracteres.");
    await page.getByRole("button", { name: /enviar mensagem/i }).click();

    await expect(page.locator("#cf-name-error")).toBeVisible();
    await expect(page.locator("#cf-name-error")).toContainText(/obrigatório/i);
  });

  test("shows inline error for invalid email", async ({ page }) => {
    await page.locator("#cf-name").fill("Teste");
    await page.locator("#cf-email").fill("not-an-email");
    await page.locator("#cf-message").fill("Mensagem de teste com mais de dez caracteres.");
    await page.getByRole("button", { name: /enviar mensagem/i }).click();

    await expect(page.locator("#cf-email-error")).toBeVisible();
    await expect(page.locator("#cf-email-error")).toContainText(/inválido/i);
  });

  test("shows inline error when message is too short", async ({ page }) => {
    await page.locator("#cf-name").fill("Teste");
    await page.locator("#cf-email").fill("valid@example.com");
    await page.locator("#cf-message").fill("Curta");
    await page.getByRole("button", { name: /enviar mensagem/i }).click();

    await expect(page.locator("#cf-message-error")).toBeVisible();
    await expect(page.locator("#cf-message-error")).toContainText(/mínimo/i);
  });

  test("honeypot filled — form silently ignores submission (no success shown)", async ({
    page,
  }) => {
    await page.locator("#cf-name").fill("Bot Name");
    await page.locator("#cf-email").fill("bot@spam.com");
    await page.locator("#cf-message").fill("Esta é uma mensagem de spam longa o suficiente.");
    // Fill honeypot directly via JS (a real user would never do this)
    await page.evaluate(() => {
      const hp = document.querySelector<HTMLInputElement>('input[name="website_url_secondary"]');
      if (hp) hp.value = "acme corp";
    });
    await page.getByRole("button", { name: /enviar mensagem/i }).click();

    // Should not show success state
    await expect(page.getByRole("status")).not.toBeVisible();
    // Should not show any error either (silent rejection)
    await expect(page.locator("#cf-name-error")).not.toBeVisible();
  });

  test("happy path — valid submission shows success message", async ({ page }) => {
    await page.locator("#cf-name").fill("Recrutador Teste");
    await page.locator("#cf-email").fill("recruiter@example.com");
    await page.locator("#cf-message").fill(
      "Olá, vi seu portfólio e gostaria de conversar sobre uma oportunidade."
    );
    await page.getByRole("button", { name: /enviar mensagem/i }).click();

    // Success state replaces the form
    await expect(page.getByRole("status")).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("status")).toContainText(/enviada/i);
    // Form fields should no longer be visible
    await expect(page.locator("#cf-name")).not.toBeVisible();
  });
});

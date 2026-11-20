import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Home (redesign)", () => {
  for (const scheme of ["light", "dark"] as const) {
    test(`has no axe violations in ${scheme} mode, contrast included`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto("/v2", { waitUntil: "networkidle" });
      await expect(page.locator("html")).toHaveClass(scheme === "dark" ? /dark/ : /^(?!.*dark).*$/);

      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  }

  test("renders the hero with real numbers in the server HTML", async ({ request }) => {
    const html = await (await request.get("/v2")).text();
    expect(html).toContain("Amaro");
    expect(html).toContain("JRVALERIO");
    expect(html).toMatch(/Anos programando/);
    expect(html).toMatch(/PRs entregues pelo Agente DEV/);
  });

  test("filters projects by kind", async ({ page }) => {
    await page.goto("/v2#projetos", { waitUntil: "networkidle" });
    const projects = page.locator("#projetos");
    await expect(projects.getByRole("tabpanel").getByRole("listitem").filter({ has: page.locator("article") })).toHaveCount(7);

    await projects.getByRole("tab", { name: "Agentes" }).click();
    const agents = projects.getByRole("tabpanel").locator("article");
    await expect(agents).toHaveCount(3);
    await expect(agents.first()).toContainText("Agente DEV");
  });

  test("serves the English home on /en-gb/v2", async ({ page }) => {
    await page.goto("/en-gb/v2", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Amaro");
    await expect(page.getByRole("navigation", { name: "Sections" })).toBeVisible();
    await expect(page.getByText("Years coding")).toBeVisible();
  });

  test("contact form submits", async ({ page }) => {
    await page.goto("/v2#contato", { waitUntil: "networkidle" });
    await page.getByLabel("Nome").fill("Maria");
    await page.getByLabel("E-mail", { exact: true }).fill("maria@example.com");
    await page.getByLabel("Mensagem").fill("Quero conversar sobre um projeto.");
    await page.getByRole("button", { name: "Enviar mensagem" }).click();
    await expect(page.getByRole("status")).toContainText("Mensagem enviada");
  });
});

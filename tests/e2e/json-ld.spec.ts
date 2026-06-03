import { expect, test, type Page } from "@playwright/test";

async function getJsonLdBlocks(page: Page) {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  return scripts.map((script) => JSON.parse(script) as Record<string, unknown>);
}

function getJsonLdTypes(blocks: Array<Record<string, unknown>>) {
  return blocks.map((block) => block["@type"]);
}

test.describe("JSON-LD structured data", () => {
  test("home page has Person schema", async ({ page }) => {
    await page.goto("/v2");

    const blocks = await getJsonLdBlocks(page);
    const person = blocks.find((block) => block["@type"] === "Person");

    expect(person).toBeTruthy();
    expect(person?.name).toBeTruthy();
    expect(person?.url).toBeTruthy();
  });

  test("project case study has CreativeWork schema", async ({ page }) => {
    await page.goto("/v2/projetos/ecovoz");

    const types = getJsonLdTypes(await getJsonLdBlocks(page));

    expect(types).toContain("Person");
    expect(types).toContain("CreativeWork");
  });

  test("engineering ADR page has TechArticle schema", async ({ page }) => {
    await page.goto("/v2/engineering/ADR-004-animation-library");

    const types = getJsonLdTypes(await getJsonLdBlocks(page));

    expect(types).toContain("Person");
    expect(types).toContain("TechArticle");
  });

  test("localized routes inherit Person and add specific schema", async ({ page }) => {
    await page.goto("/en-gb/v2/projetos/ecovoz");

    const types = getJsonLdTypes(await getJsonLdBlocks(page));

    expect(types).toContain("Person");
    expect(types).toContain("CreativeWork");
  });

  test("all JSON-LD blocks are valid JSON", async ({ page }) => {
    const routes = [
      "/v2",
      "/v2/projetos/ecovoz",
      "/v2/engineering/ADR-004-animation-library",
    ];

    for (const route of routes) {
      await page.goto(route);
      const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();

      for (const script of scripts) {
        expect(() => JSON.parse(script), `Invalid JSON in ${route}`).not.toThrow();
      }
    }
  });
});

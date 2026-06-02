import { expect, test } from "@playwright/test";

test.describe("API routes and metadata", () => {
  test("GET /sitemap.xml returns valid XML with v2 URLs", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const contentType = response.headers()["content-type"] ?? "";
    expect(contentType).toMatch(/xml/);

    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("/v2");
  });

  test("GET /robots.txt returns valid robots directives", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toMatch(/User-agent/i);
    // Should not disallow everything (that would break SEO)
    expect(body).not.toBe("User-agent: *\nDisallow: /\n");
  });

  test("GET /api/og returns an image for the default title", async ({ request }) => {
    const response = await request.get("/api/og?title=Test&subtitle=Portfolio");
    expect(response.status()).toBe(200);

    const contentType = response.headers()["content-type"] ?? "";
    expect(contentType).toMatch(/image/);
  });

  test("home page has canonical and OG meta tags", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "networkidle" });

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBeTruthy();
    expect(canonical).toContain("/v2");

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    expect(ogTitle).toBeTruthy();

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toBeTruthy();
  });

  test("home page has correct hreflang alternates", async ({ page }) => {
    // /v2 explicitly sets getLanguageAlternates("/v2") — check there, not /projetos
    await page.goto("/v2", { waitUntil: "networkidle" });

    const hreflangLinks = page.locator('link[rel="alternate"][hreflang]');
    const count = await hreflangLinks.count();
    expect(count).toBeGreaterThan(0);

    // Should include pt-BR, en-GB, and x-default at minimum
    const hreflangs = await hreflangLinks.evaluateAll((links) =>
      links.map((l) => (l as HTMLLinkElement).hreflang),
    );
    expect(hreflangs).toContain("x-default");
  });
});

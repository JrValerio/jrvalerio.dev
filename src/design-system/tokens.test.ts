import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { contrastRatio, parseHex, relativeLuminance } from "./contrast";
import { palette, textPairs, themeRoles, themes, tokensStylesheet } from "./tokens";

const hex = fc
  .tuple(fc.integer({ min: 0, max: 255 }), fc.integer({ min: 0, max: 255 }), fc.integer({ min: 0, max: 255 }))
  .map(([r, g, b]) => `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`);

describe("contrastRatio", () => {
  it("is symmetric and bounded between 1 and 21", () => {
    fc.assert(
      fc.property(hex, hex, (a, b) => {
        const ratio = contrastRatio(a, b);
        expect(ratio).toBeCloseTo(contrastRatio(b, a), 10);
        expect(ratio).toBeGreaterThanOrEqual(1);
        expect(ratio).toBeLessThanOrEqual(21.0000001);
      }),
    );
  });

  it("is 1 for identical colours", () => {
    fc.assert(
      fc.property(hex, (a) => {
        expect(contrastRatio(a, a)).toBeCloseTo(1, 10);
      }),
    );
  });

  it("matches the WCAG reference values", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 5);
    expect(relativeLuminance("#FFFFFF")).toBeCloseTo(1, 10);
    expect(() => parseHex("rgba(0,0,0,1)")).toThrow();
  });
});

describe("theme tokens", () => {
  it.each(Object.keys(themes) as Array<keyof typeof themes>)(
    "%s theme meets WCAG AA (4.5:1) for every text pair in use",
    (name) => {
      const theme = themes[name];
      for (const pair of textPairs) {
        const ratio = contrastRatio(theme[pair.text], theme[pair.on]);
        expect(ratio, `${name}: ${pair.text} on ${pair.on} (${pair.usage})`).toBeGreaterThanOrEqual(4.5);
      }
    },
  );

  it("builds every solid role from the chosen palette", () => {
    const allowed = new Set<string>(Object.values(palette));
    for (const theme of Object.values(themes)) {
      for (const role of themeRoles) {
        const value = theme[role];
        if (value.startsWith("#")) expect(allowed.has(value), `${role} ${value}`).toBe(true);
      }
    }
  });

  it("emits a custom property per role for both themes", () => {
    const css = tokensStylesheet();
    expect(css.match(/--jv-cta-bg:/g)).toHaveLength(3);
    for (const role of ["bg", "fg", "muted", "accent", "word", "on-accent"]) {
      expect(css).toContain(`--jv-${role}:`);
    }
    expect(css).toContain(`.dark .jv`);
  });
});

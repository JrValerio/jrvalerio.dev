import { describe, expect, it } from "vitest";
import {
  DEFAULT_V2_LOCALE,
  getLanguageAlternates,
  getLocaleFromSegment,
  getSegmentFromLocale,
  isLocale,
  isLocaleSegment,
  resolveLocale,
  resolveLocaleFromAcceptLanguage,
} from "./routing";

describe("isLocale", () => {
  it.each(["pt-BR", "en-GB", "es"])("returns true for valid locale %s", (locale) => {
    expect(isLocale(locale)).toBe(true);
  });

  it.each(["pt-br", "en-gb", "es-intl", "fr", ""])("returns false for non-locale %s", (value) => {
    expect(isLocale(value)).toBe(false);
  });
});

describe("isLocaleSegment", () => {
  it.each(["pt-br", "en-gb", "es-intl"])("returns true for valid segment %s", (seg) => {
    expect(isLocaleSegment(seg)).toBe(true);
  });

  it("returns false for locale that is not a segment", () => {
    expect(isLocaleSegment("pt-BR")).toBe(false);
  });
});

describe("getLocaleFromSegment", () => {
  it.each([
    ["pt-br", "pt-BR"],
    ["en-gb", "en-GB"],
    ["es-intl", "es"],
  ] as const)("maps segment '%s' → locale '%s'", (seg, locale) => {
    expect(getLocaleFromSegment(seg)).toBe(locale);
  });

  it("returns null for an unknown segment", () => {
    expect(getLocaleFromSegment("fr")).toBeNull();
  });
});

describe("getSegmentFromLocale", () => {
  it.each([
    ["pt-BR", "pt-br"],
    ["en-GB", "en-gb"],
    ["es", "es-intl"],
  ] as const)("maps locale '%s' → segment '%s'", (locale, seg) => {
    expect(getSegmentFromLocale(locale)).toBe(seg);
  });
});

describe("resolveLocale — null / empty input", () => {
  it("returns null for null", () => expect(resolveLocale(null)).toBeNull());
  it("returns null for undefined", () => expect(resolveLocale(undefined)).toBeNull());
  it("returns null for empty string", () => expect(resolveLocale("")).toBeNull());
});

describe("resolveLocale — exact V2Locale passthrough", () => {
  it.each(["pt-BR", "en-GB", "es"] as const)("returns %s unchanged", (locale) => {
    expect(resolveLocale(locale)).toBe(locale);
  });
});

describe("resolveLocale — URL segments", () => {
  it.each([
    ["pt-br", "pt-BR"],
    ["en-gb", "en-GB"],
    ["es-intl", "es"],
  ] as const)("resolves segment '%s' → '%s'", (seg, locale) => {
    expect(resolveLocale(seg)).toBe(locale);
  });
});

describe("resolveLocale — locale aliases", () => {
  it.each([
    ["pt", "pt-BR"],
    ["pt-pt", "pt-BR"],
    ["en", "en-GB"],
    ["en-us", "en-GB"],
    ["en-ca", "en-GB"],
    ["en-au", "en-GB"],
    ["es-es", "es"],
    ["es-mx", "es"],
    ["es-419", "es"],
  ])("resolves alias '%s' → '%s'", (alias, expected) => {
    expect(resolveLocale(alias)).toBe(expected);
  });
});

describe("resolveLocale — language-prefix fallback", () => {
  it("falls back to pt-BR for unknown pt-XX variant", () => {
    expect(resolveLocale("pt-XX")).toBe("pt-BR");
  });

  it("returns null for an entirely unknown language", () => {
    expect(resolveLocale("fr")).toBeNull();
    expect(resolveLocale("zh-CN")).toBeNull();
    expect(resolveLocale("de")).toBeNull();
  });
});

describe("resolveLocale — input normalization", () => {
  it("normalizes underscore separators (Accept-Language style)", () => {
    expect(resolveLocale("en_US")).toBe("en-GB");
    expect(resolveLocale("pt_BR")).toBe("pt-BR");
  });

  it("normalizes uppercase input", () => {
    expect(resolveLocale("PT-BR")).toBe("pt-BR");
    expect(resolveLocale("EN-GB")).toBe("en-GB");
    expect(resolveLocale("ES")).toBe("es");
  });

  it("trims leading and trailing whitespace", () => {
    expect(resolveLocale("  en  ")).toBe("en-GB");
    expect(resolveLocale(" pt-BR ")).toBe("pt-BR");
  });
});

describe("resolveLocaleFromAcceptLanguage", () => {
  it("returns default locale for null", () => {
    expect(resolveLocaleFromAcceptLanguage(null)).toBe(DEFAULT_V2_LOCALE);
  });

  it("returns default locale for undefined", () => {
    expect(resolveLocaleFromAcceptLanguage(undefined)).toBe(DEFAULT_V2_LOCALE);
  });

  it("returns default locale for empty string", () => {
    expect(resolveLocaleFromAcceptLanguage("")).toBe(DEFAULT_V2_LOCALE);
  });

  it("resolves a single known language tag", () => {
    expect(resolveLocaleFromAcceptLanguage("en-GB")).toBe("en-GB");
    expect(resolveLocaleFromAcceptLanguage("es")).toBe("es");
  });

  it("skips unknown tags and picks the first known one by quality", () => {
    // fr is unknown; en-GB at q=0.9 is the first known tag
    expect(resolveLocaleFromAcceptLanguage("fr, en-GB;q=0.9, pt-BR;q=0.5")).toBe("en-GB");
  });

  it("resolves highest-quality tag when multiple are known", () => {
    // pt-BR (q=1.0 implicit) > en-GB (q=0.8)
    expect(resolveLocaleFromAcceptLanguage("pt-BR, en-GB;q=0.8")).toBe("pt-BR");
  });

  it("falls back to default when all tags are unknown", () => {
    expect(resolveLocaleFromAcceptLanguage("fr, de, zh")).toBe(DEFAULT_V2_LOCALE);
  });

  it("resolves aliases inside Accept-Language (e.g. en-US → en-GB)", () => {
    expect(resolveLocaleFromAcceptLanguage("en-US")).toBe("en-GB");
  });
});

describe("getLanguageAlternates", () => {
  it("generates correct hrefs for all locales", () => {
    const result = getLanguageAlternates("/about");
    expect(result["pt-BR"]).toBe("/about");
    expect(result["en-GB"]).toBe("/en-gb/about");
    expect(result["es"]).toBe("/es-intl/about");
    expect(result["x-default"]).toBe("/about");
  });

  it("adds a leading slash to paths that omit it", () => {
    const result = getLanguageAlternates("about");
    expect(result["pt-BR"]).toBe("/about");
    expect(result["en-GB"]).toBe("/en-gb/about");
  });

  it("handles root path", () => {
    const result = getLanguageAlternates("/");
    expect(result["pt-BR"]).toBe("/");
    expect(result["en-GB"]).toBe("/en-gb/");
  });
});

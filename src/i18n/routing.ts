export const V2_LOCALES = ["pt-BR", "en-GB", "es"] as const;
export type V2Locale = (typeof V2_LOCALES)[number];

export const DEFAULT_V2_LOCALE: V2Locale = "pt-BR";
export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

export const V2_LOCALE_SEGMENTS = ["pt-br", "en-gb", "es-intl"] as const;
export type V2LocaleSegment = (typeof V2_LOCALE_SEGMENTS)[number];

const segmentToLocaleMap: Record<V2LocaleSegment, V2Locale> = {
  "pt-br": "pt-BR",
  "en-gb": "en-GB",
  "es-intl": "es",
};

const localeToSegmentMap: Record<V2Locale, V2LocaleSegment> = {
  "pt-BR": "pt-br",
  "en-GB": "en-gb",
  es: "es-intl",
};

const localeMap: Record<string, V2Locale> = {
  pt: "pt-BR",
  "pt-br": "pt-BR",
  "pt-pt": "pt-BR",
  en: "en-GB",
  "en-gb": "en-GB",
  "en-us": "en-GB",
  "en-ca": "en-GB",
  "en-au": "en-GB",
  es: "es",
  "es-es": "es",
  "es-mx": "es",
  "es-419": "es",
  "es-intl": "es",
};

export function isLocale(value: string): value is V2Locale {
  return V2_LOCALES.includes(value as V2Locale);
}

export function isLocaleSegment(value: string): value is V2LocaleSegment {
  return V2_LOCALE_SEGMENTS.includes(value as V2LocaleSegment);
}

export function getLocaleFromSegment(segment: string): V2Locale | null {
  if (!isLocaleSegment(segment)) return null;
  return segmentToLocaleMap[segment];
}

export function getSegmentFromLocale(locale: V2Locale): V2LocaleSegment {
  return localeToSegmentMap[locale];
}

export function resolveLocale(input?: string | null): V2Locale | null {
  if (!input) return null;

  if (isLocale(input)) {
    return input;
  }

  const normalized = input.trim().toLowerCase().replace(/_/g, "-");

  if (isLocaleSegment(normalized)) {
    return getLocaleFromSegment(normalized);
  }

  if (localeMap[normalized]) {
    return localeMap[normalized];
  }

  const [language] = normalized.split("-");
  if (!language) return null;

  return localeMap[language] ?? null;
}

type LanguagePreference = {
  tag: string;
  quality: number;
};

function parseAcceptLanguageHeader(header: string): LanguagePreference[] {
  return header
    .split(",")
    .map((part) => {
      const [rawTag, ...params] = part.trim().split(";");
      const tag = rawTag?.trim();
      if (!tag) return null;

      const qParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qParam ? Number.parseFloat(qParam.split("=")[1] ?? "1") : 1;

      return {
        tag,
        quality: Number.isFinite(quality) ? quality : 1,
      };
    })
    .filter((item): item is LanguagePreference => Boolean(item))
    .sort((a, b) => b.quality - a.quality);
}

export function resolveLocaleFromAcceptLanguage(header?: string | null): V2Locale {
  if (!header) return DEFAULT_V2_LOCALE;

  const preferences = parseAcceptLanguageHeader(header);

  for (const preference of preferences) {
    const matched = resolveLocale(preference.tag);
    if (matched) return matched;
  }

  return DEFAULT_V2_LOCALE;
}

export function getLanguageAlternates(pathname: string) {
  const canonicalPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return {
    "pt-BR": canonicalPath,
    "en-GB": `/${getSegmentFromLocale("en-GB")}${canonicalPath}`,
    es: `/${getSegmentFromLocale("es")}${canonicalPath}`,
    "x-default": canonicalPath,
  } as const;
}

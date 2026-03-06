import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_V2_LOCALE,
  LOCALE_COOKIE_NAME,
  getSegmentFromLocale,
  isLocaleSegment,
  resolveLocale,
  resolveLocaleFromAcceptLanguage,
  type V2Locale,
} from "./src/i18n/routing";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

function withLocaleCookie(response: NextResponse, locale: V2Locale) {
  response.cookies.set({
    name: LOCALE_COOKIE_NAME,
    value: locale,
    maxAge: ONE_YEAR_IN_SECONDS,
    path: "/",
    sameSite: "lax",
  });

  return response;
}

function redirectWithLocale(request: NextRequest, pathname: string, locale: V2Locale) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;

  return withLocaleCookie(NextResponse.redirect(url), locale);
}

function continueWithLocale(locale: V2Locale) {
  return withLocaleCookie(NextResponse.next(), locale);
}

function getPreferredLocale(request: NextRequest): V2Locale {
  const cookieLocale = resolveLocale(request.cookies.get(LOCALE_COOKIE_NAME)?.value);
  if (cookieLocale) return cookieLocale;

  return resolveLocaleFromAcceptLanguage(request.headers.get("accept-language"));
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  const firstSegment = segments[0];
  const secondSegment = segments[1];

  if (pathname.startsWith("/legacy")) {
    return NextResponse.next();
  }

  if (firstSegment) {
    const resolvedFromSegment = resolveLocale(firstSegment);

    if (resolvedFromSegment && segments.length === 1) {
      const canonicalSegment = getSegmentFromLocale(resolvedFromSegment);
      return redirectWithLocale(request, `/${canonicalSegment}/v2`, resolvedFromSegment);
    }

    if (resolvedFromSegment && secondSegment === "v2") {
      const canonicalSegment = getSegmentFromLocale(resolvedFromSegment);

      if (!isLocaleSegment(firstSegment) || firstSegment !== canonicalSegment) {
        const restPath = segments.slice(1).join("/");
        return redirectWithLocale(
          request,
          `/${canonicalSegment}/${restPath}`,
          resolvedFromSegment
        );
      }

      return continueWithLocale(resolvedFromSegment);
    }
  }

  const isRoot = pathname === "/";
  const isUnprefixedV2 = firstSegment === "v2";

  if (!isRoot && !isUnprefixedV2) {
    return NextResponse.next();
  }

  const preferredLocale = getPreferredLocale(request);

  if (preferredLocale === DEFAULT_V2_LOCALE) {
    const targetPath = isRoot ? "/v2" : pathname;

    if (pathname !== targetPath) {
      return redirectWithLocale(request, targetPath, preferredLocale);
    }

    return continueWithLocale(preferredLocale);
  }

  const localeSegment = getSegmentFromLocale(preferredLocale);
  const targetPath = isRoot ? `/${localeSegment}/v2` : `/${localeSegment}${pathname}`;

  if (pathname !== targetPath) {
    return redirectWithLocale(request, targetPath, preferredLocale);
  }

  return continueWithLocale(preferredLocale);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

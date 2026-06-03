const DEFAULT_SITE_URL = "https://jrvalerio.dev";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
}

export function toAbsoluteUrl(pathOrUrl: string, siteUrl = getSiteUrl()) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;

  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteUrl}${normalizedPath}`;
}

export function getPersonJsonLd(siteUrl = getSiteUrl()): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Amaro Junior",
    alternateName: "JrValerio",
    url: siteUrl,
    image: toAbsoluteUrl("/img/perfil.png", siteUrl),
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/JrValerio",
      "https://www.linkedin.com/in/jrvalerio/",
    ],
    knowsAbout: [
      "Accessibility",
      "App Router",
      "Frontend Architecture",
      "Next.js",
      "React",
      "TypeScript",
      "Web Performance",
    ],
  };
}

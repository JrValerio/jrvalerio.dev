import type { Project } from "../data/projects";
import type { AdrDocument } from "./adr";

const DEFAULT_STRUCTURED_DATA_SITE_URL = "https://jrvalerio-dev.vercel.app";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_STRUCTURED_DATA_SITE_URL;
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

export function getProjectJsonLd(
  project: Project,
  pagePath: string,
  inLanguage = "pt-BR",
  siteUrl = getSiteUrl()
): Record<string, unknown> {
  const pageUrl = toAbsoluteUrl(pagePath, siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#creativework`,
    name: project.title,
    headline: project.title,
    description: project.summary,
    abstract: project.summary,
    url: pageUrl,
    image: toAbsoluteUrl(project.cover, siteUrl),
    dateCreated: project.year,
    dateModified: project.updatedAt.toISOString().slice(0, 10),
    genre: project.category,
    keywords: [project.category, ...project.stack].join(", "),
    inLanguage,
    creator: {
      "@id": `${siteUrl}/#person`,
    },
    author: {
      "@id": `${siteUrl}/#person`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    codeRepository: project.repo,
    sameAs: project.url ? [project.url] : undefined,
  };
}

export function getAdrTechArticleJsonLd(
  adr: AdrDocument,
  pagePath: string,
  inLanguage = "pt-BR",
  siteUrl = getSiteUrl()
): Record<string, unknown> {
  const pageUrl = toAbsoluteUrl(pagePath, siteUrl);
  const headline = `${adr.id}: ${adr.title}`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${pageUrl}#techarticle`,
    name: headline,
    headline,
    description: adr.summary,
    articleSection: "Architecture Decision Record",
    datePublished: adr.date,
    dateModified: adr.date,
    keywords: adr.tags.join(", "),
    inLanguage,
    url: pageUrl,
    author: {
      "@id": `${siteUrl}/#person`,
    },
    creator: {
      "@id": `${siteUrl}/#person`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    about: adr.tags.map((tag) => ({
      "@type": "Thing",
      name: tag,
    })),
  };
}

import type { MetadataRoute } from "next";
import { projects } from "../data/projects";
import { getSegmentFromLocale, type V2Locale } from "../i18n/v2";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jrvalerio.dev";
const siteLastModified = "2026-03-05";

export default function sitemap(): MetadataRoute.Sitemap {
  const i18nLocales: V2Locale[] = ["pt-BR", "en-GB", "es"];
  const localizedV2Paths = [
    "/v2",
    "/v2/projetos",
    "/v2/archive",
    "/v2/architecture",
    "/v2/engineering",
    "/v2/metrics",
    "/v2/principles",
    "/v2/sobre",
    "/v2/contato",
  ];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/v2`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/v2/projetos`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/v2/archive`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/v2/architecture`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/v2/sobre`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/v2/contato`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/v2/engineering`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/v2/metrics`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/v2/principles`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/v2/projetos/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const localizedRoutes: MetadataRoute.Sitemap = i18nLocales.flatMap((locale) => {
    const segment = getSegmentFromLocale(locale);
    const localizedStatic = localizedV2Paths.map((path) => ({
      url: `${baseUrl}/${segment}${path}`,
      lastModified: siteLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
    const localizedProjects = projects.map((project) => ({
      url: `${baseUrl}/${segment}/v2/projetos/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...localizedStatic, ...localizedProjects];
  });

  return [...staticRoutes, ...projectRoutes, ...localizedRoutes];
}

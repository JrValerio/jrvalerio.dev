import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export const ADR_STATUSES = ["proposed", "accepted", "deprecated"] as const;

export type AdrStatus = (typeof ADR_STATUSES)[number];

export type AdrDocument = {
  id: string;
  title: string;
  date: string;
  status: AdrStatus;
  summary: string;
  tags: string[];
  slug: string;
  filePath: string;
};

export type AdrFullDocument = AdrDocument & {
  content: string;
};

export type AdrSectionBlock = {
  type: "paragraph" | "list";
  lines: string[];
};

export type AdrSection = {
  id: string;
  title: string;
  blocks: AdrSectionBlock[];
};

export type AdrNavigation = {
  previous: AdrDocument | null;
  next: AdrDocument | null;
};

const ADR_DIRECTORY = path.join(process.cwd(), "src", "content", "adr");

function readRequiredString(value: unknown, field: string, filePath: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Invalid ADR frontmatter field "${field}" in ${filePath}`);
  }

  return value.trim();
}

function readStatus(value: unknown, filePath: string): AdrStatus {
  const status = readRequiredString(value, "status", filePath);

  if (!ADR_STATUSES.includes(status as AdrStatus)) {
    throw new Error(`Invalid ADR status "${status}" in ${filePath}`);
  }

  return status as AdrStatus;
}

function readDate(value: unknown, filePath: string) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return readRequiredString(value, "date", filePath);
}

function readTags(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim());
}

function getSlugFromFileName(fileName: string) {
  return fileName.replace(/\.(md|mdx)$/, "");
}

function getAdrSequenceNumber(adrId: string) {
  const match = adrId.match(/ADR-(\d+)/i);
  return match ? Number.parseInt(match[1] ?? "0", 10) : Number.MAX_SAFE_INTEGER;
}

function toSectionId(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseSectionBlocks(body: string): AdrSectionBlock[] {
  return body
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const lines = chunk
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

      const isList = lines.every((line) => line.startsWith("- "));

      if (isList) {
        return {
          type: "list" as const,
          lines: lines.map((line) => line.replace(/^- /, "")),
        };
      }

      return {
        type: "paragraph" as const,
        lines: [lines.join(" ")],
      };
    });
}

export const getAllAdrs = cache((): AdrDocument[] => {
  if (!fs.existsSync(ADR_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(ADR_DIRECTORY)
    .filter((fileName) => /\.(md|mdx)$/.test(fileName))
    .map((fileName) => {
      const filePath = path.join(ADR_DIRECTORY, fileName);
      const source = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(source);

      return {
        id: readRequiredString(data.id, "id", filePath),
        title: readRequiredString(data.title, "title", filePath),
        date: readDate(data.date, filePath),
        status: readStatus(data.status, filePath),
        summary: readRequiredString(data.summary, "summary", filePath),
        tags: readTags(data.tags),
        slug: getSlugFromFileName(fileName),
        filePath,
      };
    })
    .sort((left, right) => {
      if (left.date === right.date) {
        return right.id.localeCompare(left.id);
      }

      return right.date.localeCompare(left.date);
    });
});

export const getAdrBySlug = cache((slug: string): AdrFullDocument | null => {
  const adr = getAllAdrs().find((item) => item.slug === slug);

  if (!adr) {
    return null;
  }

  const source = fs.readFileSync(adr.filePath, "utf-8");
  const { content } = matter(source);

  return {
    ...adr,
    content,
  };
});

export const getAdrReadingOrder = cache((): AdrDocument[] => {
  return [...getAllAdrs()].sort((left, right) => {
    const sequenceDifference = getAdrSequenceNumber(left.id) - getAdrSequenceNumber(right.id);

    if (sequenceDifference !== 0) {
      return sequenceDifference;
    }

    if (left.date !== right.date) {
      return left.date.localeCompare(right.date);
    }

    return left.slug.localeCompare(right.slug);
  });
});

export const getAdrNavigation = cache((slug: string): AdrNavigation => {
  const orderedAdrs = getAdrReadingOrder();
  const currentIndex = orderedAdrs.findIndex((adr) => adr.slug === slug);

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: orderedAdrs[currentIndex - 1] ?? null,
    next: orderedAdrs[currentIndex + 1] ?? null,
  };
});

export function parseAdrSections(content: string): AdrSection[] {
  return content
    .split(/^##\s+/gm)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [titleLine, ...bodyLines] = chunk.split(/\r?\n/);
      const title = titleLine?.trim() ?? "";
      const body = bodyLines.join("\n").trim();

      return {
        id: toSectionId(title),
        title,
        blocks: parseSectionBlocks(body),
      };
    })
    .filter((section) => section.title.length > 0);
}

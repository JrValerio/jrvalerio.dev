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
      };
    })
    .sort((left, right) => {
      if (left.date === right.date) {
        return right.id.localeCompare(left.id);
      }

      return right.date.localeCompare(left.date);
    });
});

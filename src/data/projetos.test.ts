import { describe, expect, it } from "vitest";
import projetos from "./projetos";

const allProjects = Object.values(projetos).flat();

describe("projetos data", () => {
  it("keeps each category populated", () => {
    for (const [category, list] of Object.entries(projetos)) {
      expect(list.length, `${category} should not be empty`).toBeGreaterThan(0);
    }
  });

  it("uses unique slugs", () => {
    const slugs = allProjects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps required metadata for rendering cards", () => {
    for (const project of allProjects) {
      expect(project.name).toBeTruthy();
      expect(project.repo).toBeTruthy();
      expect(project.custom.imagem).toMatch(/^(https?:\/\/|\/)/);
      expect(project.custom.stack.length).toBeGreaterThan(0);
    }
  });
});

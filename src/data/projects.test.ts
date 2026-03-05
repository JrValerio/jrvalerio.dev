import { describe, expect, it } from "vitest";
import { getProjectBySlug, projects } from "./projects";

describe("projects domain", () => {
  it("ensures slugs are unique", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("sorts projects by updatedAt descending", () => {
    for (let index = 1; index < projects.length; index += 1) {
      const previous = projects[index - 1];
      const current = projects[index];
      expect(previous.updatedAt.getTime()).toBeGreaterThanOrEqual(current.updatedAt.getTime());
    }
  });

  it("keeps required case-study fields populated", () => {
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.summary.length).toBeGreaterThan(0);
      expect(project.challenge.length).toBeGreaterThan(0);
      expect(project.solution.length).toBeGreaterThan(0);
      expect(project.impact.length).toBeGreaterThan(0);
      expect(project.updatedAt).toBeInstanceOf(Date);
      expect(Number.isNaN(project.updatedAt.getTime())).toBe(false);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.architecture.length).toBeGreaterThan(0);
      expect(project.keyFeatures.length).toBeGreaterThan(0);
      expect(project.technicalChallenges.length).toBeGreaterThan(0);
      expect(project.nextIteration.length).toBeGreaterThan(0);
      expect(project.highlights.length).toBeGreaterThan(0);
    }
  });

  it("retrieves project by slug", () => {
    const target = projects[0];
    expect(getProjectBySlug(target.slug)).toEqual(target);
    expect(getProjectBySlug("missing-project")).toBeUndefined();
  });
});

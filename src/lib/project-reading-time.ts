import type { Project } from "../data/projects";

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getProjectReadingTime(project: Project) {
  const combinedText = [
    project.summary,
    project.challenge,
    project.solution,
    project.impact,
    ...project.keyFeatures,
    ...project.technicalChallenges,
    ...project.nextIteration,
    ...project.highlights,
    ...project.architecture.map((item) => item.detail),
  ].join(" ");

  return Math.max(1, Math.ceil(countWords(combinedText) / 200));
}

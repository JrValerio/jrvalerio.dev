"use client";

import { useMemo } from "react";
import {
  getOrCreateCaseSessionId,
  trackCaseReadComplete,
  trackCaseReadDepth,
  trackCaseReadStart,
  trackCaseSectionView,
  trackCaseView,
} from "../lib/analytics";
import { getProjectReadingTime } from "../lib/project-reading-time";
import type { Project } from "../data/projects";
import type { V2Locale } from "../i18n/v2";
import { useReadingAnalytics } from "../hooks/useReadingAnalytics";

type CaseStudyViewTrackerProps = {
  project: Project;
  locale: V2Locale;
  sectionIds: string[];
};

export default function CaseStudyViewTracker({
  project,
  locale,
  sectionIds,
}: CaseStudyViewTrackerProps) {
  const sessionId = useMemo(() => getOrCreateCaseSessionId(project.slug), [project.slug]);
  const estimatedReadMinutes = useMemo(() => getProjectReadingTime(project), [project]);

  useReadingAnalytics({
    sectionIds,
    onView: () => {
      trackCaseView({
        project_slug: project.slug,
        project_category: project.category,
        locale,
        session_id: sessionId,
        source: "case",
      });
    },
    onStart: () => {
      trackCaseReadStart({
        project_slug: project.slug,
        project_category: project.category,
        locale,
        session_id: sessionId,
        source: "case",
        estimated_read_minutes: estimatedReadMinutes,
      });
    },
    onProgress: ({ depth, milestone }) => {
      trackCaseReadDepth({
        project_slug: project.slug,
        project_category: project.category,
        locale,
        session_id: sessionId,
        source: "case",
        estimated_read_minutes: estimatedReadMinutes,
        depth,
        milestone,
      });
    },
    onComplete: ({ depth }) => {
      trackCaseReadComplete({
        project_slug: project.slug,
        project_category: project.category,
        locale,
        session_id: sessionId,
        source: "case",
        estimated_read_minutes: estimatedReadMinutes,
        depth,
      });
    },
    onSectionView: (section) => {
      trackCaseSectionView({
        project_slug: project.slug,
        project_category: project.category,
        locale,
        session_id: sessionId,
        source: "case",
        section,
      });
    },
  });

  return null;
}

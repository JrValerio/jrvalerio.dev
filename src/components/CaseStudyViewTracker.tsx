"use client";

import { useEffect } from "react";
import { getOrCreateCaseSessionId, trackCaseView } from "../lib/analytics";

type CaseStudyViewTrackerProps = {
  slug: string;
  category: string;
  locale?: string;
};

export default function CaseStudyViewTracker({
  slug,
  category,
  locale,
}: CaseStudyViewTrackerProps) {
  useEffect(() => {
    const sessionId = getOrCreateCaseSessionId(slug);
    trackCaseView({
      project_slug: slug,
      project_category: category,
      locale,
      session_id: sessionId,
    });
  }, [slug, category, locale]);

  return null;
}

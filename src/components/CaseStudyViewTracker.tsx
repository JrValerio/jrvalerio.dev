"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

type CaseStudyViewTrackerProps = {
  slug: string;
  category: string;
};

export default function CaseStudyViewTracker({
  slug,
  category,
}: CaseStudyViewTrackerProps) {
  useEffect(() => {
    trackEvent("case_study_view", {
      project_slug: slug,
      project_category: category,
    });
  }, [slug, category]);

  return null;
}

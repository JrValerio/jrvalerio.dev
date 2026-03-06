"use client";

import { useMemo } from "react";
import {
  trackAdrReadComplete,
  trackAdrReadDepth,
  trackAdrReadStart,
  trackAdrSectionView,
  trackAdrView,
} from "../../lib/analytics";
import type { AdrFullDocument } from "../../lib/adr";
import type { V2Locale } from "../../i18n/v2";
import { useReadingAnalytics } from "../../hooks/useReadingAnalytics";

function getAdrReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

type AdrReadingTrackerProps = {
  adr: AdrFullDocument;
  locale: V2Locale;
  sectionIds: string[];
};

export default function AdrReadingTracker({
  adr,
  locale,
  sectionIds,
}: AdrReadingTrackerProps) {
  const estimatedReadMinutes = useMemo(() => getAdrReadingTime(adr.content), [adr.content]);

  useReadingAnalytics({
    sectionIds,
    onView: () => {
      trackAdrView({
        adr_slug: adr.slug,
        adr_id: adr.id,
        locale,
      });
    },
    onStart: () => {
      trackAdrReadStart({
        adr_slug: adr.slug,
        adr_id: adr.id,
        locale,
        estimated_read_minutes: estimatedReadMinutes,
      });
    },
    onProgress: ({ depth, milestone }) => {
      trackAdrReadDepth({
        adr_slug: adr.slug,
        adr_id: adr.id,
        locale,
        estimated_read_minutes: estimatedReadMinutes,
        depth,
        milestone,
      });
    },
    onComplete: ({ depth }) => {
      trackAdrReadComplete({
        adr_slug: adr.slug,
        adr_id: adr.id,
        locale,
        estimated_read_minutes: estimatedReadMinutes,
        depth,
      });
    },
    onSectionView: (section) => {
      trackAdrSectionView({
        adr_slug: adr.slug,
        adr_id: adr.id,
        locale,
        section,
      });
    },
  });

  return null;
}

"use client";

import { trackEvent } from "../lib/analytics";
import type { V2Messages } from "../i18n/v2";

type ProjectOutboundLinksProps = {
  slug: string;
  category: string;
  url?: string;
  repo?: string;
  labels: Pick<V2Messages["caseStudy"], "liveProduct" | "viewSource">;
};

export default function ProjectOutboundLinks({
  slug,
  category,
  url,
  repo,
  labels,
}: ProjectOutboundLinksProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="jr-link"
          onClick={() =>
            trackEvent("project_live_click", {
              project_slug: slug,
              project_category: category,
              source: "case",
            })
          }
        >
          {labels.liveProduct}
        </a>
      ) : null}
      {repo ? (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="jr-link"
          onClick={() =>
            trackEvent("project_source_click", {
              project_slug: slug,
              project_category: category,
              source: "case",
            })
          }
        >
          {labels.viewSource}
        </a>
      ) : null}
    </div>
  );
}

"use client";

import { trackEvent } from "../lib/analytics";

type ProjectOutboundLinksProps = {
  slug: string;
  category: string;
  url?: string;
  repo?: string;
};

export default function ProjectOutboundLinks({
  slug,
  category,
  url,
  repo,
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
          Ver produto
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
          Ver repositorio
        </a>
      ) : null}
    </div>
  );
}

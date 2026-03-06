"use client";

import { getOrCreateCaseSessionId, trackCaseOutbound } from "../lib/analytics";
import { getV2Messages, type V2Locale } from "../i18n/v2";

type ProjectOutboundLinksProps = {
  slug: string;
  category: string;
  url?: string;
  repo?: string;
  locale?: V2Locale;
};

export default function ProjectOutboundLinks({
  slug,
  category,
  url,
  repo,
  locale = "pt-BR",
}: ProjectOutboundLinksProps) {
  const messages = getV2Messages(locale);
  const sessionId = getOrCreateCaseSessionId(slug);

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="jr-link"
          onClick={() =>
            trackCaseOutbound("live", {
              project_slug: slug,
              project_category: category,
              source: "case",
              locale,
              session_id: sessionId,
            })
          }
        >
          {messages.caseStudy.liveProduct}
        </a>
      ) : null}
      {repo ? (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="jr-link"
          onClick={() =>
            trackCaseOutbound("repo", {
              project_slug: slug,
              project_category: category,
              source: "case",
              locale,
              session_id: sessionId,
            })
          }
        >
          {messages.caseStudy.viewSource}
        </a>
      ) : null}
    </div>
  );
}

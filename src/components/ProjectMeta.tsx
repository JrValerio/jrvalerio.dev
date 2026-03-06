import type { ProjectStatus, Tech } from "../data/projects";
import { getV2Messages, type V2Locale } from "../i18n/v2";

type ProjectMetaProps = {
  stack: Tech[];
  year: number;
  role: string;
  status: ProjectStatus;
  locale?: V2Locale;
};

export default function ProjectMeta({
  stack,
  year,
  role,
  status,
  locale = "pt-BR",
}: ProjectMetaProps) {
  const messages = getV2Messages(locale);

  return (
    <div className="jr-meta-grid">
      <div>
        <p className="jr-meta-label">{messages.caseStudy.labels.stack}</p>
        <p className="text-sm text-[var(--jr-text)]">{stack.join(" · ")}</p>
      </div>

      <div>
        <p className="jr-meta-label">{messages.caseStudy.labels.year}</p>
        <p className="text-sm text-[var(--jr-text)]">{year}</p>
      </div>

      <div>
        <p className="jr-meta-label">{messages.caseStudy.labels.role}</p>
        <p className="text-sm text-[var(--jr-text)]">{role}</p>
      </div>

      <div>
        <p className="jr-meta-label">{messages.caseStudy.labels.status}</p>
        <p className="text-sm text-[var(--jr-text)]">{messages.caseStudy.status[status]}</p>
      </div>
    </div>
  );
}

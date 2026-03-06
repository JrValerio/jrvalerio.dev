import type { ProjectTimelineStep } from "../../data/projects";

type ProjectTimelineProps = {
  steps: ProjectTimelineStep[];
};

export default function ProjectTimeline({ steps }: ProjectTimelineProps) {
  if (!steps.length) return null;

  return (
    <div className="jr-timeline">
      {steps.map((step, index) => (
        <div key={`${step.phase}-${index}`} className="jr-timeline-step">
          <div className="jr-timeline-dot" aria-hidden="true" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="jr-timeline-title">{step.phase}</h4>
              {step.date ? <span className="jr-meta">{step.date}</span> : null}
            </div>
            <p className="jr-timeline-description">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

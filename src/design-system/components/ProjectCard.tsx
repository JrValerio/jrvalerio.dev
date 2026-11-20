import Tag from "./Tag";

export type ProjectCardProps = {
  index: number;
  title: string;
  summary: string;
  /** Omit for private work: the card renders without a link. */
  href?: string;
  external?: boolean;
  tags: string[];
  status?: string;
  /** Shown instead of a link when there is no href. */
  note?: string;
  /** Screen-reader suffix for external links. */
  newTabLabel?: string;
};

/** Numbered project card; the whole card is one link labelled by the title. */
export default function ProjectCard({ index, title, summary, href, external, tags, status, note, newTabLabel = "abre em nova aba" }: ProjectCardProps) {
  const number = String(index).padStart(2, "0");
  return (
    <article className="group relative flex h-full flex-col gap-4 rounded-lg border border-[var(--jv-border)] p-6 transition-colors has-[a]:hover:border-[var(--jv-accent)]">
      <div className="flex items-start justify-between gap-4">
        <span aria-hidden="true" className="font-[family-name:var(--jv-font-display)] text-4xl leading-none text-[var(--jv-accent)]">
          {number}
        </span>
        {status && <Tag tone="accent">{status}</Tag>}
      </div>
      <h3 className="font-[family-name:var(--jv-font-display)] text-3xl leading-tight text-[var(--jv-fg)] uppercase">
        {href ? (
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:outline-offset-2 after:focus-visible:outline-[var(--jv-accent)]"
          >
            {title}
            {external && <span className="sr-only"> ({newTabLabel})</span>}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="text-[15px] leading-relaxed text-[var(--jv-muted)]">{summary}</p>
      {!href && note && (
        <p className="font-[family-name:var(--jv-font-mono)] text-xs text-[var(--jv-muted)]">{note}</p>
      )}
      <ul className="mt-auto flex flex-wrap gap-2" aria-label={`Stack de ${title}`}>
        {tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}

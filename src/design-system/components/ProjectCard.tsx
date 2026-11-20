import Tag from "./Tag";

export type ProjectCardProps = {
  index: number;
  title: string;
  summary: string;
  href: string;
  tags: string[];
  status?: string;
};

/** Numbered project card; the whole card is one link labelled by the title. */
export default function ProjectCard({ index, title, summary, href, tags, status }: ProjectCardProps) {
  const number = String(index).padStart(2, "0");
  return (
    <article className="group relative flex h-full flex-col gap-4 rounded-lg border border-[var(--jv-border)] p-6 transition-colors hover:border-[var(--jv-accent)]">
      <div className="flex items-start justify-between gap-4">
        <span aria-hidden="true" className="font-[family-name:var(--jv-font-display)] text-4xl leading-none text-[var(--jv-accent)]">
          {number}
        </span>
        {status && <Tag tone="accent">{status}</Tag>}
      </div>
      <h3 className="font-[family-name:var(--jv-font-display)] text-3xl leading-tight text-[var(--jv-fg)] uppercase">
        <a
          href={href}
          className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:outline-offset-2 after:focus-visible:outline-[var(--jv-accent)]"
        >
          {title}
        </a>
      </h3>
      <p className="text-[15px] leading-relaxed text-[var(--jv-muted)]">{summary}</p>
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

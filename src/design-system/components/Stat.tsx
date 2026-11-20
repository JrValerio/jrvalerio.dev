import type { ReactNode } from "react";

type StatItem = { value: ReactNode; label: string };

/** Hero numbers as a description list: the label describes the value. */
export default function StatList({ items, label }: { items: StatItem[]; label: string }) {
  return (
    <dl aria-label={label} className="flex flex-col">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col-reverse gap-1 border-b border-[var(--jv-border)] py-4 first:pt-0 last:border-b-0"
        >
          <dt className="text-xs font-bold tracking-[0.1em] text-[var(--jv-muted)] uppercase">{item.label}</dt>
          <dd className="font-[family-name:var(--jv-font-display)] text-5xl leading-none text-[var(--jv-accent)]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

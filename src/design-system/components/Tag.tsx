import type { ReactNode } from "react";
import { cx } from "../cx";

type Props = { tone?: "outline" | "accent"; children: ReactNode; className?: string };

export default function Tag({ tone = "outline", children, className }: Props) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded px-2 py-[3px] font-[family-name:var(--jv-font-mono)] text-[11px] font-medium tracking-wide",
        tone === "accent"
          ? "bg-[var(--jv-accent)] text-[var(--jv-on-accent)]"
          : "border border-[var(--jv-border)] text-[var(--jv-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

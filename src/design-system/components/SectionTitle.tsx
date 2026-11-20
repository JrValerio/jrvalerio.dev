import type { ReactNode } from "react";
import { cx } from "../cx";

type Props = {
  eyebrow?: string;
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

/** Condensed uppercase title ending in an accent dot, with optional mono eyebrow. */
export default function SectionTitle({ eyebrow, children, as: Heading = "h2", id, className }: Props) {
  return (
    <div className={cx("flex flex-col gap-3", className)}>
      {eyebrow && (
        <p className="font-[family-name:var(--jv-font-mono)] text-xs tracking-[0.18em] text-[var(--jv-muted)] uppercase">
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className="font-[family-name:var(--jv-font-display)] text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-[var(--jv-fg)] uppercase"
      >
        {children}
        <span aria-hidden="true" className="text-[var(--jv-accent)]">
          .
        </span>
      </Heading>
    </div>
  );
}

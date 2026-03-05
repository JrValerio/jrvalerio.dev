import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <article
      className={`rounded-xl border border-[var(--jr-border)] bg-[var(--jr-surface)] p-6 ${className ?? ""}`}
    >
      {children}
    </article>
  );
}

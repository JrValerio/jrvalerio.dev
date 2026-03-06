import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <article className={`jr-surface-card p-6 ${className ?? ""}`}>
      {children}
    </article>
  );
}

import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="jr-container">{children}</div>;
}

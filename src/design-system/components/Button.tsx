import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";

export type ButtonVariant = "primary" | "ghost" | "link";

const base =
  "inline-flex items-center justify-center gap-2 font-[family-name:var(--jv-font-body)] font-extrabold text-[15px] transition-[opacity,border-color,color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--jv-accent)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "min-h-[52px] rounded-md bg-[var(--jv-cta-bg)] px-6 text-[var(--jv-cta-fg)] hover:opacity-90",
  ghost:
    "min-h-[44px] rounded-full border border-[var(--jv-border)] px-5 text-[var(--jv-fg)] hover:border-[var(--jv-accent)]",
  link: "min-h-[44px] text-[var(--jv-fg)] underline underline-offset-4 decoration-[var(--jv-accent)] hover:text-[var(--jv-accent)]",
};

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cx(base, variants[variant], className);
}

type Common = { variant?: ButtonVariant; className?: string; children: ReactNode };

type AsAnchor = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;
type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export default function Button(props: AsAnchor | AsButton) {
  if (props.href !== undefined) {
    const { variant, className, children, href, ...rest } = props as AsAnchor;
    return (
      <a href={href} className={buttonClass(variant, className)} {...rest}>
        {children}
      </a>
    );
  }
  const { variant, className, children, type, ...rest } = props as AsButton;
  return (
    <button type={type ?? "button"} className={buttonClass(variant, className)} {...rest}>
      {children}
    </button>
  );
}

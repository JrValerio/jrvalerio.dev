import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type AnchorProps = BaseProps & {
  as: "a";
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;

type NativeButtonProps = BaseProps & {
  as?: "button";
  href?: never;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type Props = AnchorProps | NativeButtonProps;

export default function Button(props: Props) {
  const baseClass =
    "inline-flex items-center justify-center border border-[var(--jr-border)] px-6 py-3 text-sm text-[var(--jr-text)] transition-colors hover:border-[var(--jr-accent)] hover:text-[var(--jr-accent)]";

  if (props.as === "a") {
    const { as: _as, className, children, href, ...rest } = props;
    return (
      <a href={href} className={`${baseClass} ${className ?? ""}`} {...rest}>
        {children}
      </a>
    );
  }

  const { className, children, type, ...rest } = props;
  return (
    <button type={type ?? "button"} className={`${baseClass} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}

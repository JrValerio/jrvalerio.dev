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
    const { as: variant, className, children, href, ...rest } = props;
    void variant;

    return (
      <a href={href} className={`${baseClass} ${className ?? ""}`} {...rest}>
        {children}
      </a>
    );
  }

  const { as: variant, className, children, type, ...rest } = props;
  void variant;

  return (
    <button type={type ?? "button"} className={`${baseClass} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}

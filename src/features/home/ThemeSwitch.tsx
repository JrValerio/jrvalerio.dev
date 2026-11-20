"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};

type Props = { label: string; light: string; dark: string };

/**
 * Light/dark radio pair. The checked state only renders after hydration,
 * because the resolved theme is unknown on the server.
 */
export default function ThemeSwitch({ label, light, dark }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const current = hydrated ? resolvedTheme : undefined;

  const option = (value: "light" | "dark", text: string) => (
    <label className="relative inline-flex min-h-[36px] cursor-pointer items-center rounded-full px-3 text-xs font-bold text-[var(--jv-fg)] has-[:checked]:bg-[var(--jv-cta-bg)] has-[:checked]:text-[var(--jv-cta-fg)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--jv-accent)]">
      <input
        type="radio"
        name="jv-theme"
        value={value}
        checked={current === value}
        onChange={() => setTheme(value)}
        className="absolute inset-0 m-0 cursor-pointer appearance-none rounded-full opacity-0"
      />
      {text}
    </label>
  );

  return (
    <fieldset className="flex items-center gap-1 rounded-full border border-[var(--jv-border)] p-1">
      <legend className="sr-only">{label}</legend>
      {option("light", light)}
      {option("dark", dark)}
    </fieldset>
  );
}

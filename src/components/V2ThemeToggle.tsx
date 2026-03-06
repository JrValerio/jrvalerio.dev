"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import type { V2Locale } from "../i18n/v2";

type V2ThemeToggleProps = {
  locale: V2Locale;
};

const labelsByLocale: Record<V2Locale, { dark: string; light: string; switchToDark: string; switchToLight: string }> = {
  "pt-BR": {
    dark: "Escuro",
    light: "Claro",
    switchToDark: "Ativar modo escuro",
    switchToLight: "Ativar modo claro",
  },
  "en-GB": {
    dark: "Dark",
    light: "Light",
    switchToDark: "Enable dark mode",
    switchToLight: "Enable light mode",
  },
  es: {
    dark: "Oscuro",
    light: "Claro",
    switchToDark: "Activar modo oscuro",
    switchToLight: "Activar modo claro",
  },
};

export default function V2ThemeToggle({ locale }: V2ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const labels = labelsByLocale[locale];
  const isDark = (resolvedTheme ?? "dark") === "dark";

  const title = useMemo(() => {
    if (!mounted) return labels.dark;
    return isDark ? labels.switchToLight : labels.switchToDark;
  }, [isDark, labels, mounted]);

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-8 min-w-[64px] items-center justify-center rounded-md border border-[var(--jr-border)] px-2 text-[10px] uppercase tracking-wide text-[var(--jr-muted)]"
      >
        ...
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={title}
      title={title}
      className="inline-flex h-8 min-w-[64px] items-center justify-center gap-1 rounded-md border border-[var(--jr-border)] bg-[var(--jr-surface)]/60 px-2 text-[10px] uppercase tracking-wide text-[var(--jr-muted)] transition-colors hover:border-[var(--jr-border-strong)] hover:text-[var(--jr-text)]"
    >
      {isDark ? <Sun size={13} /> : <Moon size={13} />}
      <span>{isDark ? labels.dark : labels.light}</span>
    </button>
  );
}

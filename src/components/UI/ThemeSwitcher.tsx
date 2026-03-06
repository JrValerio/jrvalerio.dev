"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import type { V2Locale } from "../../i18n/v2";

type ThemeSwitcherProps = {
  locale: V2Locale;
};

const labelsByLocale: Record<
  V2Locale,
  {
    light: string;
    dark: string;
    monospaced: string;
    switcher: string;
  }
> = {
  "pt-BR": {
    light: "Claro",
    dark: "Escuro",
    monospaced: "Monoespacado",
    switcher: "Seletor de tema",
  },
  "en-GB": {
    light: "Light",
    dark: "Dark",
    monospaced: "Monospaced",
    switcher: "Theme switcher",
  },
  es: {
    light: "Claro",
    dark: "Oscuro",
    monospaced: "Monoespaciado",
    switcher: "Selector de tema",
  },
};

const MONO_STORAGE_KEY = "jr-mono";

export default function ThemeSwitcher({ locale }: ThemeSwitcherProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mono, setMono] = useState(false);

  const labels = useMemo(() => labelsByLocale[locale], [locale]);
  const activeTheme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    setMounted(true);
    const savedMono = window.localStorage.getItem(MONO_STORAGE_KEY) === "true";
    setMono(savedMono);
    document.documentElement.setAttribute("data-mono", String(savedMono));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, [activeTheme, mounted]);

  const onThemeChange = (nextTheme: "light" | "dark") => {
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const onMonoChange = () => {
    const nextMono = !mono;
    setMono(nextMono);
    document.documentElement.setAttribute("data-mono", String(nextMono));
    window.localStorage.setItem(MONO_STORAGE_KEY, String(nextMono));
  };

  if (!mounted) return null;

  return (
    <aside className="jr-theme-switcher" aria-label={labels.switcher}>
      <label className="jr-theme-switcher-item">
        <input
          type="radio"
          name="jr-theme"
          checked={activeTheme === "light"}
          onChange={() => onThemeChange("light")}
        />
        <span>{labels.light}</span>
      </label>

      <label className="jr-theme-switcher-item">
        <input
          type="radio"
          name="jr-theme"
          checked={activeTheme === "dark"}
          onChange={() => onThemeChange("dark")}
        />
        <span>{labels.dark}</span>
      </label>

      <label className="jr-theme-switcher-item">
        <input type="checkbox" checked={mono} onChange={onMonoChange} />
        <span>{labels.monospaced}</span>
      </label>
    </aside>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  LOCALE_COOKIE_NAME,
  localizePathname,
  type V2Locale,
  type V2Messages,
} from "../../i18n/v2";

type LateralControlsProps = {
  locale: V2Locale;
  messages: Pick<V2Messages, "common" | "locale" | "nav" | "commandPalette" | "themeSwitcher">;
};

const allLocales: V2Locale[] = ["pt-BR", "en-GB", "es"];

export default function LateralControls({
  locale,
  messages,
}: LateralControlsProps) {
  const router = useRouter();
  const pathname = usePathname() || "/v2";

  const onSearchClick = () => {
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("jr:open-command-palette"));
    });
  };

  const onLocaleChange = (nextLocale: V2Locale) => {
    if (nextLocale === locale) return;
    const nextPath = localizePathname(pathname, nextLocale);
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.push(nextPath);
  };

  return (
    <aside
      className="jr-lateral-controls"
      aria-label={messages.common.lateralControlsAriaLabel}
    >
      <div className="jr-lateral-controls-inner">
        <ThemeSwitcher messages={messages.themeSwitcher} className="jr-lateral-group" />

        <div className="jr-lateral-group">
          <button
            type="button"
            className="jr-lateral-btn"
            onClick={onSearchClick}
            aria-label={messages.commandPalette.placeholder}
            title={messages.commandPalette.placeholder}
          >
            {messages.nav.search}
          </button>
        </div>

        <div className="jr-lateral-group" role="group" aria-label={messages.locale.label}>
          {allLocales.map((nextLocale) => (
            <button
              key={nextLocale}
              type="button"
              onClick={() => onLocaleChange(nextLocale)}
              className="jr-lateral-btn"
              aria-pressed={nextLocale === locale}
            >
              {messages.locale.options[nextLocale]}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

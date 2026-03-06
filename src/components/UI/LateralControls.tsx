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
  localeMessages: V2Messages["locale"];
  commandMessages: V2Messages["commandPalette"];
};

const allLocales: V2Locale[] = ["pt-BR", "en-GB", "es"];

export default function LateralControls({
  locale,
  localeMessages,
  commandMessages,
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
    <aside className="jr-lateral-controls" aria-label="Lateral controls">
      <div className="jr-lateral-controls-inner">
        <ThemeSwitcher locale={locale} className="jr-lateral-group" />

        <div className="jr-lateral-group">
          <button
            type="button"
            className="jr-lateral-btn"
            onClick={onSearchClick}
            aria-label={commandMessages.placeholder}
            title={commandMessages.placeholder}
          >
            Search
          </button>
        </div>

        <div className="jr-lateral-group" role="group" aria-label={localeMessages.label}>
          {allLocales.map((nextLocale) => (
            <button
              key={nextLocale}
              type="button"
              onClick={() => onLocaleChange(nextLocale)}
              className="jr-lateral-btn"
              aria-pressed={nextLocale === locale}
            >
              {localeMessages.options[nextLocale]}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

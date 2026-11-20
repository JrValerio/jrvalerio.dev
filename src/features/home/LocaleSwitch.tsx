"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE_NAME, V2_LOCALES, type V2Locale } from "../../i18n/routing";
import { localizePathname } from "../../i18n/v2";

const LABELS: Record<V2Locale, string> = { "pt-BR": "PT-BR", "en-GB": "EN-GB", es: "ES" };

function persistLocale(locale: V2Locale) {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export default function LocaleSwitch({ locale, label }: { locale: V2Locale; label: string }) {
  const router = useRouter();

  function select(next: V2Locale) {
    if (next === locale) return;
    persistLocale(next);
    router.push(localizePathname("/v2", next));
  }

  return (
    <div role="group" aria-label={label} className="flex items-center gap-1">
      {V2_LOCALES.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={value === locale}
          onClick={() => select(value)}
          className="min-h-[36px] rounded-full px-2 whitespace-nowrap font-[family-name:var(--jv-font-mono)] text-[11px] text-[var(--jv-muted)] aria-pressed:text-[var(--jv-fg)] aria-pressed:underline aria-pressed:decoration-[var(--jv-accent)] aria-pressed:underline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--jv-accent)]"
        >
          {LABELS[value]}
        </button>
      ))}
    </div>
  );
}

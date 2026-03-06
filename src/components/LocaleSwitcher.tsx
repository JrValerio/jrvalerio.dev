"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ChangeEvent } from "react";
import {
  LOCALE_COOKIE_NAME,
  localizePathname,
  type V2Locale,
  type V2Messages,
} from "../i18n/v2";

type LocaleSwitcherProps = {
  locale: V2Locale;
  messages: V2Messages["locale"];
};

export default function LocaleSwitcher({ locale, messages }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "/v2";

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as V2Locale;
    const nextPath = localizePathname(pathname, nextLocale);
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.push(nextPath);
  };

  return (
    <label className="flex items-center gap-2 text-xs text-[var(--jr-muted)]">
      <span className="sr-only">{messages.label}</span>
      <select
        aria-label={messages.label}
        className="rounded border border-[var(--jr-border)] bg-transparent px-2 py-1 text-[10px] uppercase tracking-wide text-[var(--jr-muted)] focus:outline-none focus-visible:border-[var(--jr-accent)]"
        value={locale}
        onChange={onChange}
      >
        <option value="pt-BR">{messages.options["pt-BR"]}</option>
        <option value="en-GB">{messages.options["en-GB"]}</option>
        <option value="es">{messages.options.es}</option>
      </select>
    </label>
  );
}

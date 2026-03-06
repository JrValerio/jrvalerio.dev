import type { ReactNode } from "react";
import Link from "next/link";
import CommandPalette from "../../components/UI/CommandPalette";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import V2ThemeToggle from "../../components/V2ThemeToggle";
import { getV2Messages, toLocalePath, type V2Locale } from "../../i18n/v2";

type V2LayoutShellProps = {
  children: ReactNode;
  locale: V2Locale;
  prefixed: boolean;
};

export default function V2LayoutShell({ children, locale, prefixed }: V2LayoutShellProps) {
  const messages = getV2Messages(locale);
  const navLinks = [
    { href: "/v2", label: messages.nav.items.home },
    { href: "/v2/projetos", label: messages.nav.items.projects },
    { href: "/v2/archive", label: messages.nav.items.archive },
    { href: "/v2/architecture", label: messages.nav.items.architecture },
    { href: "/v2/engineering", label: messages.nav.items.engineering },
    { href: "/v2/metrics", label: messages.nav.items.metrics },
    { href: "/v2/principles", label: messages.nav.items.principles },
    { href: "/v2/sobre", label: messages.nav.items.about },
    { href: "/v2/contato", label: messages.nav.items.contact },
  ];

  return (
    <div className="jr-theme min-h-screen">
      <CommandPalette locale={locale} prefixed={prefixed} messages={messages.commandPalette} />

      <header className="relative z-30 sticky top-0 border-b border-[var(--jr-border)] bg-[var(--jr-header-bg)] backdrop-blur-md">
        <div className="jr-container flex items-center justify-between py-4">
          <Link
            href={toLocalePath("/v2", locale, prefixed)}
            className="text-sm tracking-[0.16em] uppercase text-[var(--jr-muted)] hover:text-[var(--jr-text)] transition-colors"
          >
            {messages.nav.brand}
          </Link>
          <nav
            className="ml-4 flex min-w-0 items-center gap-4 overflow-x-auto whitespace-nowrap"
            aria-label="Navegacao principal v2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={toLocalePath(link.href, locale, prefixed)}
                className="text-xs md:text-sm text-[var(--jr-muted)] hover:text-[var(--jr-text)] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <span className="hidden rounded-md border border-[var(--jr-border)] px-2 py-1 text-[10px] uppercase tracking-wide text-[var(--jr-muted)] lg:inline-flex">
              {messages.nav.searchHint}
            </span>
            <V2ThemeToggle locale={locale} />
            <LocaleSwitcher locale={locale} messages={messages.locale} />
          </nav>
        </div>
      </header>

      <main className="relative z-10">{children}</main>
    </div>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import CommandPalette from "../../components/UI/CommandPalette";
import Frame from "../../components/UI/Frame";
import LateralControls from "../../components/UI/LateralControls";
import WebGLBackground from "../../components/background/WebGLBackground";
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
    <div className="jr-theme jr-theme--framed min-h-screen">
      <WebGLBackground />
      <Frame />
      <LateralControls
        locale={locale}
        localeMessages={messages.locale}
        commandMessages={messages.commandPalette}
      />

      <CommandPalette locale={locale} prefixed={prefixed} messages={messages.commandPalette} />

      <div id="Content">
        <div className="content_inner">
          <header className="jr-shell-header">
            <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-4 py-4 md:px-6">
              <Link
                href={toLocalePath("/v2", locale, prefixed)}
                className="shrink-0 text-sm tracking-[0.16em] uppercase text-[var(--jr-muted)] transition-colors hover:text-[var(--jr-text)]"
              >
                {messages.nav.brand}
              </Link>
              <nav
                className="ml-4 flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-2"
                aria-label="Navegacao principal v2"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={toLocalePath(link.href, locale, prefixed)}
                    className="whitespace-nowrap text-xs text-[var(--jr-muted)] transition-colors hover:text-[var(--jr-text)] md:text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="relative z-[5]">{children}</main>
        </div>
      </div>
    </div>
  );
}

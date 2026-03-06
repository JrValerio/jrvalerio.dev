import type { ReactNode } from "react";
import Link from "next/link";
import CommandPalette from "../../components/UI/CommandPalette";
import Frame from "../../components/UI/Frame";
import LateralControls from "../../components/UI/LateralControls";
import WebGLBackground from "../../components/background/WebGLBackground";
import { getV2Messages, toLocalePath, type V2Locale } from "../../i18n/v2";
import ShellHeaderNav from "./shell-header-nav";
import ShellScrollRestoration from "./shell-scroll-restoration";
import ShellScrollShadow from "./shell-scroll-shadow";

type V2LayoutShellProps = {
  children: ReactNode;
  locale: V2Locale;
  prefixed: boolean;
};

export default function V2LayoutShell({ children, locale, prefixed }: V2LayoutShellProps) {
  const messages = getV2Messages(locale);
  const navLinks = [
    { href: toLocalePath("/v2", locale, prefixed), label: messages.nav.items.home },
    { href: toLocalePath("/v2/projetos", locale, prefixed), label: messages.nav.items.projects },
    { href: toLocalePath("/v2/archive", locale, prefixed), label: messages.nav.items.archive },
    { href: toLocalePath("/v2/architecture", locale, prefixed), label: messages.nav.items.architecture },
    { href: toLocalePath("/v2/engineering", locale, prefixed), label: messages.nav.items.engineering },
    { href: toLocalePath("/v2/metrics", locale, prefixed), label: messages.nav.items.metrics },
    { href: toLocalePath("/v2/principles", locale, prefixed), label: messages.nav.items.principles },
    { href: toLocalePath("/v2/sobre", locale, prefixed), label: messages.nav.items.about },
    { href: toLocalePath("/v2/contato", locale, prefixed), label: messages.nav.items.contact },
  ];

  return (
    <div className="jr-theme jr-theme--framed min-h-screen">
      <WebGLBackground />
      <Frame />
      <LateralControls locale={locale} messages={messages} />

      <CommandPalette locale={locale} prefixed={prefixed} messages={messages.commandPalette} />
      <ShellScrollRestoration />
      <ShellScrollShadow />

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
              <ShellHeaderNav
                navAriaLabel={messages.nav.ariaLabel}
                navLinks={navLinks}
                openMenuLabel={messages.nav.openMenu}
                closeMenuLabel={messages.nav.closeMenu}
                searchLabel={messages.nav.search}
              />
            </div>
          </header>

          <div id="ContentScroll" className="jr-shell-scroll">
            <main className="relative z-[5]">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

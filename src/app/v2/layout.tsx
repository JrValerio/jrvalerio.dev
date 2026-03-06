import type { ReactNode } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/v2", label: "Home" },
  { href: "/v2/projetos", label: "Projetos" },
  { href: "/v2/archive", label: "Archive" },
  { href: "/v2/architecture", label: "Architecture" },
  { href: "/v2/engineering", label: "Engineering" },
  { href: "/v2/metrics", label: "Metrics" },
  { href: "/v2/sobre", label: "Sobre" },
  { href: "/v2/contato", label: "Contato" },
];

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <div className="jr-theme min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--jr-border)] bg-[rgba(10,10,10,0.88)] backdrop-blur-md">
        <div className="jr-container flex items-center justify-between py-4">
          <Link
            href="/v2"
            className="text-sm tracking-[0.16em] uppercase text-[var(--jr-muted)] hover:text-[var(--jr-text)] transition-colors"
          >
            JR Minimal
          </Link>
          <nav
            className="ml-4 flex min-w-0 items-center gap-4 overflow-x-auto whitespace-nowrap"
            aria-label="Navegacao principal v2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs md:text-sm text-[var(--jr-muted)] hover:text-[var(--jr-text)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

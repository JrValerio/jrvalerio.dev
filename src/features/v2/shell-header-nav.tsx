"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SHELL_SCROLL_CONTAINER_ID = "ContentScroll";

type NavLink = {
  href: string;
  label: string;
};

type ShellHeaderNavProps = {
  navAriaLabel: string;
  navLinks: NavLink[];
  openMenuLabel: string;
  closeMenuLabel: string;
  searchLabel: string;
};

export default function ShellHeaderNav({
  navAriaLabel,
  navLinks,
  openMenuLabel,
  closeMenuLabel,
  searchLabel,
}: ShellHeaderNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const normalizePath = (value: string) => {
    if (value.length > 1 && value.endsWith("/")) {
      return value.slice(0, -1);
    }

    return value;
  };

  const isActiveLink = (href: string) => {
    const currentPath = normalizePath(pathname || "/");
    const targetPath = normalizePath(href);
    const isHomeRoute = /\/v2$/.test(targetPath);

    if (isHomeRoute) {
      return currentPath === targetPath;
    }

    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const scrollContainer = document.getElementById(SHELL_SCROLL_CONTAINER_ID);
    if (!scrollContainer) return;

    const previousOverflow = scrollContainer.style.overflowY;
    scrollContainer.style.overflowY = open ? "hidden" : "";

    return () => {
      scrollContainer.style.overflowY = previousOverflow;
    };
  }, [open]);

  const handleSearchClick = () => {
    setOpen(false);
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("jr:open-command-palette"));
    });
  };

  return (
    <>
      <nav
        className="ml-4 hidden min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-2 lg:flex"
        aria-label={navAriaLabel}
      >
        {navLinks.map((link) => {
          const isActive = isActiveLink(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`whitespace-nowrap text-xs transition-colors md:text-sm ${
                isActive
                  ? "text-[var(--jr-text)]"
                  : "text-[var(--jr-muted)] hover:text-[var(--jr-text)]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className="ml-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--jr-border)] text-[var(--jr-muted)] transition-colors hover:border-[var(--jr-border-strong)] hover:text-[var(--jr-text)] lg:hidden"
        aria-expanded={open}
        aria-controls="jr-mobile-nav"
        aria-label={open ? closeMenuLabel : openMenuLabel}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
      </button>

      <div
        id="jr-mobile-nav"
        className={`jr-shell-mobile-panel lg:hidden ${open ? "is-open" : ""}`}
      >
        <nav className="grid gap-1.5" aria-label={navAriaLabel}>
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`rounded-[10px] px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-[color:color-mix(in_srgb,var(--jr-text)_7%,transparent)] text-[var(--jr-text)]"
                    : "text-[var(--jr-muted)] hover:bg-[color:color-mix(in_srgb,var(--jr-text)_6%,transparent)] hover:text-[var(--jr-text)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleSearchClick}
          className="mt-3 flex w-full items-center justify-between rounded-[10px] border border-[var(--jr-border)] px-4 py-3 text-sm text-[var(--jr-muted)] transition-colors hover:border-[var(--jr-border-strong)] hover:text-[var(--jr-text)]"
        >
          <span>{searchLabel}</span>
          <Search size={15} strokeWidth={1.8} />
        </button>
      </div>
    </>
  );
}

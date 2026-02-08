import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useRef } from "react";

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  const flags: Record<string, string> = {
    pt: "/flags/br.svg",
    en: "/flags/us.svg",
    es: "/flags/es.svg",
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      dialogRef.current?.focus();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const menuItems = [
    { href: "/", label: t("header.home") },
    { href: "/sobre", label: t("header.about") },
    { href: "/techs", label: t("header.techs", "Techs") },
    { href: "/projetos", label: t("header.projects") },
    { href: "/contato", label: t("header.contact") },
    { href: "/cv", label: t("header.cv", "CV") },
  ];
  const activeLocale = router.locale ?? "pt";

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale === activeLocale) return;
    void router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale: nextLocale }
    );
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("header.mainMenu", "Menu principal")}
      tabIndex={-1}
      className={`fixed inset-0 z-[9999] bg-white/95 dark:bg-gray-950/95 text-gray-900 dark:text-gray-100 backdrop-blur-2xl transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      } flex flex-col`}
    >
      <div className="flex items-center justify-end px-6 py-5">
        <button
          className="text-3xl p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition focus:outline-none focus:ring-2 ring-teal-400"
          onClick={onClose}
          aria-label={t("header.closeMenu", "Fechar menu")}
        >
          <FaTimes />
        </button>
      </div>
      <nav
        className="flex flex-col items-center gap-8 mt-10 text-2xl font-bold"
        aria-label={t("header.mainMenu", "Menu principal")}
      >
        {menuItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent transition-all duration-300 focus:outline-none focus:ring-2 ring-teal-400"
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-10 flex justify-center gap-6">
        {["pt", "en", "es"].map((lang) => (
          <button
            key={lang}
            onClick={() => handleLocaleChange(lang)}
            title={t("header.changeLanguageTo", { lng: lang.toUpperCase() })}
            aria-label={t("header.language", { lng: lang.toUpperCase() })}
            className="focus:outline-none focus:ring-2 ring-teal-400 rounded-full p-1"
          >
            <Image
              src={flags[lang]}
              alt={`${t("header.flag", "Bandeira")} ${lang.toUpperCase()}`}
              width={30}
              height={20}
            />
          </button>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  );
}

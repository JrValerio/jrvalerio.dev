import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FaGlobe, FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onMenuOpen: () => void;
}

export default function Header({ onMenuOpen }: HeaderProps) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const flags: Record<string, string> = {
    pt: "/flags/br.svg",
    en: "/flags/us.svg",
    es: "/flags/es.svg",
  };

  const navLinks = [
    { href: "/", label: t("header.home") },
    { href: "/sobre", label: t("header.about") },
    { href: "/techs", label: t("header.techs", "Techs") },
    { href: "/projetos", label: t("header.projects") },
    { href: "/contato", label: t("header.contact") },
    {
      href: "/cv",
      label: t("header.cv", "CV"),
      className:
        "text-teal-700 dark:text-teal-300 font-semibold underline underline-offset-4 hover:text-teal-500 dark:hover:text-teal-200",
    },
  ];

  const languages = ["pt", "en", "es"];
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
    <header
      className="w-full bg-white/85 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 flex items-center py-4 px-4 md:px-8 sticky top-0 z-30 backdrop-blur-md shadow-lg transition-colors"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute left-2 top-2 bg-teal-500 text-white rounded px-3 py-1 z-50"
      >
        {t("header.skipToContent", "Pular para conteúdo")}
      </a>
      <nav
        className="hidden md:flex justify-between items-center w-full"
        aria-label={t("header.mainMenu", "Menu principal")}
      >
        <div className="flex gap-8">
          {navLinks.map(({ href, label, className }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={router.pathname === href ? "page" : undefined}
              className={`relative px-2 py-1 transition-colors after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-teal-400 after:to-blue-500 dark:after:from-blue-500 dark:after:to-teal-400 after:rounded-full after:transition-all after:duration-300 hover:after:w-full hover:text-teal-600 dark:hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-blue-500 ${className || ""}`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <FaGlobe
            className="text-gray-500 dark:text-gray-300"
            aria-label={t("header.languageSelector", "Abrir seletor de idiomas")}
            title={t("header.language", "Idioma")}
          />
          {languages.map((lng) => (
            <button
              key={lng}
              onClick={() => handleLocaleChange(lng)}
              aria-label={t("header.changeLanguageTo", { lng: lng.toUpperCase() })}
              title={lng.toUpperCase()}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ring-1 ring-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-blue-500 ${
                activeLocale === lng
                  ? "bg-teal-500 dark:bg-blue-500 text-white font-bold ring-2 ring-teal-400 dark:ring-blue-500"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              <Image
                src={flags[lng]}
                alt={`${t("header.flag", "Bandeira")} ${lng.toUpperCase()}`}
                width={22}
                height={16}
                className="rounded-sm object-cover"
              />
              {lng.toUpperCase()}
            </button>
          ))}
          <ThemeToggle />
        </div>
      </nav>
      <button
        className="flex md:hidden text-2xl p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition ml-auto focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-blue-500"
        onClick={onMenuOpen}
        aria-label={t("header.openMenu", "Abrir menu de navegação")}
      >
        <FaBars />
      </button>
    </header>
  );
}

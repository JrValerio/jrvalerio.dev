import { useTranslation } from "react-i18next";
import { FaGlobe, FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle"; // Certifique-se de ter o componente pronto!

interface HeaderProps {
  onMenuOpen: () => void;
}

export default function Header({ onMenuOpen }: HeaderProps) {
  const { i18n } = useTranslation();

  const flags: Record<string, string> = {
    pt: "/flags/br.svg",
    en: "/flags/us.svg",
    es: "/flags/es.svg",
  };

  return (
    <header className="
      w-full
      bg-black/60 dark:bg-white/90
      text-white dark:text-gray-900
      flex items-center
      py-4 px-4 md:px-8
      sticky top-0 z-30
      backdrop-blur-md shadow-lg
      transition-colors
    ">
      {/* Skip link para acessibilidade (SEO/UX) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute left-2 top-2 bg-teal-500 text-white rounded px-3 py-1 z-50"
      >
        Pular para conteúdo
      </a>

      {/* Links à esquerda / Idiomas + ThemeToggle à direita (Desktop/Tablet) */}
      <nav
        className="hidden md:flex justify-between items-center w-full"
        aria-label="Principal"
      >
        {/* Links */}
        <div className="flex gap-8">
          {[
            { href: "/", label: "Home" },
            { href: "/sobre", label: "Sobre" },
            { href: "/projetos", label: "Projetos" },
            { href: "/contato", label: "Contato" },
            { href: "/cv", label: "CV", className: "text-teal-400 dark:text-blue-700 font-semibold underline underline-offset-4" },
          ].map(({ href, label, className }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={`
                relative px-2 py-1 transition-colors
                after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px]
                after:bg-gradient-to-r after:from-teal-400 after:to-blue-500
                dark:after:from-blue-500 dark:after:to-teal-400
                after:rounded-full after:transition-all after:duration-300 hover:after:w-full
                hover:text-teal-300 dark:hover:text-blue-600
                ${className || ""}
              `}
            >
              {label}
            </Link>
          ))}
        </div>
        {/* Idiomas + ThemeToggle */}
        <div className="flex items-center gap-4">
          <FaGlobe
            className="text-gray-400 dark:text-gray-600"
            aria-label="Abrir seletor de idiomas"
            title="Idioma"
          />
          {["pt", "en", "es"].map((lng) => (
            <button
              key={lng}
              aria-label={`Mudar idioma para ${lng.toUpperCase()}`}
              title={lng.toUpperCase()}
              onClick={() => i18n.changeLanguage(lng)}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded
                transition-colors ring-1 ring-transparent
                focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-blue-500
                ${i18n.language === lng
                  ? "bg-teal-500 dark:bg-blue-500 text-white font-bold ring-2 ring-teal-400 dark:ring-blue-500"
                  : "text-gray-300 dark:text-gray-700 hover:bg-gray-700 dark:hover:bg-gray-200" }
              `}
              tabIndex={0}
            >
              <Image
                src={flags[lng]}
                alt={lng}
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

      {/* Hamburger Icon (Mobile) */}
      <button
        className="flex md:hidden text-2xl p-2 hover:bg-black/30 dark:hover:bg-gray-200 rounded transition ml-auto focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-blue-500"
        onClick={onMenuOpen}
        aria-label="Abrir menu de navegação"
        tabIndex={0}
      >
        <FaBars />
      </button>
    </header>
  );
}

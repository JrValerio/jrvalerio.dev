import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaTimes } from "react-icons/fa";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const { t, i18n } = useTranslation("common");
  const flags: Record<string, string> = {
    pt: "/flags/br.svg",
    en: "/flags/us.svg",
    es: "/flags/es.svg",
  };

  return (
    <div
      className={`
      fixed inset-0 z-[9999]
      bg-black/90
      dark:bg-gray-950/95 dark:text-gray-100
      backdrop-blur-2xl transition-opacity duration-300
      ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      flex flex-col
    `}
    >
      <div className="flex items-center justify-end px-6 py-5">
        <button
          className="text-3xl p-2 hover:bg-black/30 dark:hover:bg-gray-200 rounded transition"
          onClick={onClose}
          aria-label="Fechar menu"
        >
          <FaTimes />
        </button>
      </div>
      <nav className="flex flex-col items-center gap-8 mt-10 text-2xl font-bold">
        <Link
          href="/"
          onClick={onClose}
          className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent transition-all duration-300"
        >
          {t("header.home")}
        </Link>
        <Link
          href="/sobre"
          onClick={onClose}
          className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent transition-all duration-300"
        >
          {t("header.about")}
        </Link>
        <Link
          href="/techs"
          onClick={onClose}
          className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent transition-all duration-300"
        >
          {t("header.techs")}
        </Link>
        <Link
          href="/projetos"
          onClick={onClose}
          className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent transition-all duration-300"
        >
          {t("header.projects")}
        </Link>
        <Link
          href="/contato"
          onClick={onClose}
          className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent transition-all duration-300"
        >
          {t("header.contact")}
        </Link>
        <Link
          href="/cv"
          className="text-teal-400 dark:text-blue-700 font-semibold underline underline-offset-4 hover:text-teal-300 dark:hover:text-blue-600 transition"
          onClick={onClose}
        >
          CV
        </Link>
      </nav>
      <div className="flex flex-col items-center gap-4 mt-10">
        <div className="flex items-center gap-3">
          <FaGlobe
            className="text-gray-400 dark:text-gray-600"
            aria-label="Abrir seletor de idiomas"
          />
          {["pt", "en", "es"].map((lng) => (
            <button
              key={lng}
              aria-label={`Mudar idioma para ${lng.toUpperCase()}`}
              onClick={() => {
                i18n.changeLanguage(lng);
                onClose();
              }}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded
                transition-colors ring-1 ring-transparent
                focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-blue-500
                ${
                  i18n.language === lng
                    ? "bg-teal-500 dark:bg-blue-500 text-white font-bold ring-2 ring-teal-400 dark:ring-blue-500"
                    : "text-gray-300 dark:text-gray-700 hover:bg-gray-700 dark:hover:bg-gray-200"
                }
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
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}

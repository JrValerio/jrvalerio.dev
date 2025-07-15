import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
  const { i18n } = useTranslation();

const flags: Record<string, string> = {
  pt: "/flags/br.svg",
  en: "/flags/us.svg",
  es: "/flags/es.svg",
};

  return (
    <header className="w-full bg-black/60 text-white flex justify-between items-center py-4 px-8 sticky top-0 z-30 backdrop-blur-md shadow">
      <nav className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/sobre">Sobre</Link>
        <Link href="/projetos">Projetos</Link>
        <Link href="/contato">Contato</Link>
        <Link
          href="/cv"
          className="text-teal-400 font-semibold underline underline-offset-4 hover:text-teal-300 transition"
        >
          CV
        </Link>
      </nav>

      {/* Seletor de idioma */}
      <div className="flex items-center gap-2 print:hidden">
        <FaGlobe className="text-gray-400" />
        {["pt", "en", "es"].map((lng) => (
          <button
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
              i18n.language === lng
                ? "bg-teal-500 text-white font-bold"
                : "text-gray-300 hover:bg-gray-700 transition-colors"
            }`}
          >
            <Image
              src={flags[lng]}
              alt={lng}
              width={20}
              height={20}
              className="rounded-sm"
            />
            {lng.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}

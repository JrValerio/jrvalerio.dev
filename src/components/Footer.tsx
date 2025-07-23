import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="
      flex flex-col md:flex-row justify-between items-center gap-2
      p-6 mt-16 text-xs tracking-wide
      bg-black/90 dark:bg-gray-900/90
      border-t border-gray-800 dark:border-gray-700
      text-gray-400 dark:text-gray-500
    ">
      <span>
        © {new Date().getFullYear()} Amaro Júnior (JrValerio).
        {" "}{t("footer.rights", { defaultValue: "Todos os direitos reservados." })}
      </span>
      <div className="flex gap-4">
        <a
          href="https://github.com/JrValerio"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-400 transition-colors"
        >
          <FaGithub className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/jrvalerio/"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}

import { useTranslation } from "next-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <footer
      className="flex flex-col md:flex-row justify-between items-center gap-2 p-6 mt-16 text-xs tracking-wide bg-white/85 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
      itemScope
      itemType="http://schema.org/Person"
    >
      <span>
        © {year}{" "}
        <span itemProp="name">Amaro Júnior (JrValerio)</span>.{" "}
        {t("footer.rights", "Todos os direitos reservados.")}
      </span>
      <meta itemProp="url" content="https://jrvalerio.dev" />
      <div className="flex gap-4">
        <a
          href="https://github.com/JrValerio"
          aria-label="GitHub"
          title="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-400 transition-colors"
          itemProp="sameAs"
        >
          <FaGithub className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/jrvalerio/"
          aria-label="LinkedIn"
          title="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
          itemProp="sameAs"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}

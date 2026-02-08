import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  classNameExtra?: string;
}

export default function ThemeToggle({ classNameExtra = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !resolvedTheme) return;

    // Aplica a classe no <html>
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(resolvedTheme);

    // Persistência extra (opcional, para depuração ou controle manual)
    localStorage.setItem("theme", resolvedTheme);
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme); // redundância segura
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Modo claro" : "Modo escuro"}
      className={`p-2 rounded-full border border-gray-300 dark:border-gray-500
        hover:bg-gray-200 dark:hover:bg-gray-800
        transition-colors duration-300 ease-in-out
        shadow focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-blue-500
        focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-950
        flex items-center justify-center
        ${classNameExtra}`}
      tabIndex={0}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-200 scale-100" />
      ) : (
        <Moon className="w-5 h-5 text-blue-500 transition-transform duration-200 scale-100" />
      )}
    </button>
  );
}

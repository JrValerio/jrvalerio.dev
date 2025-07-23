import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={resolvedTheme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      title={resolvedTheme === "dark" ? "Modo claro" : "Modo escuro"}
      className="
        p-2 rounded-full border border-gray-300 dark:border-gray-500
        hover:bg-gray-200 dark:hover:bg-gray-800
        transition-colors shadow
        focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-blue-500
        flex items-center justify-center
      "
      tabIndex={0}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-blue-500" />
      )}
    </button>
  );
}

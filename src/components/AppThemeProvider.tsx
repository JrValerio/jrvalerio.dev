"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type AppThemeProviderProps = {
  children: ReactNode;
};

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={["light", "dark"]}
    >
      {children}
    </ThemeProvider>
  );
}

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MenuOverlay from "./MenuOverlay";
import BackgroundCanvas from "./BackgroundCanvas";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  return (
    <div
      className="
        relative isolate min-h-screen w-full flex flex-col
        bg-gradient-to-br
        from-gray-100 via-gray-300 to-gray-100
        dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
        transition-colors duration-500
      "
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-0 left-0 bg-black text-white p-2 z-50"
      >
        Ir para o conteudo principal
      </a>

      <BackgroundCanvas />

      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main
        className="flex-1 w-full relative z-10 flex flex-col"
        id="main-content"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}

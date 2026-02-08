import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "next-themes";
import Header from "./Header";
import Footer from "./Footer";
import MenuOverlay from "./MenuOverlay";

const Particles = dynamic(() => import("@tsparticles/react"), { ssr: false });

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolvedTheme || "light");
  }, [resolvedTheme]);

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

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);

    setReduceMotion(mq.matches);
    mq.addEventListener("change", handleChange);

    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const particlesOptions = {
    background: { color: "#000000" },
    fullScreen: { enable: false },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.7 } },
        push: { quantity: 2 },
      },
    },
    particles: {
      color: { value: ["#00ffff", "#14e5c6", "#3b82f6"] },
      links: {
        enable: true,
        color: "#14e5c6",
        distance: 140,
        opacity: 0.6,
        width: 1.2,
        triangles: { enable: true, opacity: 0.16 },
      },
      move: {
        enable: true,
        speed: 1.4,
        outModes: { default: "bounce" },
      },
      number: { value: 98, density: { enable: true } },
      opacity: { value: 0.82 },
      shape: { type: "circle" },
      size: { value: { min: 1.5, max: 3.5 } },
      zIndex: { value: 5 },
    },
  } satisfies ISourceOptions;

  return (
    <div
      className="
        relative min-h-screen w-full flex flex-col
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

      {!reduceMotion && (
        <Particles
          id="tsparticles-global"
          className="fixed inset-0 -z-10 pointer-events-none"
          options={particlesOptions}
        />
      )}

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

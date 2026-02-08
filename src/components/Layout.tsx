import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { ISourceOptions } from "@tsparticles/engine";
import { useRouter } from "next/router";
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [particlesReady, setParticlesReady] = useState(false);
  const { resolvedTheme } = useTheme();
  const router = useRouter();

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

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

    setIsDesktop(mq.matches);
    mq.addEventListener("change", handleChange);

    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function initParticles() {
      const [{ initParticlesEngine }, { loadSlim }] = await Promise.all([
        import("@tsparticles/react"),
        import("@tsparticles/slim"),
      ]);

      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });

      if (!cancelled) {
        setParticlesReady(true);
      }
    }

    void initParticles();

    return () => {
      cancelled = true;
    };
  }, []);

  const shouldRenderParticles =
    particlesReady && router.pathname === "/" && isDesktop && !reduceMotion;

  const isDark = resolvedTheme === "dark";

  const particlesOptions = useMemo(
    () =>
      ({
        fullScreen: { enable: false },
        detectRetina: false,
        fpsLimit: 36,
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: false },
          },
          modes: {
            grab: {
              distance: 130,
              links: { opacity: isDark ? 0.24 : 0.18 },
            },
          },
        },
        particles: {
          color: {
            value: isDark
              ? ["#67e8f9", "#22d3ee", "#38bdf8"]
              : ["#06b6d4", "#0ea5e9", "#14b8a6"],
          },
          links: {
            enable: true,
            color: isDark ? "#22d3ee" : "#0ea5e9",
            distance: 125,
            opacity: isDark ? 0.2 : 0.14,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.35,
            outModes: { default: "out" },
          },
          number: {
            value: 30,
            density: { enable: true, width: 1200, height: 800 },
          },
          opacity: { value: { min: 0.12, max: 0.3 } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2.2 } },
        },
      }) satisfies ISourceOptions,
    [isDark]
  );

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

      {shouldRenderParticles && (
        <Particles
          id="tsparticles-global"
          className="absolute inset-0 z-0 pointer-events-none opacity-70 dark:opacity-90"
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

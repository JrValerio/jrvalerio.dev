import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Particles from "@tsparticles/react";
import MenuOverlay from "./MenuOverlay";

const defaultTitle = "Portfólio - Amaro Júnior (JrValerio)";
const defaultDescription =
  "Portfólio moderno, acessível e internacionalizado de Amaro Júnior. Projetos em Next.js, React, TypeScript, Tailwind e integração com GitHub/LinkedIn.";
const defaultURL = "https://jrvalerio.dev/";
const defaultImage = "/img/perfil.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
      <Head>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:url" content={defaultURL} />
        <meta property="og:image" content={defaultImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={defaultTitle} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={defaultImage} />
        <link rel="canonical" href={defaultURL} />
      </Head>
      <Particles
        id="tsparticles-global"
        className="fixed inset-0 -z-10 pointer-events-none"
        options={{
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
              outModes: "bounce",
            },
            number: { value: 98, density: { enable: true } },
            opacity: { value: 0.82 },
            shape: { type: "circle" },
            size: { value: { min: 1.5, max: 3.5 } },
            zIndex: { value: 5 },
          },
        }}
      />
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

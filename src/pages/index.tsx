import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Particles from "@tsparticles/react";
import Image from "next/image";

export default function Home() {
  const { t, ready } = useTranslation("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (ready) {
      document.title = t("pageTitles.home");
    }
  }, [ready]);

  if (!mounted || !ready) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <Particles
        id="tsparticles-main"
        className="absolute inset-0 z-0"
        options={{
          background: { color: "#000000" },
          fullScreen: { enable: false },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "push" }
            },
            modes: {
              grab: {
                distance: 160,
                links: { opacity: 0.7 }
              },
              push: { quantity: 2 }
            }
          },
          particles: {
            color: { value: ["#00ffff", "#14e5c6", "#3b82f6"] },
            links: {
              enable: true,
              color: "#14e5c6",
              distance: 140,
              opacity: 0.6,
              width: 1.2,
              triangles: { enable: true, opacity: 0.16 }
            },
            move: {
              enable: true,
              speed: 1.4,
              outModes: "bounce",
            },
            number: {
              value: 98,
              density: { enable: true },
            },
            opacity: { value: 0.82 },
            shape: { type: "circle" },
            size: {
              value: { min: 1.5, max: 3.5 }
            },
            zIndex: { value: 5 },
          },
        }}
      />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl mx-auto px-6 py-20 items-center">
        {/* Texto chamativo à esquerda */}
        <div className="text-center md:text-left flex flex-col gap-10 items-center md:items-start">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-xl drop-shadow-xl animate-fade-in-up">
            {t("home.hero")}
          </h1>
          <div className="hidden md:block h-2 w-32 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full opacity-70 animate-glow" />
        </div>
        {/* Foto à direita */}
        <div className="flex justify-center md:justify-end items-center">
          <Image
            src="/img/perfil.png"
            alt="Amaro Júnior"
            width={340}
            height={340}
            className="rounded-full border-4 border-teal-400 shadow-2xl hover:scale-105 transition-transform duration-500 bg-gray-900 object-cover animate-fade-in"
            priority
          />
        </div>
      </div>
    </section>
  );
}

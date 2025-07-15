import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Particles from "@tsparticles/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">

      {/* Background animado global */}
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
      <Header />
      {/* Main rola o conteúdo e mantém footer ao final */}
      <main className="flex-1 w-full relative z-10 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

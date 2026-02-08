import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

export default function HeroSection() {
  const { t } = useTranslation("common");
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMqChange = (event: MediaQueryListEvent) =>
      setIsMobile(event.matches);
    const handleRmqChange = (event: MediaQueryListEvent) =>
      setReduceMotion(event.matches);
    setIsMobile(mq.matches);
    setReduceMotion(rmq.matches);
    mq.addEventListener("change", handleMqChange);
    rmq.addEventListener("change", handleRmqChange);
    return () => {
      mq.removeEventListener("change", handleMqChange);
      rmq.removeEventListener("change", handleRmqChange);
    };
  }, []);

  const typewriterStrings = t(
    isMobile ? "home.heroTypewriterMobile" : "home.heroTypewriterDesktop",
    { returnObjects: true }
  ) as string[];

  const typewriterOptions = {
    strings: typewriterStrings,
    autoStart: true,
    loop: true,
    delay: 38,
    deleteSpeed: 20,
    cursor: "|",
  };

  const imageAlt = t("home.heroImageAlt", "Amaro Júnior");

  return (
    <>
      <section
        className="
        hidden md:flex flex-row items-center justify-center gap-x-32
        w-full max-w-7xl mx-auto min-h-full
        px-0 md:px-8 overflow-hidden
      "
      >
        <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-0 min-h-0">
          <h1
            className={`
            text-3xl md:text-5xl font-bold leading-tight mb-8 max-w-xl text-center
            bg-gradient-to-r from-teal-300 via-blue-400 to-fuchsia-500
            bg-clip-text text-transparent drop-shadow-xl
            ${reduceMotion ? "" : "animate-gradient-x"}
          `}
          >
            <Typewriter options={typewriterOptions} />
          </h1>
          <div
            className={`
            h-2 w-32 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full opacity-80 mb-8
            ${reduceMotion ? "" : "animate-glow"}
          `}
          />
        </div>

        <div className="relative flex-1 flex justify-center items-center min-h-0">
          <div className="relative w-full md:w-[420px] aspect-[9/16] flex items-center justify-center pr-8 overflow-hidden">
            <Image
              src="/img/perfil2.png"
              alt={imageAlt}
              fill
              className="object-cover rounded-none md:rounded-l-full shadow-2xl border-4 border-teal-400"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section
        className={`
        flex md:hidden flex-col items-center justify-start
        w-full px-4 py-8
        min-h-full
        bg-transparent
      `}
      >
        <div className="w-60 h-70 mb-6 mx-auto relative">
          <Image
            src="/img/perfil2.png"
            alt={imageAlt}
            fill
            className="object-cover rounded-2xl shadow-2xl border-4 border-teal-400"
            priority
            sizes="90vw"
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <h1
            className={`
            text-2xl font-bold leading-tight mb-6 max-w-xs text-center
            bg-gradient-to-r from-teal-300 via-blue-400 to-fuchsia-500
            bg-clip-text text-transparent
            ${reduceMotion ? "" : "animate-gradient-x"}
          `}
          >
            <Typewriter options={typewriterOptions} />
          </h1>
          <div
            className={`
            h-2 w-24 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full opacity-80 mb-6
            ${reduceMotion ? "" : "animate-glow"}
          `}
          />
        </div>
      </section>
    </>
  );
}

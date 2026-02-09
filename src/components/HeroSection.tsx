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
        hidden md:flex md:flex-1 flex-row items-stretch justify-between gap-x-14
        w-full max-w-7xl mx-auto h-full
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

        <div className="relative flex-1 flex justify-end items-end min-h-0">
          <div className="relative w-[min(49vw,620px)] h-[min(100%,760px)]">
            <div className="absolute inset-x-3 bottom-0 h-[90%] rounded-t-[280px] border border-teal-400/40 bg-gradient-to-b from-teal-200/25 via-white/10 to-transparent dark:from-cyan-400/18 dark:via-slate-900/10 dark:to-transparent shadow-[0_12px_28px_rgba(15,23,42,0.18)]" />
            <Image
              src="/img/perfil-hero-nobg.png"
              alt={imageAlt}
              fill
              className="object-contain object-bottom drop-shadow-[0_14px_26px_rgba(15,23,42,0.18)]"
              priority
              sizes="(max-width: 1024px) 44vw, 620px"
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
        <div className="w-72 h-[27rem] max-w-[92vw] mb-6 mx-auto relative">
          <div className="absolute inset-x-2 bottom-0 h-[88%] rounded-t-[180px] border border-teal-400/35 bg-gradient-to-b from-teal-200/25 via-white/10 to-transparent dark:from-cyan-400/15 dark:via-slate-900/8 dark:to-transparent" />
          <Image
            src="/img/perfil-hero-nobg.png"
            alt={imageAlt}
            fill
            className="object-contain object-bottom drop-shadow-[0_10px_18px_rgba(15,23,42,0.18)]"
            priority
            sizes="(max-width: 768px) 92vw, 420px"
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

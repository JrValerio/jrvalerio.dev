"use client";

/**
 * Legacy v1 portfolio — archived showcase.
 *
 * Self-contained Client Component with no App Router shell (no V2LayoutShell)
 * and no external dependencies beyond next/image and the local useTypewriter hook.
 *
 * Route: /legacy (middleware bypass configured in middleware.ts line 51)
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTypewriter } from "../../hooks/useTypewriter";

const STRINGS_DESKTOP = [
  "Full Stack Developer",
  "React & Next.js",
  "TypeScript Enthusiast",
  "UI / UX minded engineer",
];

const STRINGS_MOBILE = ["Full Stack Dev", "React & Next.js", "TypeScript"];

export default function LegacyPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMq = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleRmq = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    setIsMobile(mq.matches);
    setReduceMotion(rmq.matches);
    mq.addEventListener("change", handleMq);
    rmq.addEventListener("change", handleRmq);
    return () => {
      mq.removeEventListener("change", handleMq);
      rmq.removeEventListener("change", handleRmq);
    };
  }, []);

  const strings = isMobile ? STRINGS_MOBILE : STRINGS_DESKTOP;
  // When prefers-reduced-motion: show the first string statically
  const text = useTypewriter(reduceMotion ? [] : strings, 60);
  const displayed = reduceMotion ? strings[0] : text;

  const heading = (
    <span>
      {displayed}
      {!reduceMotion && (
        <span className="animate-pulse text-teal-400" aria-hidden="true">
          |
        </span>
      )}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* ── Archive banner ─────────────────────────────────────────────── */}
      <div className="w-full bg-amber-500/10 border-b border-amber-500/30 text-amber-300 text-center text-xs py-2 px-4">
        📦 Portfolio v1 — versão arquivada &nbsp;·&nbsp;{" "}
        <Link href="/v2" className="underline hover:text-amber-100 transition-colors">
          Ver versão atual →
        </Link>
      </div>

      {/* ── Desktop hero ────────────────────────────────────────────────── */}
      <section className="hidden md:flex flex-1 flex-row items-stretch justify-between gap-x-14 w-full max-w-7xl mx-auto h-full px-8 overflow-hidden">
        <div className="flex-1 flex flex-col justify-center items-center px-0 min-h-0">
          <h1
            className={`
              text-3xl md:text-5xl font-bold leading-tight mb-8 max-w-xl text-center
              bg-gradient-to-r from-teal-300 via-blue-400 to-fuchsia-500
              bg-clip-text text-transparent drop-shadow-xl
              ${reduceMotion ? "" : "animate-gradient-x"}
            `}
          >
            {heading}
          </h1>
          <div
            className={`h-2 w-32 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full opacity-80 mb-8 ${
              reduceMotion ? "" : "animate-glow"
            }`}
          />
        </div>

        <div className="relative flex-1 flex justify-end items-end min-h-0">
          <div className="relative w-[min(46vw,560px)] h-[min(100%,760px)] overflow-hidden rounded-t-[240px] border border-teal-400/45 shadow-[0_14px_28px_rgba(15,23,42,0.18)]">
            <Image
              src="/img/perfil-hero.png"
              alt="Amaro Júnior"
              fill
              className="relative z-0 object-cover object-[56%_18%]"
              priority
              sizes="(max-width: 1024px) 44vw, 620px"
            />
            <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 dark:opacity-100 bg-[radial-gradient(circle_at_50%_10%,rgba(34,211,238,0.18),rgba(30,41,59,0.08)_48%,rgba(2,6,23,0.3)_100%)]" />
          </div>
        </div>
      </section>

      {/* ── Mobile hero ─────────────────────────────────────────────────── */}
      <section className="flex md:hidden flex-col items-center justify-start w-full px-4 py-8 min-h-full bg-transparent">
        <div className="w-72 h-[27rem] max-w-[92vw] mb-6 mx-auto relative overflow-hidden rounded-t-[180px] border border-teal-400/40 shadow-[0_10px_22px_rgba(15,23,42,0.14)]">
          <Image
            src="/img/perfil-hero.png"
            alt="Amaro Júnior"
            fill
            className="relative z-0 object-cover object-[54%_15%]"
            priority
            sizes="(max-width: 768px) 92vw, 420px"
          />
          <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 dark:opacity-100 bg-[radial-gradient(circle_at_50%_10%,rgba(34,211,238,0.16),rgba(30,41,59,0.08)_48%,rgba(2,6,23,0.28)_100%)]" />
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
            {heading}
          </h1>
          <div
            className={`h-2 w-24 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full opacity-80 mb-6 ${
              reduceMotion ? "" : "animate-glow"
            }`}
          />
        </div>
      </section>
    </div>
  );
}

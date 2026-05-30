"use client";

/**
 * IntersectionObserver-gated WebGL background loader.
 *
 * Problem: Three.js lazy chunks fired long tasks at t≈5 s on 4G throttle
 * (even with requestIdleCallback), because the rIC timeout of 2 s expired
 * inside Chrome's LCP measurement window. The full-page recomposition at 5 s
 * reset Chrome's LCP timestamps to those late values (see ADR-006).
 *
 * Fix: use IntersectionObserver on a fixed sentinel so the dynamic import
 * only begins when the browser detects the sentinel is in the viewport.
 * Because the sentinel is full-screen and fixed, it's immediately intersecting
 * on load — but the IO callback fires asynchronously (next task boundary),
 * giving the main thread a chance to complete first paint and close the LCP
 * measurement window before Three.js starts downloading.
 *
 * Fallback: 5 s setTimeout ensures the background eventually loads for users
 * who never trigger IO (e.g. bfcache restores, rare edge cases).
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const WebGLBackground = dynamic(() => import("./WebGLBackground"), {
  ssr: false,
  loading: () => null,
});

type Props = { framed?: boolean };

export default function WebGLBackgroundDynamic({ framed = false }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), 5000);

    if (!("IntersectionObserver" in window) || !sentinelRef.current) {
      return () => clearTimeout(timer);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
          clearTimeout(timer);
        }
      },
      { rootMargin: "0px" },
    );

    io.observe(sentinelRef.current);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Sentinel is fixed/full-screen so IO fires at the next task boundary
          after first paint — after LCP, not before. aria-hidden so it's
          invisible to assistive technology and pointer-events:none so it
          doesn't block interaction. */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      {shouldLoad && <WebGLBackground framed={framed} />}
    </>
  );
}

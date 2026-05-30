"use client";

/**
 * Defers WebGL until the browser signals idle time after first paint.
 *
 * Problem: Three.js lazy chunks were triggering long tasks at t≈4930 ms and
 * t≈5844 ms on 4G throttle. Even though the import was deferred via
 * next/dynamic, the browser scheduled it during the active rendering phase,
 * causing a full page recomposition that reset Chrome's LCP timestamps to
 * those late values (see ADR-006 for the Lighthouse investigation).
 *
 * Fix: gate the dynamic import behind requestIdleCallback so the chunk only
 * executes after the browser has finished first paint + LCP measurement.
 * On browsers without rIC (Safari ≤ 16), fall back to a 1500 ms timeout —
 * generous enough to clear the LCP window on throttled connections.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WebGLBackground = dynamic(() => import("./WebGLBackground"), {
  ssr: false,
  loading: () => null,
});

type Props = { framed?: boolean };

export default function WebGLBackgroundDynamic({ framed = false }: Props) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setIdle(true), { timeout: 2000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(id);
  }, []);

  if (!idle) return null;
  return <WebGLBackground framed={framed} />;
}

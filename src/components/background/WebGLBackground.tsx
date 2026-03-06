"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const BackgroundCanvas = dynamic(() => import("../BackgroundCanvas"), {
  ssr: false,
});

export default function WebGLBackground() {
  const { resolvedTheme } = useTheme();
  if (!resolvedTheme) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="jr-webgl-background" aria-hidden="true">
      <BackgroundCanvas isDark={isDark} />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const BackgroundCanvas = dynamic(() => import("../BackgroundCanvas"), {
  ssr: false,
});

type WebGLBackgroundProps = {
  framed?: boolean;
};

export default function WebGLBackground({ framed = false }: WebGLBackgroundProps) {
  const { resolvedTheme } = useTheme();
  if (!resolvedTheme) {
    return null;
  }

  const isDark = resolvedTheme === "dark";
  const className = framed
    ? "jr-webgl-background jr-webgl-background--framed"
    : "jr-webgl-background";

  return (
    <div className={className} aria-hidden="true">
      <BackgroundCanvas isDark={isDark} />
    </div>
  );
}

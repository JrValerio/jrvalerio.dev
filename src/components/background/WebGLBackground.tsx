"use client";

import dynamic from "next/dynamic";

const BackgroundCanvas = dynamic(() => import("../BackgroundCanvas"), {
  ssr: false,
});

export default function WebGLBackground() {
  return (
    <div className="jr-webgl-background" aria-hidden="true">
      <BackgroundCanvas />
    </div>
  );
}

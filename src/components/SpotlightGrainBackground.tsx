import { useEffect, useRef } from "react";

type SpotlightGrainBackgroundProps = {
  isDark: boolean;
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  active: boolean;
  lastMoveAt: number;
};

const POINTER_EASE = 0.14;
const POINTER_FRICTION = 0.8;
const IDLE_TIMEOUT_MS = 1400;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function buildNoiseTexture(isDark: boolean): HTMLCanvasElement {
  const size = 96;
  const texture = document.createElement("canvas");
  texture.width = size;
  texture.height = size;

  const context = texture.getContext("2d");
  if (!context) {
    return texture;
  }

  const ctx = context;
  const image = ctx.createImageData(size, size);
  const data = image.data;

  for (let i = 0; i < data.length; i += 4) {
    const grain = Math.floor(Math.random() * 255);
    if (isDark) {
      data[i] = 180 + Math.floor(grain * 0.2);
      data[i + 1] = 220 + Math.floor(grain * 0.12);
      data[i + 2] = 255;
      data[i + 3] = 12 + Math.floor(Math.random() * 24);
    } else {
      data[i] = 30 + Math.floor(grain * 0.1);
      data[i + 1] = 55 + Math.floor(grain * 0.08);
      data[i + 2] = 80 + Math.floor(grain * 0.07);
      data[i + 3] = 8 + Math.floor(Math.random() * 18);
    }
  }

  ctx.putImageData(image, 0, 0);
  return texture;
}

export default function SpotlightGrainBackground({
  isDark,
}: SpotlightGrainBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;

    const context = canvasEl.getContext("2d");
    if (!context) return;
    const ctx = context;

    const parentEl = canvasEl.parentElement;
    if (!parentEl) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;

    const pointer: PointerState = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      vx: 0,
      vy: 0,
      active: false,
      lastMoveAt: 0,
    };

    const noiseTexture = buildNoiseTexture(isDark);
    let noisePattern: CanvasPattern | null = null;

    function resizeCanvas() {
      const parent = canvasEl.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvasEl.width = Math.max(1, Math.floor(width * dpr));
      canvasEl.height = Math.max(1, Math.floor(height * dpr));
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      noisePattern = ctx.createPattern(noiseTexture, "repeat");

      const centerX = width / 2;
      const centerY = height / 2;
      pointer.x = centerX;
      pointer.y = centerY;
      pointer.targetX = centerX;
      pointer.targetY = centerY;
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvasEl.getBoundingClientRect();
      pointer.targetX = clamp(event.clientX - rect.left, 0, width);
      pointer.targetY = clamp(event.clientY - rect.top, 0, height);
      pointer.active = true;
      pointer.lastMoveAt = performance.now();
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function drawSpotlight(now: number) {
      const idle = !pointer.active && now - pointer.lastMoveAt > IDLE_TIMEOUT_MS;
      if (idle) {
        pointer.targetX += (width * 0.5 - pointer.targetX) * 0.03;
        pointer.targetY += (height * 0.5 - pointer.targetY) * 0.03;
      }

      pointer.vx += (pointer.targetX - pointer.x) * POINTER_EASE;
      pointer.vy += (pointer.targetY - pointer.y) * POINTER_EASE;
      pointer.vx *= POINTER_FRICTION;
      pointer.vy *= POINTER_FRICTION;
      pointer.x += pointer.vx;
      pointer.y += pointer.vy;

      const speed = Math.hypot(pointer.vx, pointer.vy);
      const glowBoost = clamp(0.12 + speed * 2.4, 0.12, 0.4);
      const mainRadius = Math.min(width, height) * 0.34;
      const trailRadius = mainRadius * 1.7;
      const trailX = clamp(pointer.x - pointer.vx * 28, 0, width);
      const trailY = clamp(pointer.y - pointer.vy * 28, 0, height);

      ctx.clearRect(0, 0, width, height);

      const atmosphere = ctx.createLinearGradient(0, 0, width, height);
      if (isDark) {
        atmosphere.addColorStop(0, "rgba(8, 47, 73, 0.18)");
        atmosphere.addColorStop(1, "rgba(10, 20, 45, 0.05)");
      } else {
        atmosphere.addColorStop(0, "rgba(34, 211, 238, 0.05)");
        atmosphere.addColorStop(1, "rgba(37, 99, 235, 0.04)");
      }
      ctx.fillStyle = atmosphere;
      ctx.fillRect(0, 0, width, height);

      const trail = ctx.createRadialGradient(trailX, trailY, 0, trailX, trailY, trailRadius);
      if (isDark) {
        trail.addColorStop(0, `rgba(34, 211, 238, ${0.08 + glowBoost * 0.32})`);
        trail.addColorStop(0.55, "rgba(56, 189, 248, 0.05)");
      } else {
        trail.addColorStop(0, `rgba(14, 165, 233, ${0.06 + glowBoost * 0.22})`);
        trail.addColorStop(0.52, "rgba(45, 212, 191, 0.04)");
      }
      trail.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = trail;
      ctx.fillRect(0, 0, width, height);

      const main = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        mainRadius
      );
      if (isDark) {
        main.addColorStop(0, `rgba(34, 211, 238, ${0.16 + glowBoost * 0.4})`);
        main.addColorStop(0.44, "rgba(56, 189, 248, 0.1)");
      } else {
        main.addColorStop(0, `rgba(14, 165, 233, ${0.12 + glowBoost * 0.28})`);
        main.addColorStop(0.45, "rgba(20, 184, 166, 0.07)");
      }
      main.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = main;
      ctx.fillRect(0, 0, width, height);

      if (noisePattern) {
        const shiftX = ((now * 0.02) % 96) - 96;
        const shiftY = ((now * 0.015) % 96) - 96;
        ctx.save();
        ctx.globalCompositeOperation = isDark ? "screen" : "multiply";
        ctx.globalAlpha = isDark ? 0.11 : 0.07;
        ctx.translate(shiftX, shiftY);
        ctx.fillStyle = noisePattern;
        ctx.fillRect(-shiftX, -shiftY, width, height);
        ctx.restore();
      }

      frameId = window.requestAnimationFrame(drawSpotlight);
    }

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(parentEl);

    resizeCanvas();
    pointer.lastMoveAt = performance.now();
    frameId = window.requestAnimationFrame(drawSpotlight);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("blur", onPointerLeave);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      window.cancelAnimationFrame(frameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-95"
      aria-hidden="true"
    />
  );
}

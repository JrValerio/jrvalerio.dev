import { useEffect, useRef } from "react";

type CursorWebBackgroundProps = {
  isDark: boolean;
};

const POINTER_EASE = 0.17;
const POINTER_DAMPING = 0.81;

type HaloCircle = {
  baseRadius: number;
  radiusBoost: number;
  centerAlphaDark: number;
  centerAlphaLight: number;
  edgeAlphaDark: number;
  edgeAlphaLight: number;
  offsetX: number;
  offsetY: number;
  parallax: number;
  drift: number;
  speed: number;
  phase: number;
};

const HALO_CIRCLES: HaloCircle[] = [
  {
    baseRadius: 148,
    radiusBoost: 28,
    centerAlphaDark: 0.24,
    centerAlphaLight: 0.18,
    edgeAlphaDark: 0.1,
    edgeAlphaLight: 0.08,
    offsetX: 0,
    offsetY: 0,
    parallax: 0.48,
    drift: 8,
    speed: 0.00066,
    phase: 0.4,
  },
  {
    baseRadius: 122,
    radiusBoost: 24,
    centerAlphaDark: 0.19,
    centerAlphaLight: 0.14,
    edgeAlphaDark: 0.08,
    edgeAlphaLight: 0.062,
    offsetX: -168,
    offsetY: -84,
    parallax: 0.44,
    drift: 22,
    speed: 0.00052,
    phase: 1.1,
  },
  {
    baseRadius: 136,
    radiusBoost: 24,
    centerAlphaDark: 0.17,
    centerAlphaLight: 0.13,
    edgeAlphaDark: 0.07,
    edgeAlphaLight: 0.056,
    offsetX: 174,
    offsetY: 98,
    parallax: 0.42,
    drift: 24,
    speed: 0.00048,
    phase: 2.2,
  },
  {
    baseRadius: 104,
    radiusBoost: 18,
    centerAlphaDark: 0.16,
    centerAlphaLight: 0.12,
    edgeAlphaDark: 0.064,
    edgeAlphaLight: 0.05,
    offsetX: 205,
    offsetY: -116,
    parallax: 0.38,
    drift: 18,
    speed: 0.00058,
    phase: 2.9,
  },
  {
    baseRadius: 98,
    radiusBoost: 18,
    centerAlphaDark: 0.15,
    centerAlphaLight: 0.11,
    edgeAlphaDark: 0.06,
    edgeAlphaLight: 0.045,
    offsetX: -220,
    offsetY: 112,
    parallax: 0.36,
    drift: 19,
    speed: 0.00054,
    phase: 3.6,
  },
  {
    baseRadius: 164,
    radiusBoost: 34,
    centerAlphaDark: 0.13,
    centerAlphaLight: 0.1,
    edgeAlphaDark: 0.05,
    edgeAlphaLight: 0.04,
    offsetX: 24,
    offsetY: -212,
    parallax: 0.33,
    drift: 16,
    speed: 0.00042,
    phase: 4.3,
  },
  {
    baseRadius: 176,
    radiusBoost: 34,
    centerAlphaDark: 0.12,
    centerAlphaLight: 0.092,
    edgeAlphaDark: 0.045,
    edgeAlphaLight: 0.036,
    offsetX: -44,
    offsetY: 214,
    parallax: 0.31,
    drift: 14,
    speed: 0.0004,
    phase: 5.2,
  },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function CursorWebBackground({ isDark }: CursorWebBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;

    const context = canvasEl.getContext("2d");
    if (!context) return;
    const ctx = context;

    const initialParent = canvasEl.parentElement;
    if (!initialParent) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      vx: 0,
      vy: 0,
      active: false,
      lastMoveAt: 0,
    };

    const aura = isDark ? "103, 232, 249" : "15, 118, 110";

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

      const centerX = width / 2;
      const centerY = height / 2;
      pointer.x = centerX;
      pointer.y = centerY;
      pointer.targetX = centerX;
      pointer.targetY = centerY;
    }

    function updatePointer(event: PointerEvent) {
      const rect = canvasEl.getBoundingClientRect();
      const x = clamp(event.clientX - rect.left, 0, width);
      const y = clamp(event.clientY - rect.top, 0, height);

      if (!pointer.active) {
        pointer.x = x;
        pointer.y = y;
      }

      pointer.targetX = x;
      pointer.targetY = y;
      pointer.active = true;
      pointer.lastMoveAt = performance.now();
    }

    function deactivatePointer() {
      pointer.active = false;
      pointer.targetX = width / 2;
      pointer.targetY = height / 2;
    }

    function animate(now: number) {
      pointer.vx += (pointer.targetX - pointer.x) * POINTER_EASE;
      pointer.vy += (pointer.targetY - pointer.y) * POINTER_EASE;
      pointer.vx *= POINTER_DAMPING;
      pointer.vy *= POINTER_DAMPING;

      pointer.x += pointer.vx;
      pointer.y += pointer.vy;

      ctx.clearRect(0, 0, width, height);

      const pointerSpeed = Math.hypot(pointer.vx, pointer.vy);
      const pointerRecentlyActive = pointer.active || now - pointer.lastMoveAt < 620;
      const motionBoost = clamp(pointerSpeed * 5.5, 0, 1);
      const haloStrength = pointerRecentlyActive ? 1 : 0.58;
      const normalizedX = width > 0 ? pointer.x / width - 0.5 : 0;
      const normalizedY = height > 0 ? pointer.y / height - 0.5 : 0;
      const parallaxX = normalizedX * 220;
      const parallaxY = normalizedY * 220;
      const viewportScale = clamp(Math.min(width, height) / 900, 0.72, 1.24);

      const drawHalo = (
        centerX: number,
        centerY: number,
        radius: number,
        centerAlpha: number,
        edgeAlpha: number
      ) => {
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          radius
        );

        gradient.addColorStop(0, `rgba(${aura}, ${centerAlpha * haloStrength})`);
        gradient.addColorStop(0.62, `rgba(${aura}, ${edgeAlpha * haloStrength})`);
        gradient.addColorStop(1, `rgba(${aura}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      HALO_CIRCLES.forEach((circle) => {
        const wave = Math.sin(now * circle.speed + circle.phase);
        const radius =
          (circle.baseRadius + motionBoost * circle.radiusBoost) *
          viewportScale *
          (1 + wave * 0.08 + motionBoost * 0.06);
        const driftX =
          Math.cos(now * circle.speed * 1.18 + circle.phase) *
          circle.drift *
          viewportScale;
        const driftY =
          Math.sin(now * circle.speed * 0.94 + circle.phase) *
          circle.drift *
          viewportScale;
        const centerX =
          pointer.x +
          parallaxX * circle.parallax +
          circle.offsetX * viewportScale +
          driftX;
        const centerY =
          pointer.y +
          parallaxY * circle.parallax +
          circle.offsetY * viewportScale +
          driftY;

        drawHalo(
          centerX,
          centerY,
          radius,
          isDark ? circle.centerAlphaDark : circle.centerAlphaLight,
          isDark ? circle.edgeAlphaDark : circle.edgeAlphaLight
        );
      });

      rafId = window.requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(initialParent);

    resizeCanvas();
    rafId = window.requestAnimationFrame(animate);

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", deactivatePointer);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", deactivatePointer);
      window.cancelAnimationFrame(rafId);
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

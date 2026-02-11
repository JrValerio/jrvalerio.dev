import { useEffect, useRef } from "react";

type CursorWebBackgroundProps = {
  isDark: boolean;
};

const POINTER_EASE = 0.17;
const POINTER_DAMPING = 0.81;
const HALO_SIZE_MULTIPLIER = 1.45;

type HaloCircle = {
  baseRadius: number;
  radiusBoost: number;
  centerAlphaDark: number;
  centerAlphaLight: number;
  edgeAlphaDark: number;
  edgeAlphaLight: number;
};

const HALO_CIRCLES: HaloCircle[] = [
  {
    baseRadius: 248,
    radiusBoost: 38,
    centerAlphaDark: 0.08,
    centerAlphaLight: 0.06,
    edgeAlphaDark: 0.03,
    edgeAlphaLight: 0.022,
  },
  {
    baseRadius: 208,
    radiusBoost: 34,
    centerAlphaDark: 0.11,
    centerAlphaLight: 0.082,
    edgeAlphaDark: 0.042,
    edgeAlphaLight: 0.03,
  },
  {
    baseRadius: 172,
    radiusBoost: 30,
    centerAlphaDark: 0.14,
    centerAlphaLight: 0.105,
    edgeAlphaDark: 0.055,
    edgeAlphaLight: 0.04,
  },
  {
    baseRadius: 138,
    radiusBoost: 24,
    centerAlphaDark: 0.18,
    centerAlphaLight: 0.135,
    edgeAlphaDark: 0.072,
    edgeAlphaLight: 0.052,
  },
  {
    baseRadius: 108,
    radiusBoost: 20,
    centerAlphaDark: 0.22,
    centerAlphaLight: 0.165,
    edgeAlphaDark: 0.088,
    edgeAlphaLight: 0.063,
  },
  {
    baseRadius: 82,
    radiusBoost: 16,
    centerAlphaDark: 0.28,
    centerAlphaLight: 0.21,
    edgeAlphaDark: 0.112,
    edgeAlphaLight: 0.082,
  },
  {
    baseRadius: 58,
    radiusBoost: 12,
    centerAlphaDark: 0.34,
    centerAlphaLight: 0.26,
    edgeAlphaDark: 0.14,
    edgeAlphaLight: 0.1,
  },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function CursorWebBackground({ isDark }: CursorWebBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasOpacity = isDark ? 0.82 : 0.72;

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

    const haloTheme = isDark
      ? {
          inner: "103, 232, 249",
          middle: "59, 130, 246",
          outer: "15, 23, 42",
          alphaScale: 0.42,
          activeStrength: 0.78,
          idleStrength: 0.36,
        }
      : {
          inner: "125, 211, 252",
          middle: "148, 163, 184",
          outer: "203, 213, 225",
          alphaScale: 0.34,
          activeStrength: 0.62,
          idleStrength: 0.28,
        };

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
      const haloStrength = pointerRecentlyActive
        ? haloTheme.activeStrength
        : haloTheme.idleStrength;
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

        const centerOpacity = centerAlpha * haloStrength * haloTheme.alphaScale;
        const edgeOpacity = edgeAlpha * haloStrength * haloTheme.alphaScale;

        gradient.addColorStop(0, `rgba(${haloTheme.inner}, ${centerOpacity})`);
        gradient.addColorStop(0.36, `rgba(${haloTheme.middle}, ${edgeOpacity})`);
        gradient.addColorStop(0.72, `rgba(${haloTheme.outer}, ${edgeOpacity * 0.52})`);
        gradient.addColorStop(1, `rgba(${haloTheme.outer}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      HALO_CIRCLES.forEach((circle) => {
        const radius =
          (circle.baseRadius + motionBoost * circle.radiusBoost) *
          viewportScale *
          HALO_SIZE_MULTIPLIER;
        drawHalo(
          pointer.x,
          pointer.y,
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
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: canvasOpacity }}
      aria-hidden="true"
    />
  );
}

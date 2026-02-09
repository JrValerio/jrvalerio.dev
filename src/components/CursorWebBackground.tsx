import { useEffect, useRef } from "react";

type CursorWebBackgroundProps = {
  isDark: boolean;
};

const POINTER_EASE = 0.17;
const POINTER_DAMPING = 0.81;

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

      // +50% em todos os raios
      const smallRadius = 21 + motionBoost * 7.5;
      const mediumRadius = 78 + motionBoost * 21;
      const outerRadius = 177 + motionBoost * 36;

      const drawHalo = (radius: number, centerAlpha: number, edgeAlpha: number) => {
        const gradient = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          radius
        );

        gradient.addColorStop(0, `rgba(${aura}, ${centerAlpha * haloStrength})`);
        gradient.addColorStop(0.62, `rgba(${aura}, ${edgeAlpha * haloStrength})`);
        gradient.addColorStop(1, `rgba(${aura}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      drawHalo(outerRadius, isDark ? 0.13 : 0.1, isDark ? 0.05 : 0.04);
      drawHalo(mediumRadius, isDark ? 0.19 : 0.15, isDark ? 0.07 : 0.055);
      drawHalo(smallRadius, isDark ? 0.32 : 0.24, isDark ? 0.12 : 0.09);

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

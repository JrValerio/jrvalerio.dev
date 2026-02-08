import { useEffect, useRef } from "react";

type CursorWebBackgroundProps = {
  isDark: boolean;
};

type Node = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
};

const MAX_LINK_DISTANCE = 170;
const DRAG_RADIUS = 220;
const BASE_STIFFNESS = 0.022;
const DAMPING = 0.9;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function createNodes(width: number, height: number): Node[] {
  const area = width * height;
  const count = Math.min(115, Math.max(60, Math.floor(area / 26000)));

  const cols = Math.max(1, Math.ceil(Math.sqrt((count * width) / Math.max(1, height))));
  const rows = Math.max(1, Math.ceil(count / cols));
  const cellWidth = width / cols;
  const cellHeight = height / rows;

  const nodes: Node[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (nodes.length >= count) break;

      const jitterX = (Math.random() - 0.5) * cellWidth * 0.5;
      const jitterY = (Math.random() - 0.5) * cellHeight * 0.5;
      const baseX = clamp((col + 0.5) * cellWidth + jitterX, 0, width);
      const baseY = clamp((row + 0.5) * cellHeight + jitterY, 0, height);

      nodes.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        vx: 0,
        vy: 0,
      });
    }
  }

  return nodes;
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

    const palette = isDark
      ? {
          line: "34, 211, 238",
          point: "56, 189, 248",
          aura: "103, 232, 249",
        }
      : {
          line: "15, 118, 110",
          point: "2, 132, 199",
          aura: "8, 145, 178",
        };

    let nodes: Node[] = [];

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

      nodes = createNodes(width, height);
    }

    function updatePointer(event: PointerEvent) {
      const rect = canvasEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

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
      pointer.vx += (pointer.targetX - pointer.x) * 0.18;
      pointer.vy += (pointer.targetY - pointer.y) * 0.18;
      pointer.vx *= 0.72;
      pointer.vy *= 0.72;

      pointer.x += pointer.vx;
      pointer.y += pointer.vy;

      ctx.clearRect(0, 0, width, height);

      const pointerSpeed = Math.hypot(pointer.vx, pointer.vy);
      const pointerRecentlyActive = pointer.active || now - pointer.lastMoveAt < 180;

      for (const node of nodes) {
        if (pointerRecentlyActive && pointerSpeed > 0.02) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);

          if (distance < DRAG_RADIUS) {
            const influence = 1 - distance / DRAG_RADIUS;
            const drag = influence * influence;
            node.vx += pointer.vx * drag * 0.28;
            node.vy += pointer.vy * drag * 0.28;
          }
        }

        node.vx += (node.baseX - node.x) * BASE_STIFFNESS;
        node.vy += (node.baseY - node.y) * BASE_STIFFNESS;
        node.vx *= DAMPING;
        node.vy *= DAMPING;

        node.x += node.vx;
        node.y += node.vy;
      }

      if (pointerRecentlyActive) {
        const gradient = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          DRAG_RADIUS * 0.65
        );
        gradient.addColorStop(0, `rgba(${palette.aura}, ${isDark ? 0.13 : 0.1})`);
        gradient.addColorStop(1, `rgba(${palette.aura}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, DRAG_RADIUS * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance > MAX_LINK_DISTANCE) continue;

          let alpha = (1 - distance / MAX_LINK_DISTANCE) * (isDark ? 0.34 : 0.3);

          if (pointerRecentlyActive) {
            const da = Math.hypot(a.x - pointer.x, a.y - pointer.y);
            const db = Math.hypot(b.x - pointer.x, b.y - pointer.y);
            const boost = 1 - Math.min(da, db) / DRAG_RADIUS;
            if (boost > 0) {
              alpha += boost * (isDark ? 0.14 : 0.12);
            }
          }

          ctx.strokeStyle = `rgba(${palette.line}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        const distanceToPointer = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        const boost = pointerRecentlyActive
          ? Math.max(0, 1 - distanceToPointer / DRAG_RADIUS) * 0.22
          : 0;
        ctx.fillStyle = `rgba(${palette.point}, ${(isDark ? 0.72 : 0.68) + boost})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.45 + boost * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

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

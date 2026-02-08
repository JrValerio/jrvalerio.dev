import { useEffect, useRef } from "react";

type CursorWebBackgroundProps = {
  isDark: boolean;
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  radius: number;
  orbitSpeed: number;
  spreadAngle: number;
  spreadRadius: number;
  spreadSpeed: number;
  phase: number;
};

const NODE_COUNT = 56;
const MAX_LINK_DISTANCE = 165;
const CURSOR_LINK_DISTANCE = 230;
const MAX_CURSOR_CONNECTIONS = 16;

function createNodes(centerX: number, centerY: number): Node[] {
  return Array.from({ length: NODE_COUNT }, () => ({
    x: centerX,
    y: centerY,
    vx: 0,
    vy: 0,
    angle: Math.random() * Math.PI * 2,
    radius: 18 + Math.random() * 52,
    orbitSpeed: (Math.random() - 0.5) * 0.018,
    spreadAngle: Math.random() * Math.PI * 2,
    spreadRadius: 120 + Math.random() * 320,
    spreadSpeed: (Math.random() - 0.5) * 0.0024,
    phase: Math.random() * Math.PI * 2,
  }));
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
    };

    const palette = isDark
      ? {
          line: "34, 211, 238",
          point: "56, 189, 248",
          cursor: "103, 232, 249",
        }
      : {
          line: "15, 118, 110",
          point: "2, 132, 199",
          cursor: "8, 145, 178",
        };

    let nodes = createNodes(0, 0);

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

      nodes = createNodes(centerX, centerY);
    }

    function updatePointer(event: PointerEvent) {
      const rect = canvasEl.getBoundingClientRect();
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
    }

    function animate(time: number) {
      pointer.x += (pointer.targetX - pointer.x) * 0.14;
      pointer.y += (pointer.targetY - pointer.y) * 0.14;

      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.angle += node.orbitSpeed;
        node.spreadAngle += node.spreadSpeed;

        const spreadX = Math.cos(node.spreadAngle) * node.spreadRadius;
        const spreadY = Math.sin(node.spreadAngle) * node.spreadRadius;
        const orbitRadius = node.radius + Math.sin(time * 0.0012 + node.phase) * 9;
        const targetX = pointer.x + spreadX + Math.cos(node.angle) * orbitRadius;
        const targetY = pointer.y + spreadY + Math.sin(node.angle) * orbitRadius;

        node.vx += (targetX - node.x) * 0.013;
        node.vy += (targetY - node.y) * 0.013;
        node.vx *= 0.88;
        node.vy *= 0.88;

        node.x += node.vx;
        node.y += node.vy;
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

          const alpha = (1 - distance / MAX_LINK_DISTANCE) * (isDark ? 0.34 : 0.3);
          ctx.strokeStyle = `rgba(${palette.line}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      const cursorConnections = nodes
        .map((node) => {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          return { node, distance: Math.hypot(dx, dy) };
        })
        .filter((item) => item.distance <= CURSOR_LINK_DISTANCE)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, MAX_CURSOR_CONNECTIONS);

      for (const { node, distance } of cursorConnections) {
        const alpha =
          (1 - distance / CURSOR_LINK_DISTANCE) * (isDark ? 0.44 : 0.4);
        ctx.strokeStyle = `rgba(${palette.cursor}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();
      }

      for (const node of nodes) {
        ctx.fillStyle = `rgba(${palette.point}, ${isDark ? 0.78 : 0.72})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(initialParent);

    resizeCanvas();
    rafId = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
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

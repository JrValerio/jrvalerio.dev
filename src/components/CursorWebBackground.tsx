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

type Link = {
  a: number;
  b: number;
  baseDistance: number;
};

const MAX_LINK_DISTANCE = 220;
const DRAG_RADIUS = 360;
const BASE_STIFFNESS = 0.01;
const DAMPING = 0.94;
const POINTER_EASE = 0.14;
const POINTER_DAMPING = 0.78;
const LOCAL_NEIGHBORS = 4;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function createNodes(width: number, height: number): Node[] {
  const area = width * height;
  const count = Math.min(140, Math.max(76, Math.floor(area / 20500)));
  const minDim = Math.min(width, height);
  const clusterCount = Math.max(5, Math.min(10, Math.round(count / 14)));
  const clusteredCount = Math.floor(count * 0.9);

  const nodes: Node[] = [];
  const clusters = Array.from({ length: clusterCount }, () => ({
    x: clamp(width * (0.1 + Math.random() * 0.8), 0, width),
    y: clamp(height * (0.12 + Math.random() * 0.76), 0, height),
    radius: clamp(minDim * (0.06 + Math.random() * 0.045), 32, 76),
  }));

  const baseClusterSize = Math.floor(clusteredCount / clusterCount);
  const clusterRemainder = clusteredCount % clusterCount;

  for (let i = 0; i < clusterCount; i += 1) {
    const cluster = clusters[i];
    const pointsInCluster = baseClusterSize + (i < clusterRemainder ? 1 : 0);

    for (let j = 0; j < pointsInCluster; j += 1) {
      const angle = Math.random() * Math.PI * 2;
      const distance = (Math.random() ** 0.42) * cluster.radius;
      const jitterX = (Math.random() - 0.5) * 10;
      const jitterY = (Math.random() - 0.5) * 10;
      const baseX = clamp(cluster.x + Math.cos(angle) * distance + jitterX, 0, width);
      const baseY = clamp(cluster.y + Math.sin(angle) * distance + jitterY, 0, height);

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

  while (nodes.length < count) {
    const baseX = Math.random() * width;
    const baseY = Math.random() * height;

    nodes.push({
      x: baseX,
      y: baseY,
      baseX,
      baseY,
      vx: 0,
      vy: 0,
    });
  }

  return nodes;
}

function createLinks(nodes: Node[]): Link[] {
  const count = nodes.length;
  if (count < 2) return [];

  const linkMap = new Map<string, Link>();
  const allPairs: Link[] = [];

  const addLink = (a: number, b: number, baseDistance: number) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    const key = `${min}-${max}`;
    if (!linkMap.has(key)) {
      linkMap.set(key, { a: min, b: max, baseDistance });
    }
  };

  for (let i = 0; i < count; i += 1) {
    const neighbors: Array<{ index: number; distance: number }> = [];

    for (let j = 0; j < count; j += 1) {
      if (i === j) continue;
      const dx = nodes[i].baseX - nodes[j].baseX;
      const dy = nodes[i].baseY - nodes[j].baseY;
      const distance = Math.hypot(dx, dy);

      neighbors.push({ index: j, distance });

      if (j > i) {
        allPairs.push({ a: i, b: j, baseDistance: distance });
      }
    }

    neighbors.sort((left, right) => left.distance - right.distance);

    for (let n = 0; n < Math.min(LOCAL_NEIGHBORS, neighbors.length); n += 1) {
      const neighbor = neighbors[n];
      if (neighbor.distance <= MAX_LINK_DISTANCE * 1.25) {
        addLink(i, neighbor.index, neighbor.distance);
      }
    }
  }

  const parent = Array.from({ length: count }, (_, index) => index);
  const rank = Array.from({ length: count }, () => 0);

  const find = (value: number): number => {
    let current = value;

    while (parent[current] !== current) {
      parent[current] = parent[parent[current]];
      current = parent[current];
    }

    return current;
  };

  const union = (a: number, b: number): boolean => {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA === rootB) return false;

    if (rank[rootA] < rank[rootB]) {
      parent[rootA] = rootB;
    } else if (rank[rootA] > rank[rootB]) {
      parent[rootB] = rootA;
    } else {
      parent[rootB] = rootA;
      rank[rootA] += 1;
    }

    return true;
  };

  allPairs.sort((left, right) => left.baseDistance - right.baseDistance);

  let mstEdges = 0;
  for (const pair of allPairs) {
    if (union(pair.a, pair.b)) {
      addLink(pair.a, pair.b, pair.baseDistance);
      mstEdges += 1;

      if (mstEdges === count - 1) {
        break;
      }
    }
  }

  return [...linkMap.values()];
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
        }
      : {
          line: "15, 118, 110",
          point: "2, 132, 199",
        };

    let nodes: Node[] = [];
    let links: Link[] = [];

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
      links = createLinks(nodes);
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
      const pointerRecentlyActive = pointer.active || now - pointer.lastMoveAt < 560;

      for (const node of nodes) {
        if (pointerRecentlyActive && pointerSpeed > 0.015) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);

          if (distance < DRAG_RADIUS) {
            const influence = 1 - distance / DRAG_RADIUS;
            const drag = influence * influence * (0.9 + influence * 1.8);
            node.vx += pointer.vx * drag * 0.52;
            node.vy += pointer.vy * drag * 0.52;
          }
        }

        node.vx += (node.baseX - node.x) * BASE_STIFFNESS;
        node.vy += (node.baseY - node.y) * BASE_STIFFNESS;
        node.vx *= DAMPING;
        node.vy *= DAMPING;

        node.x += node.vx;
        node.y += node.vy;
      }

      ctx.lineCap = "round";

      for (const link of links) {
        const a = nodes[link.a];
        const b = nodes[link.b];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const stretchLimit = Math.max(link.baseDistance * 2.1, MAX_LINK_DISTANCE);
        if (distance > stretchLimit) continue;

        const stretchFactor = clamp(1 - distance / stretchLimit, 0, 1);
        let alpha = (0.08 + stretchFactor * 0.32) * (isDark ? 1 : 0.92);

        if (pointerRecentlyActive) {
          const da = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          const db = Math.hypot(b.x - pointer.x, b.y - pointer.y);
          const boost = 1 - Math.min(da, db) / DRAG_RADIUS;
          if (boost > 0) {
            alpha += boost * (isDark ? 0.17 : 0.14);
          }
        }

        if (alpha < 0.03) continue;

        ctx.strokeStyle = `rgba(${palette.line}, ${alpha})`;
        ctx.lineWidth = 0.8 + stretchFactor * 0.7;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const node of nodes) {
        const distanceToPointer = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        const boost = pointerRecentlyActive
          ? Math.max(0, 1 - distanceToPointer / DRAG_RADIUS) * 0.28
          : 0;

        ctx.fillStyle = `rgba(${palette.point}, ${Math.min((isDark ? 0.72 : 0.66) + boost, 0.95)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.3 + boost * 1.7, 0, Math.PI * 2);
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

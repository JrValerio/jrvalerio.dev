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

type LinkKind = "web" | "bridge";

type Link = {
  a: number;
  b: number;
  baseDistance: number;
  kind: LinkKind;
};

type WebMeta = {
  centerX: number;
  centerY: number;
  outerNodeIds: number[];
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

const DRAG_RADIUS = 430;
const BASE_STIFFNESS = 0.0075;
const DAMPING = 0.955;
const POINTER_EASE = 0.17;
const POINTER_DAMPING = 0.81;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSpiderWebGraph(width: number, height: number): GraphData {
  const area = width * height;
  const webCount = clamp(Math.round(area / 550000), 3, 5);

  const nodes: Node[] = [];
  const links = new Map<string, Link>();
  const webs: WebMeta[] = [];

  const cols = Math.max(1, Math.ceil(Math.sqrt((webCount * width) / Math.max(1, height))));
  const rows = Math.max(1, Math.ceil(webCount / cols));
  const cellWidth = width / cols;
  const cellHeight = height / rows;
  const minDim = Math.min(width, height);

  const addNode = (x: number, y: number): number => {
    const id = nodes.length;
    nodes.push({
      x,
      y,
      baseX: x,
      baseY: y,
      vx: 0,
      vy: 0,
    });
    return id;
  };

  const addLink = (a: number, b: number, kind: LinkKind) => {
    if (a === b) return;

    const min = Math.min(a, b);
    const max = Math.max(a, b);
    const key = `${min}-${max}`;

    const nodeA = nodes[min];
    const nodeB = nodes[max];
    const baseDistance = Math.hypot(nodeA.baseX - nodeB.baseX, nodeA.baseY - nodeB.baseY);
    const existing = links.get(key);

    if (!existing) {
      links.set(key, { a: min, b: max, baseDistance, kind });
      return;
    }

    if (existing.kind === "bridge" && kind === "web") {
      links.set(key, { ...existing, kind: "web" });
    }
  };

  for (let index = 0; index < webCount; index += 1) {
    const col = index % cols;
    const row = Math.floor(index / cols);

    const centerX = clamp(
      (col + 0.5) * cellWidth + (Math.random() - 0.5) * cellWidth * 0.36,
      56,
      width - 56
    );
    const centerY = clamp(
      (row + 0.5) * cellHeight + (Math.random() - 0.5) * cellHeight * 0.36,
      64,
      height - 64
    );

    const spokes = randomInt(8, 11);
    const rings = randomInt(3, 4);
    const outerRadius = clamp(minDim * (0.13 + Math.random() * 0.05), 95, 185);
    const angleOffset = Math.random() * Math.PI * 2;

    const centerId = addNode(centerX, centerY);
    let previousRing: number[] | null = null;
    let outerRing: number[] = [];

    for (let ring = 1; ring <= rings; ring += 1) {
      const ringNodes: number[] = [];
      const ringProgress = ring / rings;
      const ringRadius = outerRadius * (0.2 + ringProgress * 0.82);

      for (let spoke = 0; spoke < spokes; spoke += 1) {
        const angle =
          angleOffset +
          (spoke / spokes) * Math.PI * 2 +
          (Math.random() - 0.5) * (0.09 * (1 - ringProgress));

        const radius = ringRadius * (0.95 + (Math.random() - 0.5) * 0.16);
        const x = clamp(centerX + Math.cos(angle) * radius, 0, width);
        const y = clamp(centerY + Math.sin(angle) * radius, 0, height);

        const nodeId = addNode(x, y);
        ringNodes.push(nodeId);

        if (ring === 1) {
          addLink(centerId, nodeId, "web");
        } else if (previousRing) {
          addLink(previousRing[spoke], nodeId, "web");
        }
      }

      for (let spoke = 0; spoke < spokes; spoke += 1) {
        const current = ringNodes[spoke];
        const next = ringNodes[(spoke + 1) % spokes];
        addLink(current, next, "web");

        if (previousRing && Math.random() > 0.34) {
          const diagonal = previousRing[(spoke + 1) % spokes];
          addLink(current, diagonal, "web");
        }
      }

      previousRing = ringNodes;
      outerRing = ringNodes;
    }

    webs.push({ centerX, centerY, outerNodeIds: outerRing });
  }

  const parent = Array.from({ length: webCount }, (_, idx) => idx);
  const rank = Array.from({ length: webCount }, () => 0);

  const find = (value: number): number => {
    let current = value;
    while (parent[current] !== current) {
      parent[current] = parent[parent[current]];
      current = parent[current];
    }
    return current;
  };

  const union = (left: number, right: number): boolean => {
    const rootLeft = find(left);
    const rootRight = find(right);
    if (rootLeft === rootRight) return false;

    if (rank[rootLeft] < rank[rootRight]) {
      parent[rootLeft] = rootRight;
    } else if (rank[rootLeft] > rank[rootRight]) {
      parent[rootRight] = rootLeft;
    } else {
      parent[rootRight] = rootLeft;
      rank[rootLeft] += 1;
    }

    return true;
  };

  const webPairs: Array<{ a: number; b: number; distance: number }> = [];
  for (let a = 0; a < webCount; a += 1) {
    for (let b = a + 1; b < webCount; b += 1) {
      const dx = webs[a].centerX - webs[b].centerX;
      const dy = webs[a].centerY - webs[b].centerY;
      webPairs.push({ a, b, distance: Math.hypot(dx, dy) });
    }
  }

  webPairs.sort((left, right) => left.distance - right.distance);

  const connectedPairs = new Set<string>();

  const connectWebs = (a: number, b: number, addDoubleStrand: boolean) => {
    const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
    if (connectedPairs.has(key)) return;
    connectedPairs.add(key);

    const webA = webs[a];
    const webB = webs[b];

    const pickNode = (ids: number[], targetX: number, targetY: number, skip?: number): number => {
      let bestId = ids[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const id of ids) {
        if (skip !== undefined && id === skip) continue;
        const node = nodes[id];
        const distance = Math.hypot(node.baseX - targetX, node.baseY - targetY);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }

      return bestId;
    };

    const aMain = pickNode(webA.outerNodeIds, webB.centerX, webB.centerY);
    const bMain = pickNode(webB.outerNodeIds, webA.centerX, webA.centerY);

    const midX =
      (nodes[aMain].baseX + nodes[bMain].baseX) / 2 +
      (Math.random() - 0.5) * 42;
    const midY =
      (nodes[aMain].baseY + nodes[bMain].baseY) / 2 +
      (Math.random() - 0.5) * 30;

    const midId = addNode(clamp(midX, 0, width), clamp(midY, 0, height));
    addLink(aMain, midId, "bridge");
    addLink(midId, bMain, "bridge");

    if (addDoubleStrand) {
      const aSide = pickNode(webA.outerNodeIds, webB.centerX, webB.centerY, aMain);
      const bSide = pickNode(webB.outerNodeIds, webA.centerX, webA.centerY, bMain);
      addLink(aSide, bSide, "bridge");
    }
  };

  let edges = 0;
  for (const pair of webPairs) {
    if (!union(pair.a, pair.b)) continue;

    connectWebs(pair.a, pair.b, true);
    edges += 1;

    if (edges === webCount - 1) break;
  }

  for (let i = 0; i < webCount; i += 1) {
    let nearest = -1;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let j = 0; j < webCount; j += 1) {
      if (i === j) continue;
      const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
      if (connectedPairs.has(key)) continue;

      const dx = webs[i].centerX - webs[j].centerX;
      const dy = webs[i].centerY - webs[j].centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = j;
      }
    }

    if (nearest >= 0 && Math.random() > 0.4) {
      connectWebs(i, nearest, false);
    }
  }

  return { nodes, links: [...links.values()] };
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
          line: "13, 148, 136",
          point: "3, 105, 161",
          aura: "15, 118, 110",
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

      const graph = createSpiderWebGraph(width, height);
      nodes = graph.nodes;
      links = graph.links;
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
      const smallRadius = 14 + motionBoost * 5;
      const mediumRadius = 52 + motionBoost * 14;
      const outerRadius = 118 + motionBoost * 24;

      const drawHalo = (radius: number, centerAlpha: number, edgeAlpha: number) => {
        const gradient = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          radius
        );
        gradient.addColorStop(
          0,
          `rgba(${palette.aura}, ${centerAlpha * haloStrength})`
        );
        gradient.addColorStop(
          0.62,
          `rgba(${palette.aura}, ${edgeAlpha * haloStrength})`
        );
        gradient.addColorStop(1, `rgba(${palette.aura}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      drawHalo(outerRadius, isDark ? 0.13 : 0.1, isDark ? 0.05 : 0.04);
      drawHalo(mediumRadius, isDark ? 0.19 : 0.15, isDark ? 0.07 : 0.055);
      drawHalo(smallRadius, isDark ? 0.32 : 0.24, isDark ? 0.12 : 0.09);

      for (const node of nodes) {
        if (pointerRecentlyActive && pointerSpeed > 0.01) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);

          if (distance < DRAG_RADIUS) {
            const influence = 1 - distance / DRAG_RADIUS;
            const drag = influence * influence * (0.85 + influence * 1.9);
            node.vx += pointer.vx * drag * 0.58;
            node.vy += pointer.vy * drag * 0.58;
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
        const stretch = distance / Math.max(link.baseDistance, 1);
        if (stretch > 2.9) continue;

        const stretchFalloff = clamp(1 - (stretch - 1) * 0.48, 0.22, 1);
        const baseAlpha = link.kind === "bridge" ? (isDark ? 0.18 : 0.15) : (isDark ? 0.27 : 0.23);

        let alpha = baseAlpha * stretchFalloff;

        if (pointerRecentlyActive) {
          const da = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          const db = Math.hypot(b.x - pointer.x, b.y - pointer.y);
          const boost = 1 - Math.min(da, db) / DRAG_RADIUS;
          if (boost > 0) {
            alpha += boost * (isDark ? 0.22 : 0.19);
          }
        }

        if (alpha < 0.04) continue;

        const widthBase = link.kind === "bridge" ? 0.75 : 1.05;
        ctx.lineWidth = widthBase + clamp(alpha, 0, 0.5) * 0.9;
        ctx.strokeStyle = `rgba(${palette.line}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const node of nodes) {
        const distanceToPointer = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        const boost = pointerRecentlyActive
          ? Math.max(0, 1 - distanceToPointer / DRAG_RADIUS) * 0.3
          : 0;

        const alpha = Math.min((isDark ? 0.72 : 0.64) + boost, 0.96);
        const radius = 1.18 + boost * 1.7;

        ctx.fillStyle = `rgba(${palette.point}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
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

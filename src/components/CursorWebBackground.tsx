import { useEffect, useRef } from "react";

type CursorWebBackgroundProps = {
  isDark: boolean;
};

type MeshPoint = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  pinned: boolean;
};

type MeshConstraint = {
  a: number;
  b: number;
  restLength: number;
  tension: number;
};

type WebMesh = {
  points: MeshPoint[];
  constraints: MeshConstraint[];
};

type SegmentHit = {
  constraintIndex: number;
  distance: number;
  t: number;
  x: number;
  y: number;
};

type GrabNodeState = {
  active: boolean;
  constraintIndex: number;
  t: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const POINTER_EASE = 0.18;
const POINTER_DAMPING = 0.78;

const BASE_SPRING = 0.0028;
const VELOCITY_DAMPING = 0.9;

const CONSTRAINT_ITERATIONS = 7;
const CONSTRAINT_STIFFNESS = 0.92;
const MAX_TENSION = 1.3;
const RELEASE_TENSION = 0.55;
const RELEASE_COOLDOWN_MS = 260;

const SEGMENT_GRAB_DISTANCE = 72;
const SEGMENT_GRAB_SPRING = 0.1;
const SEGMENT_DRAG_PUSH = 0.5;

const GRAB_NODE_SPRING = 0.16;
const GRAB_NODE_DRAG_PUSH = 0.26;
const GRAB_NODE_DAMPING = 0.78;

const NEARBY_PUSH_RADIUS = 150;
const NEARBY_PUSH = 0.052;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function closestPointOnSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
): { t: number; x: number; y: number; distance: number } {
  const abx = bx - ax;
  const aby = by - ay;
  const abLenSq = abx * abx + aby * aby;

  if (abLenSq <= 0.00001) {
    const distance = Math.hypot(px - ax, py - ay);
    return { t: 0, x: ax, y: ay, distance };
  }

  const apx = px - ax;
  const apy = py - ay;
  const rawT = (apx * abx + apy * aby) / abLenSq;
  const t = clamp(rawT, 0, 1);
  const x = ax + abx * t;
  const y = ay + aby * t;
  const distance = Math.hypot(px - x, py - y);

  return { t, x, y, distance };
}

function createWebMesh(width: number, height: number): WebMesh {
  const cols = clamp(Math.round(width / 135), 9, 16);
  const rows = clamp(Math.round(height / 120), 7, 12);
  const stepX = cols > 1 ? width / (cols - 1) : width;
  const stepY = rows > 1 ? height / (rows - 1) : height;

  const points: MeshPoint[] = [];
  const constraints: MeshConstraint[] = [];
  const linkKeys = new Set<string>();
  const pointIds: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => -1)
  );

  const addPoint = (x: number, y: number, pinned: boolean): number => {
    const id = points.length;
    points.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0, pinned });
    return id;
  };

  const addConstraint = (a: number, b: number) => {
    if (a === b) return;
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    const key = `${min}-${max}`;
    if (linkKeys.has(key)) return;
    linkKeys.add(key);

    const pa = points[min];
    const pb = points[max];
    constraints.push({
      a: min,
      b: max,
      restLength: Math.hypot(pb.baseX - pa.baseX, pb.baseY - pa.baseY),
      tension: 0,
    });
  };

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const pinned =
        row === 0 || row === rows - 1 || col === 0 || col === cols - 1;
      const jitterScaleX = pinned ? 0 : stepX * 0.34;
      const jitterScaleY = pinned ? 0 : stepY * 0.34;

      const x = clamp(
        col * stepX + randomBetween(-jitterScaleX, jitterScaleX),
        0,
        width
      );
      const y = clamp(
        row * stepY + randomBetween(-jitterScaleY, jitterScaleY),
        0,
        height
      );

      pointIds[row][col] = addPoint(x, y, pinned);
    }
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const id = pointIds[row][col];
      const onEdge =
        row === 0 || row === rows - 1 || col === 0 || col === cols - 1;

      if (col < cols - 1 && (onEdge || Math.random() > 0.12)) {
        addConstraint(id, pointIds[row][col + 1]);
      }

      if (row < rows - 1 && (onEdge || Math.random() > 0.12)) {
        addConstraint(id, pointIds[row + 1][col]);
      }

      if (row < rows - 1 && col < cols - 1 && Math.random() > 0.34) {
        addConstraint(id, pointIds[row + 1][col + 1]);
      }

      if (row < rows - 1 && col > 0 && Math.random() > 0.38) {
        addConstraint(id, pointIds[row + 1][col - 1]);
      }
    }
  }

  return { points, constraints };
}

export default function CursorWebBackground({ isDark }: CursorWebBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasOpacity = isDark ? 0.9 : 0.8;

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

    const theme = isDark
      ? {
          line: "125, 211, 252",
          point: "148, 163, 184",
          baseAlpha: 0.08,
          tensionBoost: 0.34,
          grabBoost: 0.18,
          pointAlpha: 0.44,
          lineWidth: 0.44,
        }
      : {
          line: "100, 116, 139",
          point: "100, 116, 139",
          baseAlpha: 0.064,
          tensionBoost: 0.28,
          grabBoost: 0.14,
          pointAlpha: 0.34,
          lineWidth: 0.4,
        };

    let points: MeshPoint[] = [];
    let constraints: MeshConstraint[] = [];
    let activeSegmentIndex = -1;
    let activeSegmentDistance = Number.POSITIVE_INFINITY;
    let grabCooldownUntil = 0;

    const grabNode: GrabNodeState = {
      active: false,
      constraintIndex: -1,
      t: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
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
      pointer.vx = 0;
      pointer.vy = 0;

      grabNode.active = false;
      grabNode.constraintIndex = -1;
      grabNode.vx = 0;
      grabNode.vy = 0;
      grabNode.x = centerX;
      grabNode.y = centerY;
      grabCooldownUntil = 0;

      const mesh = createWebMesh(width, height);
      points = mesh.points;
      constraints = mesh.constraints;
    }

    function updatePointer(event: PointerEvent) {
      const rect = canvasEl.getBoundingClientRect();
      const rawX = event.clientX - rect.left;
      const rawY = event.clientY - rect.top;

      if (rawX < 0 || rawX > width || rawY < 0 || rawY > height) {
        pointer.active = false;
        return;
      }

      const x = clamp(rawX, 0, width);
      const y = clamp(rawY, 0, height);

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
      pointer.targetX = pointer.x;
      pointer.targetY = pointer.y;
      pointer.vx = 0;
      pointer.vy = 0;

      grabNode.active = false;
      grabNode.constraintIndex = -1;
      grabNode.vx = 0;
      grabNode.vy = 0;
      grabCooldownUntil = 0;
    }

    function findNearestSegment(mouseX: number, mouseY: number): SegmentHit | null {
      let bestHit: SegmentHit | null = null;

      for (let index = 0; index < constraints.length; index += 1) {
        const constraint = constraints[index];
        const a = points[constraint.a];
        const b = points[constraint.b];

        const hit = closestPointOnSegment(mouseX, mouseY, a.x, a.y, b.x, b.y);

        if (!bestHit || hit.distance < bestHit.distance) {
          bestHit = {
            constraintIndex: index,
            distance: hit.distance,
            t: hit.t,
            x: hit.x,
            y: hit.y,
          };
        }
      }

      return bestHit;
    }

    function applyMouseInteraction(pointerRecentlyActive: boolean, now: number) {
      activeSegmentIndex = -1;
      activeSegmentDistance = Number.POSITIVE_INFINITY;

      if (!pointerRecentlyActive) {
        grabNode.active = false;
        grabNode.constraintIndex = -1;
        return;
      }

      if (now < grabCooldownUntil) {
        grabNode.active = false;
        grabNode.constraintIndex = -1;
        return;
      }

      const hit = findNearestSegment(pointer.x, pointer.y);
      if (!hit || hit.distance > SEGMENT_GRAB_DISTANCE) {
        grabNode.active = false;
        grabNode.constraintIndex = -1;
        return;
      }

      activeSegmentIndex = hit.constraintIndex;
      activeSegmentDistance = hit.distance;

      if (constraints[hit.constraintIndex].tension > RELEASE_TENSION) {
        grabNode.active = false;
        grabNode.constraintIndex = -1;
        activeSegmentIndex = -1;
        activeSegmentDistance = Number.POSITIVE_INFINITY;
        grabCooldownUntil = now + RELEASE_COOLDOWN_MS;
        return;
      }

      if (
        !grabNode.active ||
        grabNode.constraintIndex !== hit.constraintIndex ||
        Math.abs(grabNode.t - hit.t) > 0.42
      ) {
        grabNode.active = true;
        grabNode.constraintIndex = hit.constraintIndex;
        grabNode.t = hit.t;
        grabNode.x = hit.x;
        grabNode.y = hit.y;
        grabNode.vx = 0;
        grabNode.vy = 0;
      } else {
        grabNode.t += (hit.t - grabNode.t) * 0.24;
      }

      const pullToMouseX = pointer.x - grabNode.x;
      const pullToMouseY = pointer.y - grabNode.y;
      grabNode.vx += pullToMouseX * GRAB_NODE_SPRING;
      grabNode.vy += pullToMouseY * GRAB_NODE_SPRING;
      grabNode.vx += pointer.vx * GRAB_NODE_DRAG_PUSH;
      grabNode.vy += pointer.vy * GRAB_NODE_DRAG_PUSH;
      grabNode.vx *= GRAB_NODE_DAMPING;
      grabNode.vy *= GRAB_NODE_DAMPING;
      grabNode.x += grabNode.vx;
      grabNode.y += grabNode.vy;

      const grabbed = constraints[grabNode.constraintIndex];
      const a = points[grabbed.a];
      const b = points[grabbed.b];

      const segmentX = a.x + (b.x - a.x) * grabNode.t;
      const segmentY = a.y + (b.y - a.y) * grabNode.t;
      const pullX = grabNode.x - segmentX;
      const pullY = grabNode.y - segmentY;

      const weightA = 1 - grabNode.t;
      const weightB = grabNode.t;

      if (!a.pinned) {
        a.vx += pullX * SEGMENT_GRAB_SPRING * weightA;
        a.vy += pullY * SEGMENT_GRAB_SPRING * weightA;
        a.vx += grabNode.vx * SEGMENT_DRAG_PUSH * weightA;
        a.vy += grabNode.vy * SEGMENT_DRAG_PUSH * weightA;
      }

      if (!b.pinned) {
        b.vx += pullX * SEGMENT_GRAB_SPRING * weightB;
        b.vy += pullY * SEGMENT_GRAB_SPRING * weightB;
        b.vx += grabNode.vx * SEGMENT_DRAG_PUSH * weightB;
        b.vy += grabNode.vy * SEGMENT_DRAG_PUSH * weightB;
      }

      for (const point of points) {
        if (point.pinned) continue;

        const distance = Math.hypot(point.x - grabNode.x, point.y - grabNode.y);
        if (distance > NEARBY_PUSH_RADIUS) continue;

        const falloff = 1 - distance / NEARBY_PUSH_RADIUS;
        const influence = falloff * falloff;
        point.vx += grabNode.vx * influence * NEARBY_PUSH;
        point.vy += grabNode.vy * influence * NEARBY_PUSH;
      }
    }

    function integratePoints() {
      for (const point of points) {
        if (point.pinned) continue;

        point.vx += (point.baseX - point.x) * BASE_SPRING;
        point.vy += (point.baseY - point.y) * BASE_SPRING;

        point.vx *= VELOCITY_DAMPING;
        point.vy *= VELOCITY_DAMPING;

        point.x += point.vx;
        point.y += point.vy;

        point.x = clamp(point.x, -32, width + 32);
        point.y = clamp(point.y, -32, height + 32);
      }
    }

    function solveConstraints() {
      for (let iteration = 0; iteration < CONSTRAINT_ITERATIONS; iteration += 1) {
        for (const constraint of constraints) {
          const a = points[constraint.a];
          const b = points[constraint.b];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 0.0001) continue;

          const diff = (distance - constraint.restLength) / distance;

          if (a.pinned && b.pinned) continue;

          if (a.pinned) {
            b.x -= dx * diff * CONSTRAINT_STIFFNESS;
            b.y -= dy * diff * CONSTRAINT_STIFFNESS;
          } else if (b.pinned) {
            a.x += dx * diff * CONSTRAINT_STIFFNESS;
            a.y += dy * diff * CONSTRAINT_STIFFNESS;
          } else {
            const correctionX = dx * diff * 0.5 * CONSTRAINT_STIFFNESS;
            const correctionY = dy * diff * 0.5 * CONSTRAINT_STIFFNESS;
            a.x += correctionX;
            a.y += correctionY;
            b.x -= correctionX;
            b.y -= correctionY;
          }
        }
      }

      for (const constraint of constraints) {
        const a = points[constraint.a];
        const b = points[constraint.b];
        const distance = Math.hypot(b.x - a.x, b.y - a.y);
        const rawTension =
          Math.abs(distance - constraint.restLength) / Math.max(constraint.restLength, 0.0001);
        constraint.tension = clamp(rawTension, 0, MAX_TENSION);
      }
    }

    function drawMesh() {
      ctx.lineCap = "round";

      for (let index = 0; index < constraints.length; index += 1) {
        const constraint = constraints[index];
        const a = points[constraint.a];
        const b = points[constraint.b];

        let alpha = theme.baseAlpha + Math.min(constraint.tension * theme.tensionBoost, 0.3);

        if (index === activeSegmentIndex && activeSegmentDistance < SEGMENT_GRAB_DISTANCE) {
          const boost = 1 - activeSegmentDistance / SEGMENT_GRAB_DISTANCE;
          alpha += boost * theme.grabBoost;
        }

        if (alpha < 0.012) continue;

        const lineWidth = theme.lineWidth + Math.min(constraint.tension * 0.9, 0.7) * 0.24;

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = `rgba(${theme.line}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const point of points) {
        const radius = point.pinned ? 0.7 : 0.55;
        const alpha = point.pinned ? theme.pointAlpha * 0.85 : theme.pointAlpha;

        ctx.fillStyle = `rgba(${theme.point}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function animate(now: number) {
      pointer.vx += (pointer.targetX - pointer.x) * POINTER_EASE;
      pointer.vy += (pointer.targetY - pointer.y) * POINTER_EASE;
      pointer.vx *= POINTER_DAMPING;
      pointer.vy *= POINTER_DAMPING;

      pointer.x += pointer.vx;
      pointer.y += pointer.vy;

      ctx.clearRect(0, 0, width, height);

      const pointerRecentlyActive = pointer.active || now - pointer.lastMoveAt < 520;

      applyMouseInteraction(pointerRecentlyActive, now);
      integratePoints();
      solveConstraints();
      drawMesh();

      rafId = window.requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(initialParent);

    resizeCanvas();
    rafId = window.requestAnimationFrame(animate);

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", deactivatePointer);
    window.addEventListener("blur", deactivatePointer);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", deactivatePointer);
      window.removeEventListener("blur", deactivatePointer);
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

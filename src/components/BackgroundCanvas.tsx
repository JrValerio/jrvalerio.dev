'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type BackgroundCanvasProps = {
  isDark?: boolean;
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  return prefersReducedMotion;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uDark;
  varying vec2 vUv;

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  vec2 hash2(vec2 p) {
    return vec2(
      hash(p + vec2(17.0, 3.1)),
      hash(p + vec2(9.2, 27.4))
    );
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = p * 2.08 + vec2(13.1, 7.7);
      amplitude *= 0.5;
    }

    return value;
  }

  float particleLayer(
    vec2 fragCoord,
    float density,
    float cellSize,
    float radius,
    float seed
  ) {
    vec2 grid = fragCoord / cellSize;
    vec2 cell = floor(grid);
    vec2 local = fract(grid);
    float layer = 0.0;

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 offset = vec2(float(x), float(y));
        vec2 id = cell + offset + seed;
        vec2 jitter = hash2(id);
        float activation = hash(id + vec2(3.7, 5.1));
        float keep = step(1.0 - density * 0.95, activation);
        vec2 point = offset + jitter - local;
        float dist = length(point);
        float dot = smoothstep(radius, radius * 0.18, dist);
        layer = max(layer, dot * keep);
      }
    }

    return layer;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
    float t = uTime;

    vec2 orbitCenter = vec2(0.12, 0.04);
    vec2 centered = p - orbitCenter;
    float radius = length(centered);
    float vortexMask = smoothstep(1.2, 0.1, radius);
    float orbitAngle = t * 1.85;
    float swirlAngle = orbitAngle * (0.2 + vortexMask * 1.35);
    vec2 tangent = vec2(-centered.y, centered.x) / max(radius, 0.001);
    vec2 orbitOffset = vec2(cos(orbitAngle), sin(orbitAngle)) * vec2(0.03, 0.02);
    vec2 vortexOffset = tangent * vortexMask * (0.04 + 0.02 * sin(orbitAngle * 0.6));
    vec2 rotatedField = rotate2d(swirlAngle) * centered;

    vec2 warpA = vec2(
      fbm(rotatedField * 1.2 + vec2(1.7, 9.2)),
      fbm(rotatedField * 1.2 + vec2(8.3, 2.8))
    );

    vec2 warpB = vec2(
      fbm((rotatedField + (warpA - 0.5) * 0.6) * 1.6 + vec2(4.9, 1.2)),
      fbm((rotatedField - (warpA - 0.5) * 0.6) * 1.6 + vec2(7.1, 6.4))
    );

    vec2 fieldUv = rotatedField + orbitOffset + vortexOffset + (warpA - 0.5) * 0.28 + (warpB - 0.5) * 0.12;

    vec2 rightArcPosition = (fieldUv - vec2(0.46, -0.1)) * vec2(0.84, 1.3);
    float rightArc = 1.0 - smoothstep(0.54, 1.16, length(rightArcPosition));

    vec2 leftMassPosition = (fieldUv - vec2(-0.34, 0.22)) * vec2(1.14, 0.92);
    float leftMass = 1.0 - smoothstep(0.16, 0.82, length(leftMassPosition));

    float field = fbm(fieldUv * 1.95 + vec2(2.7, 0.6));
    float detail = fbm(fieldUv * 3.1 + vec2(9.4, 3.1));

    float mass = max(rightArc * 0.95, leftMass * 0.82);
    float density = smoothstep(0.34, 0.82, field * 0.74 + detail * 0.22 + mass * 0.9);

    float calmCenter = 1.0 - smoothstep(0.0, 0.48, length((p - orbitCenter) * vec2(0.82, 1.0)));
    density *= 1.0 - calmCenter * 0.58;
    density = clamp(density, 0.0, 1.0);

    float particlesNear = particleLayer(gl_FragCoord.xy, density, 4.2, 0.26, 0.0);
    float particlesFar = particleLayer(gl_FragCoord.xy + vec2(37.0, 19.0), density * 0.72, 7.8, 0.18, 13.0) * 0.38;
    float particles = particlesNear + particlesFar;

    float haze = density * smoothstep(0.28, 0.82, field) * 0.06;
    float depthFade = smoothstep(1.2, 0.2, length(p));

    vec3 lightBase = vec3(0.94, 0.94, 0.93);
    vec3 darkBase = vec3(0.04, 0.04, 0.05);
    vec3 lightDots = vec3(0.08, 0.08, 0.09);
    vec3 darkDots = vec3(0.93, 0.92, 0.90);

    vec3 background = mix(lightBase, darkBase, uDark);
    vec3 dotColor = mix(lightDots, darkDots, uDark);

    float particleAlpha = mix(0.08, 0.64, density) * particles * depthFade;
    vec3 color = mix(background, dotColor, particleAlpha + haze);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane({
  isDark = false,
  prefersReducedMotion = false,
}: BackgroundCanvasProps & { prefersReducedMotion?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(0, 0) },
      uDark: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = prefersReducedMotion
      ? 0
      : state.clock.getElapsedTime() * 0.045;
    material.uniforms.uResolution.value.set(state.size.width, state.size.height);
    material.uniforms.uDark.value = isDark ? 1 : 0;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        vertexShader={vertexShader}
      />
    </mesh>
  );
}

export default function BackgroundCanvas({ isDark = false }: BackgroundCanvasProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.2]}
        frameloop={prefersReducedMotion ? "demand" : "always"}
        performance={{ min: 0.5 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <ShaderPlane isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
}

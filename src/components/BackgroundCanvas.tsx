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

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
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

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
    float t = uTime * 0.55;

    vec2 drift = vec2(
      sin(t * 0.23) * 0.18 + cos(t * 0.11) * 0.04,
      cos(t * 0.19) * 0.12 + sin(t * 0.07) * 0.03
    );

    vec2 warpA = vec2(
      fbm(p * 1.8 + drift + vec2(1.7, 9.2)),
      fbm(p * 1.8 - drift + vec2(8.3, 2.8))
    );

    vec2 warpB = vec2(
      fbm(p * 2.6 + warpA * 1.4 + vec2(4.9, 1.2)),
      fbm(p * 2.4 - warpA * 1.2 + vec2(7.1, 6.4))
    );

    vec2 flow = drift + (warpA - 0.5) * 0.9 + (warpB - 0.5) * 0.45;

    vec2 rightArcPosition = (p - vec2(0.42, -0.28) + flow * 0.22) * vec2(0.82, 1.34);
    float rightArc = 1.0 - smoothstep(0.54, 1.16, length(rightArcPosition));

    vec2 leftMassPosition = (p - vec2(-0.36, 0.16) - flow * 0.18) * vec2(1.12, 0.96);
    float leftMass = 1.0 - smoothstep(0.28, 0.92, length(leftMassPosition));

    float field = fbm(p * 2.1 + flow * 1.6 + vec2(2.7, 0.6));
    float detail = fbm(p * 3.8 - flow * 1.1 + vec2(9.4, 3.1));
    float bands = smoothstep(
      0.18,
      0.92,
      fbm(vec2(p.x * 3.1 + flow.x * 0.8, p.y * 0.35 - t * 0.03 + 2.0))
    );

    float mass = max(rightArc * 0.95, leftMass * 0.82);
    float density = smoothstep(0.26, 0.86, field * 0.72 + detail * 0.28 + mass * 0.95);
    density *= mix(0.55, 1.0, bands);

    float calmCenter = 1.0 - smoothstep(0.0, 0.42, length((p - vec2(0.05, 0.12)) * vec2(0.8, 1.0)));
    density *= 1.0 - calmCenter * 0.55;
    density = clamp(density, 0.0, 1.0);

    float coarseGrain = hash(floor(gl_FragCoord.xy * 0.75) + vec2(t * 67.0, t * 41.0));
    float fineGrain = hash(gl_FragCoord.xy * 1.7 + vec2(t * 143.0, -t * 89.0));
    float farGrain = hash(gl_FragCoord.xy * 0.45 + vec2(t * 37.0));

    float particleMask = smoothstep(0.72 - density * 0.4, 0.98, coarseGrain);
    float particleMix = mix(0.45, 1.0, step(0.35, fineGrain));
    float farParticles = smoothstep(0.992, 1.0, farGrain) * 0.25;
    float particles = particleMask * particleMix + farParticles;

    float haze = density * smoothstep(0.14, 0.78, field) * 0.12;

    vec3 lightBase = vec3(0.94, 0.94, 0.93);
    vec3 darkBase = vec3(0.04, 0.04, 0.05);
    vec3 lightDots = vec3(0.08, 0.08, 0.09);
    vec3 darkDots = vec3(0.93, 0.92, 0.90);

    vec3 background = mix(lightBase, darkBase, uDark);
    vec3 dotColor = mix(lightDots, darkDots, uDark);

    float particleAlpha = mix(0.18, 0.72, density) * particles;
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
      : state.clock.getElapsedTime() * 0.18;
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
    <div className="fixed inset-0 -z-10 pointer-events-none">
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

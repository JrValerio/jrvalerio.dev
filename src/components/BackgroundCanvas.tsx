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
      p = p * 2.0 + vec2(13.1, 7.7);
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0) * 2.15;
    float t = uTime;

    float fieldA = fbm(p + vec2(t * 0.06, -t * 0.04));
    float fieldB = fbm(p * 1.7 - vec2(t * 0.03, t * 0.05));
    float field = mix(fieldA, fieldB, 0.42);

    float grain = (hash(gl_FragCoord.xy + t * 240.0) - 0.5) * 0.04;

    vec3 lightBase = vec3(0.93, 0.94, 0.97);
    vec3 lightMid = vec3(0.85, 0.88, 0.94);

    vec3 darkBase = vec3(0.07, 0.09, 0.13);
    vec3 darkMid = vec3(0.12, 0.15, 0.22);

    vec3 base = mix(lightBase, darkBase, uDark);
    vec3 mid = mix(lightMid, darkMid, uDark);

    vec3 color = mix(base, mid, smoothstep(0.16, 0.86, field));
    color += grain;

    float vignette = smoothstep(1.35, 0.2, length(p));
    color *= mix(0.9, 1.03, vignette);

    float alpha = mix(0.58, 0.72, uDark);
    gl_FragColor = vec4(color, alpha);
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
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <ShaderPlane isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
}

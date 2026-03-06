'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type BackgroundCanvasProps = {
  isDark?: boolean;
};

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
  uniform vec2 uMouse;
  uniform float uDark;
  varying vec2 vUv;

  mat2 rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

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
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amp * noise(p);
      p = rot(0.65) * p * 2.0 + 0.17;
      amp *= 0.5;
    }
    return value;
  }

  vec2 domainWarp(vec2 p, float t) {
    vec2 q = vec2(
      fbm(p + vec2(0.0, t * 0.18)),
      fbm(p + vec2(5.2, -t * 0.14))
    );

    vec2 r = vec2(
      fbm(p + 2.0 * q + vec2(1.7, t * 0.11)),
      fbm(p + 2.0 * q + vec2(8.3, -t * 0.17))
    );

    return r;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    uv.x *= aspect;

    vec2 mouse = uMouse * 2.0 - 1.0;
    mouse.x *= aspect;

    float t = uTime;
    vec2 flowUv = rot(0.32 + sin(t * 0.24) * 0.1) * uv;
    vec2 warp = domainWarp(flowUv * 1.35, t);
    vec2 warpedUv = flowUv + (warp - 0.5) * 0.68;

    float distToMouse = length(uv - mouse);
    float mouseWarp = smoothstep(1.0, 0.0, distToMouse) * 0.08;
    warpedUv += (uv - mouse) * mouseWarp;

    float flowA = fbm(warpedUv * 1.8 + vec2(t * 0.33, -t * 0.16));
    float flowB = fbm(warpedUv * 3.2 - vec2(t * 0.21, t * 0.25));
    float flow = mix(flowA, flowB, 0.5);

    vec2 silkUv = warpedUv + vec2(flow * 0.48, flowB * 0.31);
    float silk = abs(sin((silkUv.y + fbm(silkUv * 2.3 + t * 0.2) * 0.75) * 30.0));
    silk = pow(1.0 - silk, 3.5);

    float cursorGlow = smoothstep(0.95, 0.0, distToMouse);
    float bloom = smoothstep(0.55, 0.0, distToMouse);
    float grainFine = (hash(gl_FragCoord.xy * 0.95 + t * 180.0) - 0.5) * 0.028;
    float grainCoarse = (hash(gl_FragCoord.yx * 0.45 - t * 110.0) - 0.5) * 0.02;
    float filmGrain = grainFine + grainCoarse;

    vec3 lightBase = vec3(0.94, 0.95, 0.98);
    vec3 lightMid = vec3(0.84, 0.87, 0.93);
    vec3 lightAccent = vec3(0.41, 0.52, 0.77);

    vec3 darkBase = vec3(0.035, 0.04, 0.065);
    vec3 darkMid = vec3(0.09, 0.11, 0.17);
    vec3 darkAccent = vec3(0.44, 0.5, 0.74);

    vec3 baseDark = mix(lightBase, darkBase, uDark);
    vec3 baseMid = mix(lightMid, darkMid, uDark);
    vec3 accent = mix(lightAccent, darkAccent, uDark);

    float tone = smoothstep(0.12, 0.9, flow * 0.7 + flowB * 0.45);
    vec3 color = mix(baseDark, baseMid, tone);
    color += silk * accent * 0.2;
    color += cursorGlow * accent * 0.16;
    color += bloom * vec3(0.08, 0.1, 0.16);

    float vignette = smoothstep(1.6, 0.22, length(uv));
    color *= mix(0.88, 1.03, vignette);
    color += filmGrain;

    float alpha = mix(0.82, 0.92, uDark);
    gl_FragColor = vec4(color, alpha);
  }
`;

function ShaderPlane({ isDark = false }: BackgroundCanvasProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseCurrent = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(0, 0) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uDark: { value: isDark ? 1 : 0 },
    }),
    [isDark]
  );

  useEffect(() => {
    const updateMouse = (x: number, y: number) => {
      mouseTarget.current.set(x, 1 - y);
    };

    const handlePointerMove = (event: PointerEvent) => {
      updateMouse(event.clientX / window.innerWidth, event.clientY / window.innerHeight);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updateMouse(touch.clientX / window.innerWidth, touch.clientY / window.innerHeight);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.getElapsedTime() * 0.035;
    material.uniforms.uResolution.value.set(state.size.width, state.size.height);
    material.uniforms.uDark.value = isDark ? 1 : 0;

    mouseCurrent.current.lerp(mouseTarget.current, 0.05);
    material.uniforms.uMouse.value.copy(mouseCurrent.current);
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
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ShaderPlane isDark={isDark} />
      </Canvas>
    </div>
  );
}

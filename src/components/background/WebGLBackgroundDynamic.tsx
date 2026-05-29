"use client";

/**
 * Thin Client Component wrapper that defers WebGLBackground loading.
 *
 * Next.js 15 does not allow `ssr: false` in Server Components — the
 * dynamic() call with ssr:false must live inside a "use client" boundary.
 * layout-shell.tsx (a Server Component) imports this wrapper instead of
 * WebGLBackground directly, keeping the Three.js / @react-three/fiber
 * module graph out of the critical JS parse budget.
 */
import dynamic from "next/dynamic";

const WebGLBackground = dynamic(() => import("./WebGLBackground"), {
  ssr: false,
  loading: () => null,
});

type Props = { framed?: boolean };

export default function WebGLBackgroundDynamic({ framed = false }: Props) {
  return <WebGLBackground framed={framed} />;
}

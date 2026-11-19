import { defineConfig } from "vitest/config";

export default defineConfig({
  // Vite 8 transforms TS/JSX with Oxc (the `esbuild` option is ignored).
  // tsconfig keeps `jsx: preserve` for Next, so force the automatic runtime here.
  oxc: {
    jsx: { runtime: "automatic" },
  },
  test: {
    // Default: node for pure TS domain tests.
    // Component tests declare @vitest-environment happy-dom at the top of the file.
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});

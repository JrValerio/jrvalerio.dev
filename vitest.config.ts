import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    // Use React 18 automatic JSX runtime — no need to import React in every file.
    jsx: "automatic",
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

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// RTL's auto-cleanup hooks into jest/vitest globals. Without globals:true in
// the vitest config, we wire it up explicitly so the DOM resets between tests.
afterEach(() => cleanup());

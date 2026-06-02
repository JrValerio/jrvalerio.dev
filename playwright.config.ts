import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npm run start",
    port: 3000,
    timeout: 60000,
    // Reuse an already-running server in local dev; always start fresh in CI
    reuseExistingServer: !process.env.CI,
    env: {
      // Signals the contact Server Action to skip Resend and return success.
      // Keeps E2E tests independent of domain verification / API availability.
      PLAYWRIGHT_E2E: "1",
    },
  },
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

import { sendContact, UNAVAILABLE_MESSAGE } from "./send-contact";

function form(overrides: Record<string, string> = {}) {
  const fd = new FormData();
  const values = {
    name: "Maria",
    email: "maria@example.com",
    message: "Quero conversar sobre um projeto.",
    website_url_secondary: "",
    ...overrides,
  };
  for (const [k, v] of Object.entries(values)) fd.set(k, v);
  return fd;
}

describe("sendContact", () => {
  beforeEach(() => {
    send.mockReset();
    vi.unstubAllEnvs();
    vi.stubEnv("PLAYWRIGHT_E2E", "");
    vi.stubEnv("RESEND_API_KEY", "");
  });
  afterEach(() => vi.unstubAllEnvs());

  it("fails closed in production when RESEND_API_KEY is missing", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});

    const state = await sendContact({ status: "idle" }, form());

    expect(state).toEqual({ status: "error", message: UNAVAILABLE_MESSAGE });
    expect(send).not.toHaveBeenCalled();
    expect(errorLog).toHaveBeenCalled();
    errorLog.mockRestore();
  });

  it("reports success without sending in development when the key is missing", async () => {
    vi.stubEnv("NODE_ENV", "development");

    const state = await sendContact({ status: "idle" }, form());

    expect(state.status).toBe("success");
    expect(send).not.toHaveBeenCalled();
  });

  it("never sends during E2E runs", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("PLAYWRIGHT_E2E", "1");
    vi.stubEnv("RESEND_API_KEY", "re_test");

    const state = await sendContact({ status: "idle" }, form());

    expect(state.status).toBe("success");
    expect(send).not.toHaveBeenCalled();
  });

  it("sends through Resend when the key is set", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    send.mockResolvedValue({ error: null });

    const state = await sendContact({ status: "idle" }, form());

    expect(state.status).toBe("success");
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({ replyTo: "maria@example.com" }),
    );
  });

  it("returns an error when Resend rejects the message", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    send.mockResolvedValue({ error: { message: "boom" } });
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});

    const state = await sendContact({ status: "idle" }, form());

    expect(state.status).toBe("error");
    errorLog.mockRestore();
  });

  it("returns field errors for invalid input", async () => {
    const state = await sendContact({ status: "idle" }, form({ email: "x" }));

    expect(state.status).toBe("error");
    expect(state.fieldErrors?.email).toBeDefined();
  });
});

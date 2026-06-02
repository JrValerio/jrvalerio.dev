"use server";

import { z } from "zod";
import { Resend } from "resend";

const HONEYPOT_FIELD = "website_url_secondary";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório").max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido"),
  message: z
    .string()
    .min(10, "Mensagem muito curta (mínimo 10 caracteres)")
    .max(2000, "Mensagem muito longa (máximo 2000 caracteres)"),
  [HONEYPOT_FIELD]: z.literal("", { error: "Spam detectado" }),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
  message?: string;
};

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    [HONEYPOT_FIELD]: formData.get(HONEYPOT_FIELD) ?? "",
  };

  const result = schema.safeParse(raw);
  if (!result.success) {
    type FieldKey = "name" | "email" | "message";
    const fieldErrors: Partial<Record<FieldKey, string>> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (field === "name" || field === "email" || field === "message") {
        fieldErrors[field] = issue.message;
      }
    }
    // Honeypot filled — return idle silently (don't reveal to bots)
    if (result.error.issues.some((i) => i.path[0] === HONEYPOT_FIELD)) {
      return { status: "idle" };
    }
    return { status: "error", fieldErrors };
  }

  // Rate limiting: deliberate decision to rely on Resend's built-in daily cap
  // (100 emails/day on free tier) plus honeypot as primary bot defense.
  // In-memory rate limiting doesn't work reliably across Vercel serverless
  // instances. Upgrade to Vercel KV if abuse becomes a problem.

  // Skip actual sending in E2E test runs and dev (no API key)
  if (process.env.PLAYWRIGHT_E2E === "1" || !process.env.RESEND_API_KEY) {
    return { status: "success" };
  }
  const apiKey = process.env.RESEND_API_KEY;

  const resend = new Resend(apiKey);
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "amarovsjr81@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: result.data.email,
    subject: `Portfólio — mensagem de ${result.data.name}`,
    text: `Nome: ${result.data.name}\nE-mail: ${result.data.email}\n\n${result.data.message}`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return {
      status: "error",
      message:
        "Erro ao enviar mensagem. Tente novamente ou use o e-mail diretamente.",
    };
  }

  return { status: "success" };
}

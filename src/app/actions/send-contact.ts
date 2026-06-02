"use server";

import { z } from "zod";
import { Resend } from "resend";
import { headers } from "next/headers";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório").max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido"),
  message: z
    .string()
    .min(10, "Mensagem muito curta (mínimo 10 caracteres)")
    .max(2000, "Mensagem muito longa (máximo 2000 caracteres)"),
  company: z.literal("", { error: "Spam detectado" }),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
  message?: string;
};

// In-memory rate limit: 3 submissions per IP per hour
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const limit = 3;

  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < windowMs
  );

  if (timestamps.length >= limit) return true;

  rateLimitMap.set(ip, [...timestamps, now]);
  return false;
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
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
    if (result.error.issues.some((i) => i.path[0] === "company")) {
      return { status: "idle" };
    }
    return { status: "error", fieldErrors };
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Muitas tentativas. Tente novamente em 1 hora.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev fallback: log to console instead of failing
    console.log("[contact] would send:", result.data);
    return { status: "success" };
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "amarovsjr81@gmail.com";

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

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
      message: "Erro ao enviar mensagem. Tente novamente ou use o e-mail diretamente.",
    };
  }

  return { status: "success" };
}

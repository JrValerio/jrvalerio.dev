"use client";

import { useActionState, useRef } from "react";
import { sendContact, type ContactState } from "../app/actions/send-contact";
import Button from "./UI/Button";

const initial: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, action, isPending] = useActionState(sendContact, initial);
  const formRef = useRef<HTMLFormElement>(null);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col gap-3 rounded-sm border border-[var(--jr-border)] p-6"
      >
        <p className="jr-meta text-[var(--jr-accent)]">Mensagem enviada</p>
        <p className="jr-body text-[var(--jr-muted)]">
          Obrigado pelo contato. Responderei em até 48 horas.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from real users, bots fill it.
          Name uses a non-semantic string to avoid browser/password-manager auto-fill. */}
      <input
        type="text"
        name="website_url_secondary"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-name" className="jr-meta">
          Nome
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          disabled={isPending}
          className="jr-input"
          aria-describedby={state.fieldErrors?.name ? "cf-name-error" : undefined}
        />
        {state.fieldErrors?.name && (
          <p id="cf-name-error" role="alert" className="text-xs text-red-500">
            {state.fieldErrors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-email" className="jr-meta">
          E-mail
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={isPending}
          className="jr-input"
          aria-describedby={state.fieldErrors?.email ? "cf-email-error" : undefined}
        />
        {state.fieldErrors?.email && (
          <p id="cf-email-error" role="alert" className="text-xs text-red-500">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className="jr-meta">
          Mensagem
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          disabled={isPending}
          className="jr-input resize-y"
          aria-describedby={state.fieldErrors?.message ? "cf-message-error" : undefined}
        />
        {state.fieldErrors?.message && (
          <p id="cf-message-error" role="alert" className="text-xs text-red-500">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-red-500">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="self-start">
        {isPending ? "Enviando…" : "Enviar mensagem"}
      </Button>
    </form>
  );
}

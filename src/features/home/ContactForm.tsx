"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "../../app/actions/send-contact";
import { buttonClass } from "../../design-system";
import type { HomeCopy } from "../../content/home";

const initial: ContactState = { status: "idle" };
const field =
  "w-full rounded-md border border-[var(--jv-border)] bg-transparent px-4 py-3 text-[15px] text-[var(--jv-fg)] placeholder:text-[var(--jv-muted)] focus-visible:border-[var(--jv-accent)] focus-visible:outline-2 focus-visible:outline-[var(--jv-accent)]";

export default function ContactForm({ copy }: { copy: HomeCopy["contact"]["form"] }) {
  const [state, action, pending] = useActionState(sendContact, initial);

  if (state.status === "success") {
    return (
      <p role="status" className="rounded-md border border-[var(--jv-border)] p-6 text-[var(--jv-fg)]">
        {copy.success}
      </p>
    );
  }

  const error = (name: "name" | "email" | "message") =>
    state.fieldErrors?.[name] ? (
      <p id={`jv-${name}-error`} role="alert" className="text-sm text-[var(--jv-fg)] underline decoration-[var(--jv-accent)]">
        {state.fieldErrors[name]}
      </p>
    ) : null;

  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website_url_secondary" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="jv-name" className="text-sm font-bold text-[var(--jv-fg)]">{copy.name}</label>
        <input id="jv-name" name="name" required autoComplete="name" className={field} aria-invalid={Boolean(state.fieldErrors?.name)} aria-describedby={state.fieldErrors?.name ? "jv-name-error" : undefined} />
        {error("name")}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="jv-email" className="text-sm font-bold text-[var(--jv-fg)]">{copy.email}</label>
        <input id="jv-email" name="email" type="email" required autoComplete="email" className={field} aria-invalid={Boolean(state.fieldErrors?.email)} aria-describedby={state.fieldErrors?.email ? "jv-email-error" : undefined} />
        {error("email")}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="jv-message" className="text-sm font-bold text-[var(--jv-fg)]">{copy.message}</label>
        <textarea id="jv-message" name="message" required rows={5} className={field} aria-invalid={Boolean(state.fieldErrors?.message)} aria-describedby={state.fieldErrors?.message ? "jv-message-error" : undefined} />
        {error("message")}
      </div>
      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-[var(--jv-fg)]">{state.message}</p>
      )}
      <button type="submit" disabled={pending} className={buttonClass("primary", "self-start")}>
        {pending ? copy.sending : copy.submit}
      </button>
    </form>
  );
}

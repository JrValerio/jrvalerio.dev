import Link from "next/link";

/**
 * App Router global not-found boundary.
 * Replaces the legacy src/pages/404.tsx without next-i18next dependency.
 * robots: noindex is set via metadata below.
 */
export const metadata = {
  title: "404 — Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-sm font-mono text-[var(--jr-accent)] mb-4 tracking-widest uppercase">
        404
      </p>
      <h1 className="text-4xl font-bold mb-4 text-[var(--jr-text)]">
        Página não encontrada
      </h1>
      <p className="text-base text-[var(--jr-muted)] mb-8 max-w-sm">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Link
        href="/v2"
        className="px-5 py-2 rounded-lg bg-[var(--jr-accent)] text-white text-sm font-medium
                   hover:opacity-90 transition-opacity focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-[var(--jr-accent)]"
      >
        Voltar ao início
      </Link>
    </section>
  );
}

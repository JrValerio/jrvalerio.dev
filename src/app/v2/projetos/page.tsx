import type { Metadata } from "next";
import Link from "next/link";
import Work from "../../../components/Work";
import Container from "../../../components/UI/Container";

export const metadata: Metadata = {
  alternates: {
    canonical: "/v2/projetos",
  },
};

export default function V2ProjectsPage() {
  return (
    <>
      <Work
        title="All Projects"
        subtitle="Cases focados em produto digital, engenharia pragmatica e experiencia."
      />

      <section className="border-t border-[var(--jr-border)] py-12">
        <Container>
          <p className="jr-body max-w-2xl text-[var(--jr-muted)]">
            Quer ver projetos de estudo e iteracoes anteriores? Explore o{" "}
            <Link href="/v2/archive" className="jr-link">
              Archive
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Work from "../../../components/Work";
import Container from "../../../components/UI/Container";
import { getV2Messages, toLocalePath } from "../../../i18n/v2";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: {
    canonical: "/v2/projetos",
  },
};

export default function V2ProjectsPage() {
  const locale = "pt-BR";
  const prefixed = false;
  const messages = getV2Messages(locale);

  return (
    <>
      <Work
        title={messages.work.allTitle}
        subtitle={messages.work.allSubtitle}
        locale={locale}
        prefixed={prefixed}
      />

      <section className="border-t border-[var(--jr-border)] py-12">
        <Container>
          <p className="jr-body max-w-2xl text-[var(--jr-muted)]">
            {messages.work.archiveLead}{" "}
            <Link href={toLocalePath("/v2/archive", locale, prefixed)} className="jr-link">
              {messages.work.archiveLink}
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}

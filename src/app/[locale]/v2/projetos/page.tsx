import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Work from "../../../../components/Work";
import Container from "../../../../components/UI/Container";
import {
  getLocaleFromSegment,
  getV2Messages,
  toLocalePath,
  type V2LocaleSegment,
} from "../../../../i18n/v2";

export const dynamic = "force-static";

type LocalizedProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedProjectsPageProps): Promise<Metadata> {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) return {};

  return {
    alternates: {
      canonical: `/${segment}/v2/projetos`,
    },
  };
}

export default async function LocalizedProjectsPage({ params }: LocalizedProjectsPageProps) {
  const { locale: segment } = await params;
  const locale = getLocaleFromSegment(segment as V2LocaleSegment);
  if (!locale) notFound();

  const messages = getV2Messages(locale);

  return (
    <>
      <Work
        title={messages.work.allTitle}
        subtitle={messages.work.allSubtitle}
        locale={locale}
        prefixed
      />

      <section className="border-t border-[var(--jr-border)] py-12">
        <Container>
          <p className="jr-body max-w-2xl text-[var(--jr-muted)]">
            {messages.work.archiveLead}{" "}
            <Link href={toLocalePath("/v2/archive", locale, true)} className="jr-link">
              {messages.work.archiveLink}
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}

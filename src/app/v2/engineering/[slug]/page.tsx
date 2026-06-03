import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../../components/JsonLd";
import AdrDetailContent from "../../../../features/v2/adr-detail-content";
import { getAdrBySlug, getAllAdrs } from "../../../../lib/adr";
import { getAdrTechArticleJsonLd } from "../../../../lib/structured-data";

type AdrPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllAdrs().map((adr) => ({ slug: adr.slug }));
}

export async function generateMetadata({ params }: AdrPageProps): Promise<Metadata> {
  const { slug } = await params;
  const adr = getAdrBySlug(slug);

  if (!adr) {
    return { title: "ADR not found" };
  }

  return {
    title: `${adr.id} | ${adr.title}`,
    description: adr.summary,
    alternates: {
      canonical: `/v2/engineering/${adr.slug}`,
    },
  };
}

export default async function AdrPage({ params }: AdrPageProps) {
  const { slug } = await params;
  const adr = getAdrBySlug(slug);

  if (!adr) {
    notFound();
  }

  return (
    <>
      <JsonLd data={getAdrTechArticleJsonLd(adr, `/v2/engineering/${adr.slug}`)} />
      <AdrDetailContent adr={adr} locale="pt-BR" prefixed={false} />
    </>
  );
}

import '@/styles/legal.css';
import { notFound } from 'next/navigation';
import LegalPage from '@/components/legal/LegalPage';
import { legalDocs, legalSettings } from '@/content/legal';

// /terminos, /privacidad y /cookies. Para añadir otra política, crea content/legal/<slug>.js
// y regístrala en content/legal/index.js.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(legalDocs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = legalDocs[slug];
  if (!doc) return {};
  return {
    title: doc.title, // el layout añade " · ÄCOVERSO"
    description: doc.intro,
    alternates: { canonical: `/${slug}` },
    // Mientras sean borrador, Google no las indexa
    ...(legalSettings.showDraftNotice && { robots: { index: false, follow: true } }),
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!legalDocs[slug]) notFound();
  return <LegalPage slug={slug} />;
}

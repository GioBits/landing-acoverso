import '@/styles/legal.css';
import { notFound } from 'next/navigation';
import LegalPage from '@/components/legal/LegalPage';
import { legalDocs } from '@/content/legal';
import { site } from '@/config/site';

// /terminos, /privacidad y /cookies. Para añadir otra política, crea content/legal/<slug>.js
// y regístrala en content/legal/index.js.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(legalDocs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = legalDocs[slug];
  return doc ? { title: `${doc.title} · ${site.name}`, alternates: { canonical: `/${slug}` } } : {};
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!legalDocs[slug]) notFound();
  return <LegalPage slug={slug} />;
}

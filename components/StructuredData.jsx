import { site } from '@/config/site';
import { faq } from '@/content/home';

// Datos estructurados (JSON-LD) para Google y buscadores con IA: quién es ÄCOVERSO y sus preguntas frecuentes.
// Las respuestas pendientes ("[...]") no se publican hasta completarlas en content/home.js.
export default function StructuredData() {
  const org = `${site.url}/#organization`;
  const questions = faq.groups
    .flatMap((g) => g.items)
    .filter((it) => !/\[[^\]]+\]/.test(it.a))
    .map((it) => ({ '@type': 'Question', name: `¿${it.q}?`, acceptedAnswer: { '@type': 'Answer', text: it.a } }));

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: site.name,
        alternateName: site.alternateName,
        legalName: site.company,
        url: site.url,
        logo: `${site.url}/img/logo.png`,
        description: site.description,
        sameAs: [site.instagram.url],
      },
      { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, alternateName: site.alternateName, inLanguage: 'es', publisher: { '@id': org } },
      ...(questions.length ? [{ '@type': 'FAQPage', '@id': `${site.url}/#faq`, inLanguage: 'es', mainEntity: questions }] : []),
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

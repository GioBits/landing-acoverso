import { legalDocs, legalSettings } from '@/content/legal';
import { documentHash } from '@/lib/legal';
import { site } from '@/config/site';

// Plantilla común de las páginas legales. El texto de cada una está en content/legal/<slug>.js
export default function LegalPage({ slug }) {
  const doc = legalDocs[slug];
  const hash = documentHash(doc);
  const toc = [...doc.body.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)].map(([, id, t]) => ({ id, label: t.replace(/^\d+\.\s*/, '') }));
  const links = [
    ['terminos', 'Términos y condiciones'],
    ['privacidad', 'Privacidad'],
    ['cookies', 'Cookies'],
  ];
  return (
    <div className="legal-page">
      <header>
        <div className="wrap">
          <a href="/" aria-label="Volver a ÄCOVERSO"><img src="/img/logo.png" alt="ÄCOVERSO" width="50" height="24" /></a>
          <a href="/">Volver a la web</a>
        </div>
      </header>
      <main className="wrap" id="doc">
        <p className="k">Documento legal</p>
        <h1>{doc.title}</h1>
        <p className="intro">{doc.intro}</p>
        <p className="meta">
          <span><b>Versión</b> {doc.version}</span>
          <span><b>Vigente desde</b> <span dangerouslySetInnerHTML={{ __html: legalSettings.effectiveDate }} /></span>
          <span><b>Huella SHA-256</b> {hash.slice(0, 16)}…</span>
        </p>
        {legalSettings.showDraftNotice && (
          <p className="draft">Borrador pendiente de revisión legal. Los datos marcados en amarillo deben completarse y el texto debe revisarlo un abogado antes de publicar la web.</p>
        )}
        <ul className="toc">{toc.map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>)}</ul>
        <article id="doc-body" dangerouslySetInnerHTML={{ __html: doc.body }} />
      </main>
      <footer>
        <div className="wrap">
          {links.map(([s, label]) => (
            <a key={s} href={`/${s}`} aria-current={s === slug ? 'page' : undefined}>{label}</a>
          ))}
          <a href="/#cookies">Preferencias de cookies</a>
          <span>© {new Date().getFullYear()} {site.company}</span>
        </div>
      </footer>
    </div>
  );
}

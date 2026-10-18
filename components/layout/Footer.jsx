import { Fragment } from 'react';
import { legalNotice } from '@/content/home';
import { site } from '@/config/site';

const LINKS = {
  terminos: <a href="/terminos">Términos y condiciones</a>,
  privacidad: <a href="/privacidad">Política de privacidad</a>,
};

// Aviso legal al final de la página. Su texto se guarda en el registro de cada visita que agenda.
export function LegalNotice() {
  const parts = legalNotice.split(/\{(terminos|privacidad)\}/);
  return (
    <section className="legal-note" id="legal" aria-label="Aviso legal">
      <div className="wrap">
        <p id="legal-txt">
          {parts.map((p, i) => (i % 2 ? <Fragment key={i}>{LINKS[p]}</Fragment> : p))}
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <img src="/img/logo.png" alt="ÄCOVERSO" width="66" height="32" />
        <nav aria-label="Legal y redes">
          <a href={site.instagram.url} target="_blank" rel="noopener">Instagram {site.instagram.handle}</a>
          <a href="/terminos">Términos y condiciones</a>
          <a href="/privacidad">Privacidad</a>
          <a href="/cookies">Cookies</a>
          <button type="button" className="linkbtn" data-cookie-prefs="">Preferencias de cookies</button>
          <span>© {new Date().getFullYear()} {site.company}. Todos los derechos reservados.</span>
        </nav>
      </div>
    </footer>
  );
}

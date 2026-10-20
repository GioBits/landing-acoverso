// Aviso y panel de cookies. Solo aparece si hay píxel de Meta o Google Analytics en config/site.js.
// La lógica está en lib/behaviors/cookies.js

const OPTIONAL = [
  { id: 'ck-analytics', title: 'Medición', text: 'Google Analytics, para contar visitas de forma agregada.' },
  { id: 'ck-marketing', title: 'Publicidad', text: 'Píxel de Meta, para medir y personalizar anuncios.' },
];

export function CookieConsent() {
  return (
    <>
      <div className="ck-bar" id="ckBar" role="region" aria-label="Aviso de cookies" hidden>
        <p>Usamos cookies opcionales para medir visitas y mejorar nuestros anuncios. Solo se activan si las aceptas. <a href="/cookies">Política de cookies</a></p>
        <div className="ck-actions">
          <button type="button" className="btn btn--ghost btn--sm" data-ck="reject">Rechazar</button>
          <button type="button" className="btn btn--ghost btn--sm" data-cookie-prefs="">Configurar</button>
          <button type="button" className="btn btn--sm" data-ck="accept">Aceptar</button>
        </div>
      </div>
      <div className="ck-modal" id="ckModal" role="dialog" aria-modal="true" aria-labelledby="ckTitle" hidden>
        <div className="ck-panel">
          <h2 className="ant" id="ckTitle">Preferencias de cookies</h2>
          <p>Elige qué tecnologías opcionales permites. Puedes cambiarlo cuando quieras desde el pie de página.</p>
          <div className="ck-row">
            <div><b>Necesarias</b><span>Guardan tus preferencias y permiten agendar la llamada. Siempre activas.</span></div>
            <input type="checkbox" defaultChecked disabled aria-label="Necesarias, siempre activas" />
          </div>
          {OPTIONAL.map((o) => (
            <div className="ck-row" key={o.id}>
              <div><b>{o.title}</b><span>{o.text}</span></div>
              <input type="checkbox" id={o.id} aria-label={o.title} />
            </div>
          ))}
          <div className="ck-actions">
            <button type="button" className="btn btn--ghost btn--sm" data-ck="reject">Rechazar todo</button>
            <button type="button" className="btn btn--ghost btn--sm" data-ck="save">Guardar selección</button>
            <button type="button" className="btn btn--sm" data-ck="accept">Aceptar todo</button>
          </div>
        </div>
      </div>
    </>
  );
}

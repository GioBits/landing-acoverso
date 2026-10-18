// Agenda de diagnóstico: posición según pantalla, pregunta, registro del aviso legal y calendario de Cal.com.

/* En móvil la agenda va justo después del hero; en PC (≥1024 px) se mueve al final como sección propia */
export function agendaPlacement(ctx) {
  const { doc, $ } = ctx;
  const ag = $('agenda'), rest = doc.querySelector('.rest'), hero = $('hero');
  const mq = window.matchMedia('(min-width:1024px)');
  const place = () => {
    if (mq.matches) { rest.appendChild(ag); ag.classList.add('mod'); ag.setAttribute('data-lit', ''); }
    else { hero.parentNode.insertBefore(ag, hero.nextSibling); ag.classList.remove('mod'); ag.removeAttribute('data-lit'); }
    if (ctx.ready) ctx.measure();
  };
  place();
  mq.addEventListener ? mq.addEventListener('change', place) : mq.addListener(place);
}

function uuid() {
  try { return crypto.randomUUID(); } catch {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16); });
  }
}

/* Registro trazable: al abrirse el calendario se envía a /api/consent el aviso legal mostrado,
   la versión y la huella de cada documento. El servidor añade IP y hora. */
function logNotice(ctx, answer) {
  const { doc, $, config, legalDocs } = ctx;
  if (ctx.consentId) return ctx.consentId;
  const now = new Date(), id = uuid(); ctx.consentId = id;
  const abs = (h) => new URL(h, location.href).href;
  const rec = {
    consent_id: id, form: 'agenda_diagnostico', method: 'aviso_legal_al_agendar',
    client_time: now.toISOString(), client_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '', client_utc_offset_min: -now.getTimezoneOffset(),
    page_url: location.href, referrer: doc.referrer || '', language: navigator.language || '', user_agent: navigator.userAgent, viewport: `${window.innerWidth}x${window.innerHeight}`,
    notice_text: $('legal-txt').textContent.replace(/\s+/g, ' ').trim(),
    terms: { document_url: abs('/terminos'), ...legalDocs.terminos },
    privacy: { document_url: abs('/privacidad'), ...legalDocs.privacidad },
    answers: { vende_producto: answer },
  };
  const url = config.consentEndpoint;
  if (url) {
    const body = JSON.stringify(rec);
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true })
      .catch(() => { try { navigator.sendBeacon && navigator.sendBeacon(url, new Blob([body], { type: 'text/plain' })); } catch {} });
  }
  try { sessionStorage.setItem('aco_consent_id', id); } catch {}
  return id;
}

/* Cal.com: se carga al responder Sí, con el ID del registro en los metadatos de la reserva */
function loadCal(ctx, consentId) {
  const { $, config } = ctx;
  if (!config.calLink || ctx.calLoaded) return; ctx.calLoaded = true;
  $('calDemo').hidden = true; $('calEmbed').style.minHeight = '560px';
  (function (C, A, L) {
    const p = (a, ar) => a.q.push(ar); const d = C.document;
    C.Cal = C.Cal || function () {
      const cal = C.Cal; const ar = arguments;
      if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); }; const ns = ar[1]; api.q = api.q || [];
        if (typeof ns === 'string') { cal.ns[ns] = cal.ns[ns] || api; p(cal.ns[ns], ar); p(cal, ['initNamespace', ns]); } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, 'https://app.cal.com/embed/embed.js', 'init');
  window.Cal('init', { origin: 'https://cal.com' });
  window.Cal('inline', { elementOrSelector: '#calEmbed', calLink: config.calLink, layout: 'month_view', config: { 'metadata[consent_id]': consentId, theme: 'dark' } });
}

export function agendaFlow(ctx) {
  const { doc, $ } = ctx;
  let answer = null;
  const render = () => {
    ['si', 'no'].forEach((v) => $('q1-' + v).setAttribute('aria-pressed', answer === v ? 'true' : 'false'));
    $('boxNo').hidden = answer !== 'no'; $('boxCal').hidden = answer !== 'si'; $('reset').hidden = answer === null;
    $('stepNum').textContent = answer === 'si' ? 'Paso 2 de 2' : 'Paso 1 de 2';
    if (answer === 'si') loadCal(ctx, logNotice(ctx, answer));
    ctx.measure();
  };
  doc.querySelectorAll('.yn button').forEach((b) => b.addEventListener('click', () => { answer = b.dataset.v; render(); }));
  $('reset').addEventListener('click', () => { answer = null; render(); $('q1-si').focus(); });
  // Vista de ejemplo del calendario (solo sin calLink)
  const days = [...$('calDays').querySelectorAll('button:not(:disabled)')];
  days.forEach((b) => b.addEventListener('click', () => days.forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'))));
  render();
}

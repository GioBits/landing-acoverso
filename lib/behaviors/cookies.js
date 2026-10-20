// Cookies opcionales (Google Analytics, píxel de Meta): desactivadas hasta que se aceptan.
// El aviso solo aparece si hay gaId o metaPixelId en config/site.js.

const KEY = 'aco_cookie_prefs';

export function cookies(ctx) {
  const { doc, $, config } = ctx;
  let prefs = null; const loaded = {};

  const read = () => {
    try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (v && v.v === 1 && Date.now() - v.ts < 365 * 864e5) return v; } catch {}
    return null;
  };
  const apply = () => {
    if (!prefs) return;
    if (prefs.analytics && config.gaId && !loaded.ga) {
      loaded.ga = 1; const g = doc.createElement('script'); g.async = true;
      g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.gaId); doc.head.appendChild(g);
      window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date()); window.gtag('config', config.gaId, { anonymize_ip: true });
    }
    if (prefs.marketing && config.metaPixelId && !loaded.px) {
      loaded.px = 1;
      !(function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); })(window, doc, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', config.metaPixelId); window.fbq('track', 'PageView');
    }
  };
  const save = (o) => {
    prefs = { v: 1, ts: Date.now(), analytics: !!o.analytics, marketing: !!o.marketing };
    try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch {}
    apply();
  };

  const bar = $('ckBar'), modal = $('ckModal'); let lastFocus = null;
  const open = () => {
    lastFocus = doc.activeElement; const p = prefs || {};
    $('ck-analytics').checked = !!p.analytics; $('ck-marketing').checked = !!p.marketing;
    modal.hidden = false; $('ck-analytics').focus();
  };
  const close = () => { modal.hidden = true; bar.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); };
  doc.querySelectorAll('[data-cookie-prefs]').forEach((b) => b.addEventListener('click', open));
  doc.querySelectorAll('[data-ck]').forEach((b) => b.addEventListener('click', () => {
    const a = b.dataset.ck;
    if (a === 'accept') save({ analytics: 1, marketing: 1 });
    else if (a === 'reject') save({});
    else save({ analytics: $('ck-analytics').checked, marketing: $('ck-marketing').checked });
    close();
  }));
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  doc.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });

  prefs = read(); apply();
  if (!prefs && (config.metaPixelId || config.gaId)) bar.hidden = false;
  if (location.hash === '#cookies') setTimeout(open, 300);

  ctx.cookies = { get: () => prefs, save };
}

/* Reproductor según el enlace: YouTube (dominio sin cookies de seguimiento) o Loom */
function videoEmbed(url) {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  // cc_load_policy=0: subtítulos apagados al empezar (YouTube puede ignorarlo si el visitante los tiene activados en su cuenta)
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1&cc_load_policy=0&iv_load_policy=3`;
  const loom = url.replace('/share/', '/embed/');
  return loom + (loom.includes('?') ? '&' : '?') + 'autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true';
}

/* Vídeo del hero: el reproductor no se carga hasta pulsar reproducir; al pulsar arranca directo */
export function heroVideos(ctx) {
  const { doc, config } = ctx;
  const mount = (btn) => {
    const box = btn.closest('.video'), video = config.videos[btn.dataset.video];
    const f = doc.createElement('iframe');
    f.src = videoEmbed(video.url);
    f.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture'; f.allowFullscreen = true; f.title = btn.getAttribute('aria-label');
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    box.innerHTML = ''; box.appendChild(f);
  };
  doc.querySelectorAll('.play[data-video]').forEach((btn) => btn.addEventListener('click', () => mount(btn)));
}

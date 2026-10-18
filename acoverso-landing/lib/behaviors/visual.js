// Efectos visuales: grano del fondo, encendido de secciones, cifras animadas y brillo bajo el cursor.
import { formatNumber } from '@/lib/format';

/* Grano del fondo: se genera una vez en un canvas pequeño y se usa como textura */
export function grain({ $ }) {
  const c = $('grain'); if (!c) return;
  const s = 180; c.width = s; c.height = s;
  const x = c.getContext('2d'); if (!x) return;
  const d = x.createImageData(s, s);
  for (let i = 0; i < d.data.length; i += 4) { const v = (Math.random() * 255) | 0; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  x.putImageData(d, 0, 0);
  c.style.width = '100%'; c.style.height = '100%';
  c.style.backgroundImage = `url(${c.toDataURL()})`; c.style.backgroundSize = s + 'px';
  c.width = 1; c.height = 1;
}

/* Secciones [data-lit]: se encienden al entrar en pantalla y se apagan al salir, para repetirse en cada pasada */
export function litSections({ doc, reduce, hasIO }) {
  const lit = [...doc.querySelectorAll('[data-lit]')];
  if (reduce || !hasIO) { lit.forEach((el) => el.classList.add('is-lit')); return; }
  const timers = new WeakMap();
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const t = e.target; clearTimeout(timers.get(t));
    if (e.isIntersecting) {
      if (t.tagName === 'LI') { const i = [...t.parentNode.children].indexOf(t); timers.set(t, setTimeout(() => t.classList.add('is-lit'), (i % 6) * 120)); }
      else t.classList.add('is-lit');
    } else t.classList.remove('is-lit');
  }), { rootMargin: '0px 0px -14% 0px' });
  lit.forEach((el) => io.observe(el));
}

/* Cifras .num[data-num]: suben de 0 al valor cada vez que entran en pantalla */
export function counters({ doc, reduce, hasIO }) {
  const nums = [...doc.querySelectorAll('.num[data-num]')];
  nums.forEach((el) => {
    el._t = +el.dataset.num || 0; el._p = el.dataset.pre || ''; el._s = el.dataset.suf || '';
    el._f = el._p + formatNumber(el._t) + el._s; el.setAttribute('aria-label', el._f);
  });
  const play = (el) => {
    cancelAnimationFrame(el._a); let t0 = 0; const dur = el._t >= 1000 ? 1600 : 1200;
    el._a = requestAnimationFrame(function tick(t) {
      if (!t0) t0 = t; const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = el._p + formatNumber(Math.round(el._t * e)) + el._s;
      if (p < 1) el._a = requestAnimationFrame(tick); else el.textContent = el._f;
    });
  };
  const reset = (el) => { cancelAnimationFrame(el._a); el.textContent = el._p + '0' + el._s; };
  if (!reduce && hasIO) {
    const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? play(e.target) : reset(e.target))), { threshold: 0.5 });
    nums.forEach((el) => io.observe(el));
  }
}

/* Tarjetas y secciones "iluminadas": el borde de cada tarjeta y el filo de cada sección siguen al puntero; en táctil, al tocar */
export function hoverGlow({ doc, fine }) {
  const HOT = '.card,.mod,.model,.phase,.feat li,.result';
  let pend = null, raf = 0;
  const paint = () => {
    raf = 0; const e = pend; if (!e) return;
    const card = e.target.closest && e.target.closest('.card');
    if (card) { const r = card.getBoundingClientRect(); card.style.setProperty('--mx', e.clientX - r.left + 'px'); card.style.setProperty('--my', e.clientY - r.top + 'px'); }
    const m = e.target.closest && e.target.closest('.mod');
    if (m) { const ed = m.querySelector('.edge'); if (ed) { const r2 = ed.getBoundingClientRect(); m.style.setProperty('--gx', Math.max(0, Math.min(r2.width, e.clientX - r2.left)) + 'px'); } }
  };
  const track = (e) => { pend = e; if (!raf) raf = requestAnimationFrame(paint); };
  const heat = (target, on) => { let el = target; while (el && el !== doc.body) { if (el.matches && el.matches(HOT)) el.classList.toggle('hot', on); el = el.parentElement; } };
  const coolAll = () => doc.querySelectorAll('.hot').forEach((x) => x.classList.remove('hot'));
  if (fine) {
    doc.addEventListener('pointermove', track, { passive: true });
    doc.addEventListener('pointerover', (e) => heat(e.target, true), { passive: true });
    doc.addEventListener('pointerout', (e) => {
      if (!e.relatedTarget) return; const to = e.relatedTarget; let el = e.target;
      while (el && el !== doc.body) { if (el.matches && el.matches(HOT) && !el.contains(to)) el.classList.remove('hot'); el = el.parentElement; }
    }, { passive: true });
  } else {
    let cool = 0;
    doc.addEventListener('pointerdown', (e) => { track(e); coolAll(); heat(e.target, true); clearTimeout(cool); cool = setTimeout(coolAll, 1800); }, { passive: true });
  }
}

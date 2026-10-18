// Interacciones propias de cada sección: diagrama del BOS, carrusel de casos, vídeos de casos y FAQ.
import { system } from '@/content/home';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/* Diagrama del BOS: recorre los bloques solo mientras está en pantalla, hasta que el usuario elige uno */
export function diagram({ $, reduce, fine, hasIO }) {
  const INFO = system.diagram.info;
  const box = $('diagram'), nodes = [...box.querySelectorAll('.node')], dinfo = box.querySelector('.dinfo');
  let cyc = 0, ci = 0, touched = false;
  const show = (btn) => {
    nodes.forEach((n) => { const on = n === btn; n.classList.toggle('on', on); n.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    const d = INFO[btn.dataset.key]; $('dinfoK').textContent = d[0]; $('dinfoT').textContent = d[1];
    dinfo.classList.remove('flash'); void dinfo.offsetWidth; dinfo.classList.add('flash');
  };
  const start = () => {
    if (touched || reduce || cyc) return;
    show(nodes[ci++ % nodes.length]);
    cyc = setInterval(() => show(nodes[ci++ % nodes.length]), 2400);
  };
  const stop = () => { clearInterval(cyc); cyc = 0; };
  const pick = (btn) => { touched = true; stop(); show(btn); };
  nodes.forEach((n) => {
    n.setAttribute('aria-pressed', 'false');
    n.addEventListener('click', () => pick(n));
    n.addEventListener('focus', () => pick(n));
    if (fine) n.addEventListener('pointerenter', () => pick(n));
  });
  if (reduce || !hasIO) { box.classList.add('lit-d'); return; }
  new IntersectionObserver((es) => es.forEach((e) => {
    e.target.classList.toggle('lit-d', e.isIntersecting); if (e.isIntersecting) start(); else stop();
  }), { threshold: 0.35 }).observe(box);
}

/* Carrusel: flechas, teclado, arrastre con ratón y barra de progreso */
export function carousel({ $, reduce }) {
  const track = $('track'), cards = [...track.querySelectorAll('.cs')], prev = $('prev'), next = $('next'), meter = $('meter');
  let anim = 0;
  const stepW = () => (cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth);
  const maxX = () => track.scrollWidth - track.clientWidth;
  const sync = () => {
    const x = track.scrollLeft, m = maxX();
    meter.style.transform = `scaleX(${(m > 0 ? clamp((x + track.clientWidth) / track.scrollWidth) : 1).toFixed(4)})`;
    prev.disabled = x <= 2; next.disabled = x >= m - 2;
  };
  const glide = (to) => {
    cancelAnimationFrame(anim); const from = track.scrollLeft, d = to - from; let t0 = 0;
    const dur = reduce ? 0 : Math.min(700, 280 + Math.abs(d) * 0.5);
    if (!dur || Math.abs(d) < 1) { track.scrollLeft = to; sync(); return; }
    track.classList.add('is-drag');
    anim = requestAnimationFrame(function tick(t) {
      if (!t0) t0 = t; const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      track.scrollLeft = from + d * e;
      if (p < 1) anim = requestAnimationFrame(tick); else { track.classList.remove('is-drag'); sync(); }
    });
  };
  const go = (dir) => { const s = stepW(), i = Math.round(track.scrollLeft / s) + dir; glide(Math.max(0, Math.min(maxX(), i * s))); };
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });
  track.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
  let down = false, startX = 0, startS = 0, moved = false;
  track.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; startX = e.clientX; startS = track.scrollLeft; cancelAnimationFrame(anim); });
  window.addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - startX; if (Math.abs(dx) > 3) { moved = true; track.classList.add('is-drag'); } track.scrollLeft = startS - dx; });
  window.addEventListener('pointerup', () => {
    if (!down) return; down = false;
    if (moved) { const s = stepW(); glide(Math.max(0, Math.min(maxX(), Math.round(track.scrollLeft / s) * s))); } else track.classList.remove('is-drag');
  });
  track.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  sync();
}

/* Vídeos de casos: se reproducen en silencio solo mientras están en pantalla; botón para activar el sonido */
export function caseVideos({ doc, reduce, hasIO }) {
  const vids = [...doc.querySelectorAll('.cs-vid')];
  vids.forEach((v) => { v.muted = true; });
  const muteOthers = (v) => vids.forEach((o) => {
    if (o === v) return; o.muted = true; const b = o.parentNode.querySelector('.snd'); if (b) b.setAttribute('aria-pressed', 'false');
  });
  const safePlay = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  if (hasIO) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !reduce) safePlay(e.target); else if (!e.isIntersecting) e.target.pause();
    }), { threshold: 0.5 });
    vids.forEach((v) => io.observe(v));
  }
  vids.forEach((v) => {
    const b = v.parentNode.querySelector('.snd'); if (!b) return;
    b.addEventListener('click', () => {
      const on = v.muted; v.muted = !on; b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.setAttribute('aria-label', (on ? 'Silenciar' : 'Activar sonido del') + ' testimonio');
      if (on) { muteOthers(v); v.currentTime = 0; safePlay(v); }
    });
  });
}

/* FAQ: pestañas con indicador animado y acordeón */
export function faq({ doc, $ }) {
  const tabs = [...doc.querySelectorAll('.tab')], ink = $('ink');
  const current = () => doc.querySelector('.tab[aria-selected="true"]');
  const placeInk = (t) => { ink.style.width = t.offsetWidth + 'px'; ink.style.transform = `translateX(${t.offsetLeft}px)`; };
  const select = (t, focus) => {
    tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', on ? 'true' : 'false'); x.tabIndex = on ? 0 : -1; $(x.getAttribute('aria-controls')).hidden = !on; });
    placeInk(t); if (focus) t.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (n) { e.preventDefault(); select(tabs[(i + n + tabs.length) % tabs.length], true); }
    });
  });
  placeInk(tabs[0]);
  window.addEventListener('resize', () => placeInk(current()));
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(() => placeInk(current()));
  doc.querySelectorAll('.q').forEach((q) => q.addEventListener('click', () => {
    const o = q.getAttribute('aria-expanded') !== 'true';
    q.setAttribute('aria-expanded', o ? 'true' : 'false'); q.parentNode.classList.toggle('open', o);
  }));
}

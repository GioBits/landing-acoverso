// Navegación: enlace activo del menú, menú móvil y botón fijo inferior en móvil.
import { nav } from '@/content/home';

export function activeNav({ doc, $, hasIO }) {
  if (!hasIO) return;
  const links = [...doc.querySelectorAll('.nav a')];
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => a.classList.toggle('act', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  nav.forEach((n) => { const el = $(n.href.slice(1)); if (el) io.observe(el); });
}

export function mobileMenu({ doc, $ }) {
  const menu = $('menu'), burger = $('burger');
  const open = (o) => {
    menu.hidden = !o; burger.setAttribute('aria-expanded', o ? 'true' : 'false');
    doc.body.style.overflow = o ? 'hidden' : '';
    if (o) $('menuClose').focus(); else burger.focus();
  };
  burger.addEventListener('click', () => open(true));
  $('menuClose').addEventListener('click', () => open(false));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    menu.hidden = true; burger.setAttribute('aria-expanded', 'false'); doc.body.style.overflow = '';
  }));
  doc.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) open(false); });
}

export function mobileDock({ $, hasIO }) {
  if (!hasIO) return;
  const dock = $('dock'), vis = { hero: true, agenda: false, cierre: false };
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { vis[e.target.id] = e.isIntersecting; });
    dock.classList.toggle('show', !vis.hero && !vis.agenda && !vis.cierre);
  }, { threshold: 0 });
  ['hero', 'agenda', 'cierre'].forEach((id) => io.observe($(id)));
}

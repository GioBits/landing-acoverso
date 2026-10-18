// Punto de entrada de todas las interacciones de la landing.
// Cada módulo es independiente; aquí solo se decide el orden en que se activan.
import { grain, litSections, counters, hoverGlow } from './visual';
import { scrollEffects } from './scroll-effects';
import { activeNav, mobileMenu, mobileDock } from './navigation';
import { diagram, carousel, caseVideos, faq } from './sections';
import { agendaPlacement, agendaFlow } from './agenda';
import { cookies, loomVideos } from './cookies';

export function initLanding({ config, legalDocs }) {
  const doc = document;
  const ctx = {
    doc,
    $: (id) => doc.getElementById(id),
    config,
    legalDocs,
    reduce: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    fine: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    hasIO: 'IntersectionObserver' in window,
    measure: () => {},
    ready: false,
  };
  doc.documentElement.classList.add('js');

  agendaPlacement(ctx); // primero: cambia la posición de la agenda antes de medir
  grain(ctx);
  litSections(ctx);
  diagram(ctx);
  counters(ctx);
  scrollEffects(ctx); // define ctx.measure
  hoverGlow(ctx);
  caseVideos(ctx);
  activeNav(ctx);
  mobileMenu(ctx);
  mobileDock(ctx);
  carousel(ctx);
  faq(ctx);
  cookies(ctx); // define ctx.cookies (lo usa loomVideos)
  loomVideos(ctx);
  agendaFlow(ctx);

  ctx.ready = true;
}

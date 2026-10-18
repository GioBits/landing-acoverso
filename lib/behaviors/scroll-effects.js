// Efectos ligados al scroll y al cursor, en un solo bucle requestAnimationFrame:
// barra de lectura de la agenda, header sólido, línea del proceso y foco que sigue al cursor.

const mod = (a, n) => ((a % n) + n) % n;
const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function scrollEffects(ctx) {
  const { doc, $, reduce, fine } = ctx;
  const rail = $('rail'), fill = rail.querySelector('.rail-fill'), head = rail.querySelector('.rail-head');
  const nodes = [...doc.querySelectorAll('[data-node]')], result = $('result');
  const readbar = $('readbar'), hdr = $('hdr'), spot = $('spot'), spotGrid = spot.querySelector('i'), pg = doc.querySelector('.pg');
  let vh = 0, railTop = 0, railLen = 1, nodeY = [], railP = 0, raf = 0, spotOn = false, mx = 0, my = 0, sx = 0, sy = 0;

  function measure() {
    const y = window.pageYOffset; vh = window.innerHeight;
    const r = rail.getBoundingClientRect(); railTop = r.top + y; railLen = Math.max(1, r.height);
    nodeY = nodes.map((n) => { const b = n.querySelector('.ph-n').getBoundingClientRect(); return b.top + b.height / 2 + y - railTop; });
    kick();
  }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }
  function frame() {
    raf = 0; const y = window.pageYOffset; let again = false; const max = Math.max(1, doc.documentElement.scrollHeight - vh);
    readbar.style.transform = `scaleX(${clamp(y / max).toFixed(4)})`;
    hdr.classList.toggle('solid', y > 8);
    const goal = reduce ? 1 : clamp((y + vh * 0.62 - railTop) / railLen);
    railP = Math.abs(goal - railP) < 0.0008 ? goal : railP + (goal - railP) * 0.2; if (railP !== goal) again = true;
    const at = railP * railLen;
    fill.style.transform = `scaleY(${railP.toFixed(4)})`; head.style.transform = `translate3d(0,${at.toFixed(1)}px,0)`;
    rail.classList.toggle('is-run', railP > 0.002 && railP < 0.998);
    for (let i = 0; i < nodes.length; i++) nodes[i].classList.toggle('is-lit', nodeY[i] <= at + 2);
    result.classList.toggle('is-lit', railP >= 0.995);
    if (spotOn) {
      sx += (mx - sx) * 0.18; sy += (my - sy) * 0.18;
      spot.style.transform = `translate3d(${(sx - 280).toFixed(1)}px,${(sy - 280).toFixed(1)}px,0)`;
      const pr = pg.getBoundingClientRect(); const gx = mod(pr.left - (sx - 280), 40) - 40, gy = mod(pr.top - (sy - 280), 40) - 40;
      spotGrid.style.transform = `translate3d(${gx.toFixed(1)}px,${gy.toFixed(1)}px,0)`;
      if (Math.abs(mx - sx) > 0.3 || Math.abs(my - sy) > 0.3) again = true;
    }
    if (again) kick();
  }

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(measure);
  if (fine && !reduce) {
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY; if (!spotOn) { spotOn = true; sx = mx; sy = my; spot.classList.add('on'); } kick();
    }, { passive: true });
    doc.documentElement.addEventListener('mouseleave', () => { spotOn = false; spot.classList.remove('on'); });
  }
  ctx.measure = measure;
  measure();
}

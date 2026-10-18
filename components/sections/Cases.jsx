import { cases, casesSection } from '@/content/cases';
import { cta } from '@/content/home';
import { Section, Counter } from '@/components/ui/primitives';
import { ArrowLeft, ArrowRight, SoundOff, SoundOn } from '@/components/ui/icons';

// Carrusel de casos. Datos en content/cases.js
// Lógica: lib/behaviors/carousel.js (flechas, arrastre, teclado) y lib/behaviors/case-videos.js
function CaseCard({ c }) {
  return (
    <article className="card cs">
      <div className="cs-media">
        <video className="cs-vid" muted loop playsInline preload="metadata" poster={c.poster} aria-label={`Testimonio de ${c.name}`}>
          <source src={c.video} type="video/mp4" />
        </video>
        <button className="snd" type="button" aria-pressed="false" aria-label={`Activar sonido del testimonio de ${c.name}`}>
          <SoundOff /><SoundOn />
        </button>
      </div>
      <div className="cs-body">
        <span className="chip">{c.niche}</span>
        <h3><Counter as="span" value={c.amount.value} prefix={c.amount.prefix} suffix={c.amount.suffix} />{c.title}</h3>
        <p className="cs-who">{c.name} · {c.handle}</p>
        <p>{c.text}</p>
      </div>
    </article>
  );
}

export default function Cases() {
  const h = casesSection.headline;
  return (
    <Section id="casos" labelledBy="h-cas" kicker={casesSection.kicker}>
      <h2 className="ant h2" id="h-cas">
        <Counter as="span" className="hl" value={h.value} prefix={h.prefix} suffix={h.suffix} />{h.text}
      </h2>
      <div className="cases">
        <div className="track" id="track" tabIndex={0} aria-label="Casos de clientes, usa las flechas del teclado para avanzar">
          {cases.map((c) => <CaseCard c={c} key={c.name} />)}
        </div>
        <div className="cases-ctl">
          <span className="meter" aria-hidden="true"><i id="meter"></i></span>
          <button className="arrow" id="prev" type="button" aria-label="Caso anterior"><ArrowLeft /></button>
          <button className="arrow" id="next" type="button" aria-label="Caso siguiente"><ArrowRight /></button>
        </div>
      </div>
      <p className="note">{casesSection.note}</p>
      <div className="after"><a className="btn" href={cta.href}>{cta.label}</a></div>
    </Section>
  );
}

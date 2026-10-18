import { system, cta } from '@/content/home';
import { Section, RichText } from '@/components/ui/primitives';
import { CheckIcon } from '@/components/ui/icons';

// Diagrama interactivo del BOS. Los textos de cada bloque están en content/home.js → system.diagram.info
// Lógica (ciclo automático y selección): lib/behaviors/diagram.js
export default function System() {
  const d = system.diagram;
  return (
    <Section id="sistema" labelledBy="h-sol" kicker={system.kicker}>
      <h2 className="ant h2" id="h-sol"><RichText value={system.title} /></h2>
      <p className="lead">{system.lead}</p>

      <div className="win" id="diagram">
        <div className="win-top">
          <span className="lights" aria-hidden="true"><span></span><span></span><span></span></span>
          <span className="mono muted" style={{ fontSize: 11.5 }}>{d.windowTitle}</span>
        </div>
        <div className="dgm" aria-label="Departamentos conectados por el BOS">
          {d.departments.map((dep, i) => (
            <button type="button" className="dn node" data-key={dep.key} key={dep.key}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="sub">{dep.label}</span>
              {i < d.departments.length - 1 && <span className="wire" aria-hidden="true"></span>}
            </button>
          ))}
        </div>
        <div className="csm-row">
          <span className="stem" aria-hidden="true"></span>
          <button type="button" className="csm node" data-key={d.autocsm.key}>
            <span className="sub">{d.autocsm.label}</span><span className="mono">{d.autocsm.detail}</span>
          </button>
        </div>
        <button type="button" className="band node" data-key={d.band.key}>
          <span className="pulse" aria-hidden="true"></span><span className="sub">{d.band.label}</span><span className="mono">{d.band.detail}</span>
        </button>
        <div className="dinfo" aria-live="polite">
          <span className="dinfo-k mono" id="dinfoK">{d.idle.title}</span>
          <p id="dinfoT">{d.idle.text}</p>
        </div>
      </div>

      <ul className="feat">
        {system.features.map((f) => (
          <li data-lit="" key={f.text}>
            <span className="ic" aria-hidden="true"><CheckIcon /></span>
            <span>{f.strong && <><strong>{f.strong}</strong> </>}{f.text}</span>
          </li>
        ))}
      </ul>
      <div className="after"><a className="btn" href={cta.href}>{system.ctaLabel}</a></div>
    </Section>
  );
}

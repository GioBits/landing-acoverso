import { process } from '@/content/home';
import { Section } from '@/components/ui/primitives';

// La línea vertical se rellena con el scroll y enciende cada fase (lib/behaviors/scroll-effects.js)
export default function Process() {
  return (
    <Section id="proceso" labelledBy="h-pro" kicker={process.kicker}>
      <h2 className="ant h2" id="h-pro">{process.title}</h2>
      <div className="rail-wrap">
        <div className="rail" id="rail" aria-hidden="true">
          <span className="rail-track"></span><span className="rail-fill"></span><span className="rail-head"></span>
        </div>
        <ol className="phases">
          {process.phases.map((p, i) => (
            <li className="phase" data-node="" key={p.title}>
              <span className="ph-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <div className="chips">{p.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
            </li>
          ))}
          <li className="phase">
            <div className="result" id="result">
              <p className="mono">{process.result.label}</p>
              <p className="sub">{process.result.text}</p>
            </div>
          </li>
        </ol>
      </div>
    </Section>
  );
}

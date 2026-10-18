import { agenda, cta } from '@/content/home';
import { site } from '@/config/site';
import { SectionEdge } from '@/components/ui/primitives';

// Agenda: una pregunta → calendario de Cal.com. Lógica en lib/behaviors/agenda.js
// En móvil va justo después del hero; en PC (≥1024 px) se mueve al final como sección propia
// (lib/behaviors/agenda-placement.js).
const DAYS = [['L', false], ['M', true], ['X', true], ['J', true], ['V', true], ['S', false], ['D', false]];

export default function Agenda() {
  return (
    <aside className="agenda" id="agenda" aria-labelledby="h-agenda">
      <SectionEdge />
      <div className="card">
        <span className="readbar" id="readbar" aria-hidden="true"></span>

        <div className="ag-left">
          <p className="step" id="stepNum">Paso 1 de 2</p>
          <h2 className="ant" id="h-agenda">{agenda.title}</h2>
          <p className="intro">{agenda.intro}</p>
          <p className="fine">{cta.fine}</p>
        </div>

        <div className="ag-right">
          <div className="qs">
            <fieldset className="qs" id="fq1">
              <legend>{agenda.question}</legend>
              <div className="yn">
                <button type="button" id="q1-si" data-v="si" aria-pressed="false">Sí</button>
                <button type="button" id="q1-no" data-v="no" aria-pressed="false">No</button>
              </div>
            </fieldset>
          </div>

          <div className="box" id="boxNo" hidden>
            <p>{agenda.noMessage}</p>
            <a href={site.instagram.url} target="_blank" rel="noopener">{agenda.noLinkLabel}</a>
          </div>

          <div className="box cal" id="boxCal" hidden>
            {/* Con calLink, el calendario se abre en un modal de Cal.com; este botón lo vuelve a abrir */}
            <div id="calLaunch" hidden>
              <p>{agenda.calMessage}</p>
              <button className="btn btn--sm" type="button" id="calOpen">{agenda.calOpenLabel}</button>
            </div>
            {/* Vista de ejemplo: solo se ve si no hay calLink configurado */}
            <div id="calDemo">
              <div className="cal-top"><span className="sub" style={{ fontSize: 15 }}>[Mes]</span><span className="mono">Cal.com · vista de ejemplo</span></div>
              <div className="cal-days" id="calDays">
                {DAYS.map(([d, open]) => (
                  <button key={d} type="button" disabled={!open} aria-pressed={open ? (d === 'X' ? 'true' : 'false') : undefined}>{d}</button>
                ))}
              </div>
              <div className="cal-times"><button type="button">[hora]</button><button type="button">[hora]</button><button type="button">[hora]</button></div>
              <p className="mono" style={{ margin: '12px 0 0' }}>Vista de ejemplo. Se sustituye por tu calendario de Cal.com al configurar el enlace.</p>
            </div>
          </div>

          <button className="reset" type="button" id="reset" hidden>{agenda.resetLabel}</button>
        </div>
      </div>
    </aside>
  );
}

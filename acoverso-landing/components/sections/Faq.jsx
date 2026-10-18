import { faq } from '@/content/home';
import { Section } from '@/components/ui/primitives';
import { PlusIcon } from '@/components/ui/icons';

// Pestañas + acordeón. Preguntas en content/home.js → faq. Lógica: lib/behaviors/faq.js
export default function Faq() {
  return (
    <Section id="faq" labelledBy="h-faq" kicker={faq.kicker}>
      <h2 className="ant h2" id="h-faq">{faq.title}</h2>
      <div className="tabs" role="tablist" aria-label="Categorías de preguntas" id="tabs">
        {faq.groups.map((g, i) => (
          <button className="tab" role="tab" type="button" key={g.id} id={`t-${g.id}`} aria-controls={`p-${g.id}`}
            aria-selected={i === 0 ? 'true' : 'false'} tabIndex={i === 0 ? undefined : -1}>
            {g.label}
          </button>
        ))}
        <span className="tab-ink" id="ink" aria-hidden="true"></span>
      </div>
      <div className="faq">
        {faq.groups.map((g, i) => (
          <div role="tabpanel" key={g.id} id={`p-${g.id}`} aria-labelledby={`t-${g.id}`} hidden={i !== 0}>
            {g.items.map((it) => (
              <div className="qa" key={it.q}>
                <button className="q" type="button" aria-expanded="false">{it.q}<PlusIcon /></button>
                <div className="a"><div><p>{it.a}</p></div></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}

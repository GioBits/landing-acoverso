import { models, cta } from '@/content/home';
import { Section } from '@/components/ui/primitives';

export default function Models() {
  return (
    <Section id="modelos" labelledBy="h-mod" kicker={models.kicker}>
      <h2 className="ant h2" id="h-mod">{models.title}</h2>
      <div className="models">
        {models.items.map((m) => (
          <article className="model" key={m.tag}>
            <p className="tag">{m.tag}</p>
            <h3>{m.title}</h3>
            <p>{m.text}</p>
            <div className="who">
              <div><h4>Nosotros</h4><ul>{m.us.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div><h4>Tú</h4><ul>{m.you.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
          </article>
        ))}
      </div>
      <div className="unsure"><p>{models.unsure}</p><a className="btn" href={cta.href}>{cta.label}</a></div>
    </Section>
  );
}

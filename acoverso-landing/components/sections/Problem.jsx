import { problem } from '@/content/home';
import { Section } from '@/components/ui/primitives';

export default function Problem() {
  return (
    <Section labelledBy="h-obs" kicker={problem.kicker}>
      <h2 className="ant h2" id="h-obs">{problem.title}</h2>
      <div className="cards3">
        {problem.cards.map((c, i) => (
          <article className="card pain" key={c.title}>
            <p className="n">{String(i + 1).padStart(2, '0')}</p>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

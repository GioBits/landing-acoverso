import { closing, cta } from '@/content/home';
import { Section, RichText } from '@/components/ui/primitives';

export default function Closing() {
  return (
    <Section id="cierre" labelledBy="h-cta" className="close">
      <img className="watermark" src="/img/logo.png" alt="" aria-hidden="true" />
      <h2 className="ant h2" id="h-cta"><RichText value={closing.title} /></h2>
      <p className="lead">{closing.lead}</p>
      <a className="btn btn--lg" href={cta.href}>{cta.label}</a>
      <p className="fine">{cta.fine}</p>
    </Section>
  );
}

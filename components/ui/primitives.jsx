import { formatNumber } from '@/lib/format';

// Texto con resaltado: ['Texto normal ', { hl: 'texto en azul' }]
export function RichText({ value }) {
  if (typeof value === 'string') return value;
  return value.map((part, i) =>
    typeof part === 'string' ? part : <span key={i} className="hl">{part.hl}</span>,
  );
}

// Cifra animada: sube de 0 a `value` cada vez que entra en pantalla (lib/behaviors/counters.js)
export function Counter({ value, prefix = '', suffix = '', as: Tag = 'b', className = '' }) {
  return (
    <Tag className={`num ${className}`.trim()} data-num={value} data-pre={prefix || undefined} data-suf={suffix || undefined}>
      {prefix}{formatNumber(value)}{suffix}
    </Tag>
  );
}

// Filo luminoso superior de cada sección; sigue al cursor (lib/behaviors/hover-glow.js)
export function SectionEdge() {
  return (
    <span className="edge" aria-hidden="true">
      <i></i>
      <span className="dd"><span></span><span></span></span>
      <b className="glint"></b>
    </span>
  );
}

// Sección estándar de la landing: se enciende al entrar en pantalla (data-lit)
export function Section({ id, labelledBy, kicker, className = '', children }) {
  return (
    <section className={`mod ${className}`.trim()} id={id} data-lit="" aria-labelledby={labelledBy}>
      <SectionEdge />
      {kicker && <p className="kick">{kicker}</p>}
      {children}
    </section>
  );
}

export function CtaButton({ cta, className = 'btn', children }) {
  return <a className={className} href={cta.href}>{children || cta.label}</a>;
}

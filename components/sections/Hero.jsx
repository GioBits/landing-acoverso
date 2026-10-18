import { hero, cta } from '@/content/home';
import { RichText, Counter } from '@/components/ui/primitives';
import { PlayIcon } from '@/components/ui/icons';
import { integrations } from '@/config/site';

export default function Hero() {
  // El vídeo solo aparece cuando hay URL de Loom (config/site.js → integrations.loom.hero)
  const hasVideo = Boolean(integrations.loom.hero);
  return (
    <section className={hasVideo ? 'hero' : 'hero hero--solo'} id="hero" aria-labelledby="h-hero">
      <p className="chip-bos"><span className="dots" aria-hidden="true"><span></span><span></span></span>{hero.tag}</p>
      <h1 className="ant h1" id="h-hero"><RichText value={hero.title} /></h1>
      <p className="lead">{hero.lead}</p>
      {hasVideo && (
        <div className="video" style={{ marginTop: 32 }}>
          {/* El vídeo de Loom se carga al pulsar */}
          <button className="play" type="button" data-loom="hero" aria-label="Reproducir video"><PlayIcon /></button>
          <span className="cap">{hero.videoCaption}</span>
        </div>
      )}
      <div className="ctas">
        <a className="btn" href={cta.href}>{cta.label}</a>
        <a className="btn btn--ghost" href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
      </div>
      <div className="stats">
        {hero.stats.map((s) => (
          <div className="stat" key={s.label}>
            <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

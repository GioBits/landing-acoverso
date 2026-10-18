import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/config/site';

// Imagen que se ve al compartir el enlace (WhatsApp, Instagram, LinkedIn…). Se genera en el build.
// Las tipografías van en TTF (assets/fonts) porque next/og no lee woff2.
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const file = (p) => readFile(join(process.cwd(), p));
  const [anton, mono, logo] = await Promise.all([
    file('assets/fonts/anton-400.ttf'),
    file('assets/fonts/ibm-plex-mono-500.ttf'),
    file('public/img/logo.png'),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', backgroundColor: '#000', backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(0,128,248,.35), rgba(0,88,184,.08) 45%, transparent 70%)', color: '#F3F6FC' }}>
        <img src={logoSrc} width={144} height={70} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Anton', fontSize: 92, lineHeight: 1.02, textTransform: 'uppercase' }}>
          <span>Toda tu marca conectada en</span>
          <span style={{ color: '#0080F8' }}>un solo sistema</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Plex', fontSize: 24, color: 'rgba(243,246,252,.70)' }}>
          <span>Para marcas personales que ya venden</span>
          <span style={{ color: '#33C3FF' }}>acoverso.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Anton', data: anton, weight: 400, style: 'normal' },
        { name: 'Plex', data: mono, weight: 500, style: 'normal' },
      ],
    },
  );
}

import '@/styles/00-fonts.css';
import '@/styles/01-tokens.css';
import '@/styles/02-base.css';
import { site } from '@/config/site';

// Los íconos (app/favicon.ico, icon.png, apple-icon.png) y la imagen para compartir
// (app/opengraph-image.jsx) los detecta Next solo por el nombre del archivo.
export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: { title: site.title, description: site.description, url: site.url, siteName: site.name, locale: site.locale, type: 'website' },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

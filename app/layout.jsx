import '@/styles/00-fonts.css';
import '@/styles/01-tokens.css';
import '@/styles/02-base.css';
import { site } from '@/config/site';

export const metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
  alternates: { canonical: '/' },
  icons: { icon: '/img/logo.png' },
  openGraph: { title: site.name, description: site.description, url: site.url, siteName: site.name, locale: 'es_ES', type: 'website' },
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

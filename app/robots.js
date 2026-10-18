import { site } from '@/config/site';

// /robots.txt: todo indexable salvo las rutas de la API
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

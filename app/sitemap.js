import { site } from '@/config/site';
import { legalDocs, legalSettings } from '@/content/legal';

// /sitemap.xml. Las políticas entran cuando dejan de ser borrador (content/legal/index.js → showDraftNotice).
export default function sitemap() {
  const legal = legalSettings.showDraftNotice
    ? []
    : Object.keys(legalDocs).map((slug) => ({ url: `${site.url}/${slug}`, changeFrequency: 'yearly', priority: 0.3 }));
  return [{ url: site.url, changeFrequency: 'monthly', priority: 1 }, ...legal];
}

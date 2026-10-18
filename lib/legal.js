import { createHash } from 'node:crypto';
import { legalDocs } from '@/content/legal';

// Huella SHA-256 de un documento legal: título + versión + texto sin etiquetas HTML.
// Identifica exactamente qué versión del texto vio cada persona. Solo se ejecuta en el servidor.
export function documentHash(doc) {
  const text = doc.body.trim().replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return createHash('sha256').update(`${doc.title}\n${doc.version}\n${text}`, 'utf8').digest('hex');
}

// { terminos: { version, sha256 }, privacidad: {...}, cookies: {...} }
export function legalFingerprints() {
  return Object.fromEntries(
    Object.entries(legalDocs).map(([key, doc]) => [key, { version: doc.version, sha256: documentHash(doc) }]),
  );
}

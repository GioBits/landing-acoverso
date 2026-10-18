import { terminos } from './terminos';
import { privacidad } from './privacidad';
import { cookies } from './cookies';

// Ajustes comunes de las páginas legales
export const legalSettings = {
  effectiveDate: '<mark class="pend">[FECHA DE PUBLICACIÓN]</mark>',
  // Pon false cuando el abogado haya revisado los textos y estén completos
  showDraftNotice: true,
};

export const legalDocs = { terminos, privacidad, cookies };

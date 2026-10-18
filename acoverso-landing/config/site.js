// Configuración técnica de la web. Lo que cambia aquí afecta a toda la página.

export const site = {
  name: 'ÄCOVERSO',
  company: 'ACOVERSO LLC',
  url: 'https://acoverso.com',
  description:
    'ÄCOVERSO enseña a marcas personales a monetizar y escalar sin perder la calidad de su entrega de servicio, con el BOS y el autoCSM.',
  instagram: { handle: '@alexacostamk', url: 'https://instagram.com/alexacostamk' },
};

export const integrations = {
  // Evento de Cal.com que se muestra al responder "Sí" (cal.com/<calLink>)
  calLink: 'acoverso/educador-digital',
  // URL de inserción de Loom del vídeo principal: https://www.loom.com/embed/...
  loom: { hero: '' },
  // Opcionales. Si se rellenan, aparece el aviso de cookies automáticamente.
  metaPixelId: '',
  gaId: '',
  // Ruta del registro de aceptaciones (app/api/consent). Vacío = no se registra.
  consentEndpoint: '/api/consent',
};

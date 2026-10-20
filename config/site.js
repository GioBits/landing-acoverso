// Configuración técnica de la web. Lo que cambia aquí afecta a toda la página.

export const site = {
  name: 'ÄCOVERSO',
  // Cómo lo escribe la gente al buscar (sin diéresis)
  alternateName: 'Acoverso',
  company: 'ACOVERSO LLC',
  url: 'https://acoverso.com',
  // Título de la home en Google y al compartir el enlace
  title: 'ÄCOVERSO (Acoverso) · Sistema para escalar marcas personales sin perder calidad',
  description:
    'ÄCOVERSO ayuda a marcas personales que venden mentorías, cursos o servicios a monetizar y escalar sin perder la calidad de su entrega, con el BOS y el autoCSM.',
  locale: 'es_ES',
  instagram: { handle: '@alexacostamk', url: 'https://instagram.com/alexacostamk' },
};

export const integrations = {
  // Evento de Cal.com que se muestra al responder "Sí" (cal.com/<calLink>)
  calLink: 'acoverso/educador-digital',
  // Vídeo principal del hero (enlace de YouTube o de Loom). Vacío = no se muestra.
  // poster: portada servida desde /public, para no conectar con YouTube hasta pulsar reproducir.
  videos: {
    hero: { url: 'https://youtu.be/CA-JVdtOTeo', poster: '/video/vsl.webp' },
  },
  // Opcionales. Si se rellenan, aparece el aviso de cookies automáticamente.
  metaPixelId: '',
  gaId: '',
  // Ruta del registro de aceptaciones (app/api/consent). Vacío = no se registra.
  consentEndpoint: '/api/consent',
};

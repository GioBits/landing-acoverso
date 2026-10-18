// Textos de la landing. Edita aquí el contenido sin tocar el diseño.
// Las partes entre { hl: '...' } se pintan en azul de marca.

export const nav = [
  { label: 'Sistema', href: '#sistema' },
  { label: 'Modelos', href: '#modelos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Casos', href: '#casos' },
  { label: 'FAQ', href: '#faq' },
];

export const cta = {
  label: 'Agenda tu diagnóstico',
  href: '#agenda',
  fine: 'Sin compromiso · 30 minutos · Gratuita',
};

export const hero = {
  tag: 'BOS',
  title: ['Toda tu marca conectada en ', { hl: 'un solo sistema' }],
  lead: 'Si ya vendes y tu modelo de entrega de servicio no te permite escalar, hay una razón concreta. Te la explico en 2 minutos.',
  videoCaption: '[VIDEO LOOM · 2 MIN]',
  secondaryCta: { label: 'Ver cómo funciona', href: '#sistema' },
  // Cifras bajo el hero: suben de 0 al valor al entrar en pantalla
  stats: [
    { value: 100, prefix: '+', suffix: 'K', label: 'facturados para clientes' },
    { value: 60, prefix: '+', label: 'marcas' },
    { value: 4, label: 'áreas, 1 sistema' },
  ],
};

export const agenda = {
  title: 'Agenda tu diagnóstico',
  intro: 'Responde una pregunta y elige tu horario.',
  question: 'Tienes un producto o mentoría que ya estás vendiendo',
  noMessage:
    'Este diagnóstico es para marcas que ya venden un producto validado. Mientras tanto, en Instagram compartimos cada semana cómo construir ese primer sistema.',
  noLinkLabel: 'Seguir a @alexacostamk',
  resetLabel: 'Cambiar respuesta',
};

export const problem = {
  kicker: 'El cuello de botella',
  title: 'Por qué tu negocio se rompe cuando más vende',
  cards: [
    { title: 'Todo pasa por ti', text: 'La venta, la entrega y el soporte dependen de tu tiempo; cada cliente nuevo resta calidad a los que ya tienes.' },
    { title: 'Entrega que no escala', text: 'Vendes un programa premium y la experiencia del cliente no está a la altura; llegan los reclamos y no llegan las renovaciones.' },
    { title: 'Datos sueltos, decisiones a ciegas', text: 'Marketing, ventas y servicio no comparten información, así que no sabes qué funciona ni dónde se pierde dinero.' },
  ],
};

export const system = {
  kicker: 'La solución',
  title: ['Monetiza y escala ', { hl: 'sin perder la calidad' }, ' de tu entrega'],
  lead: 'El BOS une marketing, ventas, entrega de servicio y operaciones en un solo ecosistema. Su autoCSM sigue la actividad de cada cliente, detecta bloqueos antes de que se conviertan en reclamos y te muestra dónde hay oportunidades de renovación.',
  diagram: {
    windowTitle: 'bos · ecosistema',
    departments: [
      { key: 'marketing', label: 'Marketing' },
      { key: 'ventas', label: 'Ventas' },
      { key: 'servicio', label: 'Servicio' },
      { key: 'operaciones', label: 'Operaciones' },
    ],
    autocsm: { key: 'autocsm', label: 'autoCSM', detail: 'seguimiento · alertas · upsell' },
    band: { key: 'data', label: 'Data + IA + Skills', detail: 'capa transversal · automatizaciones' },
    idle: { title: 'Toca un bloque', text: 'Pasa el cursor o toca cualquier bloque para ver qué hace dentro del sistema.' },
    // Texto que aparece al seleccionar cada bloque
    info: {
      marketing: ['Marketing', 'Atrae, educa y capta leads, y registra de dónde viene cada uno para saber qué contenido vende.'],
      ventas: ['Ventas', 'Convierte esas oportunidades en clientes con un proceso de setteo y cierre que tu equipo puede replicar.'],
      servicio: ['Servicio', 'Entrega la transformación prometida con un proceso estructurado, documentado y medible.'],
      operaciones: ['Operaciones', 'Convierte lo que se repite en SOPs, automatizaciones y reglas para crecer sin sumar horas.'],
      autocsm: ['autoCSM', 'Sigue la actividad de cada cliente, avisa cuando alguien se bloquea y detecta oportunidades de renovación y upsell.'],
      data: ['Data + IA + Skills', 'Conecta los cuatro departamentos y convierte lo que pasa en cada uno en decisiones y ejecución automática.'],
    },
  },
  features: [
    { strong: 'autoCSM:', text: 'seguimiento automático de cada cliente, alertas de bloqueo y oportunidades de upsell' },
    { text: 'Marketing con métricas y trazabilidad de cada lead' },
    { text: 'Setteo y ventas con un proceso replicable' },
    { text: 'Entrega de servicio estructurada y documentada' },
    { text: 'Skills de IA que convierten tus procesos en ejecución repetible' },
    { text: 'SOPs y automatizaciones para crecer sin sumar horas' },
  ],
  ctaLabel: 'Quiero mi diagnóstico',
};

export const models = {
  kicker: 'Cómo trabajamos',
  title: 'Elige cómo construimos tu sistema',
  items: [
    {
      tag: 'DWY',
      title: 'Lo construimos contigo',
      text: 'Conectamos a tu marca el BOS, el software que desarrollamos en ÄCOVERSO, y te acompañamos paso a paso mientras lo implementas. Aprendes a operarlo junto al autoCSM para que tú y tu equipo lo manejen desde dentro. Ideal si quieres dominar el sistema.',
      us: ['Formación', 'Plantillas', 'Acompañamiento'],
      you: ['Implementación', 'Operación'],
    },
    {
      tag: 'DFY',
      title: 'Lo construimos por ti',
      text: 'Conectamos a tu marca el BOS, el software que desarrollamos en ÄCOVERSO, y nuestro equipo lo configura y lo pone a funcionar dentro de tu operación, con el autoCSM y las automatizaciones activas sin que tengas que construir nada. Ideal si tu operación ya es compleja y prefieres delegar la implementación para enfocarte en crecer.',
      us: ['Diseño', 'Implementación', 'Ejecución'],
      you: ['Estrategia', 'Decisiones'],
    },
  ],
  unsure: 'No sabes cuál es el tuyo. Lo definimos en la llamada.',
};

export const process = {
  kicker: 'El proceso',
  title: 'Tu sistema en 3 fases',
  phases: [
    { title: 'Diagnóstico', text: 'Analizamos oferta, ecosistema y cuellos de botella, y trazamos el mapa del sistema.', chips: ['Auditoría', 'Mapa', 'Prioridades'] },
    { title: 'Implementación', text: 'Construimos el BOS por departamentos, con automatizaciones, Skills de IA y autoCSM.', chips: ['BOS', 'autoCSM', 'IA'] },
    { title: 'Escala', text: 'Medimos, optimizamos y convertimos cada aprendizaje en proceso.', chips: ['Métricas', 'Optimización', 'Escala'] },
  ],
  result: { label: 'Resultado', text: 'Un negocio que crece sin que la calidad de tu entrega dependa de ti' },
};

export const faq = {
  kicker: 'Preguntas frecuentes',
  title: 'Lo que nos preguntan antes de agendar',
  groups: [
    {
      id: 'sis',
      label: 'Sistema',
      items: [
        { q: 'Necesito saber de IA o automatización', a: 'No. En DWY te enseñamos a operar cada pieza del sistema; en DFY la implementamos nosotros por ti.' },
        { q: 'Qué es el autoCSM y qué hace por mis clientes', a: 'Es el módulo del BOS que sigue la actividad de cada cliente, detecta bloqueos y señala oportunidades de renovación o upsell, para que la calidad de tu entrega no dependa de que tú lo revises todo.' },
        { q: 'Ya tengo equipo, me sirve igual', a: 'Sí. El BOS le da a tu equipo procesos, datos y automatizaciones para operar sin que todo pase por ti.' },
      ],
    },
    {
      id: 'mod',
      label: 'Modelos',
      items: [
        { q: 'Cuál es la diferencia entre DWY y DFY', a: 'En DWY implementas tú con nuestro acompañamiento y aprendes a operar el sistema. En DFY lo diseñamos, implementamos y ejecutamos nosotros dentro de tu operación.' },
        { q: 'Cuánto tiempo toma implementar el sistema', a: '[TIEMPO DE IMPLEMENTACIÓN SEGÚN MODELO]' },
      ],
    },
    {
      id: 'lla',
      label: 'Llamada',
      items: [
        { q: 'Qué pasa en la llamada de diagnóstico', a: 'Revisamos tu oferta, tu operación y tus cuellos de botella, y te decimos qué modelo encaja contigo. Si no es para ti, te lo diremos.' },
      ],
    },
  ],
};

export const closing = {
  title: ['Tu marca lista para ', { hl: 'escalar' }],
  lead: 'Agenda una llamada de diagnóstico y descubre qué parte de tu negocio frena tu crecimiento.',
};

export const legalNotice =
  'Al agendar una llamada aceptas los {terminos} y la {privacidad} de ACOVERSO LLC. Usamos tus datos solo para gestionar tu diagnóstico y contactarte sobre él. Como prueba guardamos la fecha, la hora, tu dirección IP y la versión de cada documento. Puedes ejercer tus derechos como se indica en la Política de privacidad.';

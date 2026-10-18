// Casos de éxito del carrusel. Para añadir uno:
// 1. Sube el vídeo (.mp4, vertical 9:16) y su portada (.jpg) a /public/casos/
// 2. Copia un bloque de abajo y cambia los datos.
// La cifra (amount) sube de 0 a su valor cada vez que la tarjeta entra en pantalla.

export const casesSection = {
  kicker: 'Clientes reales',
  headline: { value: 100, prefix: '+', suffix: 'K', text: ' facturados para nuestros clientes' },
  note: 'Resultados reales de clientes de ÄCOVERSO. Dependen de la oferta, el mercado y la ejecución de cada negocio.',
};

export const cases = [
  {
    name: 'Alejandra Pardo',
    handle: '@soyalejandrapardo',
    niche: 'Finanzas personales',
    video: '/casos/alejandra-pardo.mp4',
    poster: '/casos/alejandra-pardo.jpg',
    amount: { value: 18000, prefix: '$' },
    title: ' en 2 meses con nuestro sistema',
    text: 'Nunca había vendido en internet. Cerró agosto con $9.142, $5.600 de ellos después de aplicar el sistema, y septiembre con $8.700.',
  },
  {
    name: 'Katherine Montoya',
    handle: '@katherinenailss',
    niche: 'Uñas y nail art',
    video: '/casos/katherine-montoya-v2.mp4',
    poster: '/casos/katherine-montoya-v2.jpg',
    amount: { value: 18000, prefix: '$' },
    title: ' en 2 meses con nuestro sistema',
    text: 'Con solo 2 vídeos vendió sus clases a 4 personas por $6.000 y cerró esa semana con $9.000. Su primer mes con el sistema facturó $9.000.',
  },
  {
    name: 'Judit Rodríguez',
    handle: '@suhaila.marketing.manicura',
    niche: 'Marketing para manicuristas',
    video: '/casos/judit-rodriguez-v2.mp4',
    poster: '/casos/judit-rodriguez-v2.jpg',
    amount: { value: 3000, prefix: '€' },
    title: ' en 2 meses',
    text: 'Creación de un producto digital high ticket con nuestro sistema. Lo vende a €1.100 por plaza.',
  },
  {
    name: 'Ivet Plaza',
    handle: '@ivstudionyc',
    niche: 'Formación para manicuristas',
    video: '/casos/ivet-plaza.mp4',
    poster: '/casos/ivet-plaza.jpg',
    amount: { value: 4000, prefix: '$' },
    title: ' con un solo vídeo',
    text: 'Creación de un producto digital high ticket con nuestro sistema.',
  },
];

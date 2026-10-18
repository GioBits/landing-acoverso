/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // La antigua política de reembolso ahora es el apartado 6 de los Términos
      { source: '/reembolsos', destination: '/terminos#t6', permanent: true },
      // Enlaces antiguos con extensión .html
      { source: '/:slug(terminos|privacidad|cookies).html', destination: '/:slug', permanent: true },
    ];
  },
  async headers() {
    const immutable = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }];
    return [
      { source: '/casos/:path*', headers: immutable },
      { source: '/fonts/:path*', headers: immutable },
      { source: '/:path*', headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      ] },
    ];
  },
};
export default nextConfig;

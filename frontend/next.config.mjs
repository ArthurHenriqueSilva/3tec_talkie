// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:4000/api/:path*', // Proxy para o backend NestJS
        },
      ];
    },
  };
  
  export default nextConfig;
  
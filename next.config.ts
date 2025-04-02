import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com'], // Добавляем нужный домен
    formats: ['image/webp'],
    minimumCacheTTL: 600,

  },

};

export default nextConfig;

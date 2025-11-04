import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimização de imagens - conversão automática para AVIF/WebP
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Compressão gzip/brotli automática
  compress: true,

  // Desabilitar source maps em produção para reduzir tamanho
  productionBrowserSourceMaps: false,

  // Otimizar imports de pacotes grandes
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Remover console.logs em produção
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;

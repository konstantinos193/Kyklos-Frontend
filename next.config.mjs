import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const canvasStubPath = path.join(__dirname, 'lib', 'stubs', 'canvas.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/logo.png',
      },
    ]
  },
  turbopack: {
    resolveAlias: {
      canvas: canvasStubPath,
    },
  },
  // experimental: {
  //   turbopackFileSystemCacheForDev: true, // Disabled due to Windows compatibility issues
  // },
  webpack: (config) => {
    config.resolve.alias = config.resolve.alias || {}
    config.resolve.alias.canvas = canvasStubPath
    // Copy PDF.js worker to public folder
    config.plugins = config.plugins || [];
    return config;
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    qualities: [60, 75, 85, 100],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    unoptimized: false,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.stockcake.com' },
      { protocol: 'https', hostname: 'img.freepik.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'www.postposmo.com' },
      { protocol: 'https', hostname: 'imgs.search.brave.com' },
      { protocol: 'https', hostname: 'thumbs.dreamstime.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },
}

export default nextConfig

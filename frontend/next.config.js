/** @type {import('next').NextConfig} */
const apiTarget = process.env.API_PROXY_TARGET || 'http://localhost:5000'

const nextConfig = {
  images: { domains: ['res.cloudinary.com', 'junejewelries.com', 'images.unsplash.com'] },
  async rewrites() {
    // In local dev, proxy /api/* to the Express backend so frontend and backend
    // can run on separate ports without CORS/API-base issues.
    // On Vercel, vercel.json routes /api/* to the serverless backend instead.
    if (process.env.VERCEL) return []
    return [{ source: '/api/:path*', destination: `${apiTarget}/api/:path*` }]
  },
}

module.exports = nextConfig

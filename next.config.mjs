/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents:true,
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ]
  },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  env: {
    CURRENT_ENV: process.env.CURRENT_ENV || '',
    BACKEND_API_DEV: process.env.BACKEND_API_DEV || '',
    BACKEND_API_PROD: process.env.BACKEND_API_PROD || '',
  },
};

export default nextConfig;

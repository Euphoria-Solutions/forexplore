/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true
    },
    CURRENT_ENV: process.env.CURRENT_ENV || '',
    BACKEND_API_DEV: process.env.BACKEND_API_DEV || '',
    BACKEND_API_PROD: process.env.BACKEND_API_PROD || '',
};

export default nextConfig;

const nextConfig = {
  env: {
    MONGODB_URL_PROD: process.env.MONGODB_URL_PROD || '',
    MONGODB_URL_DEV: process.env.MONGODB_URL_DEV || '',
    CURRENT_ENV: process.env.CURRENT_ENV || '',
  },
};

module.exports = nextConfig;

const nextConfig = {
  env: {
    MONGODB_URL: process.env.MONGODB_URL || '',
  },
};

module.exports = nextConfig;

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*', // work around CORS
      },
    ];
  },
  experimental: {
    externalDir: true,
  },
};

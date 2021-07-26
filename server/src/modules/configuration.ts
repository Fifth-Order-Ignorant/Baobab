export default () => ({
  production: process.env.NODE_ENV === 'production',
  jwtSecret: process.env.JWT_SECRET || '1eUKAdATDgkk6fGW1hvblDolPxCMgjhq',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/baobab',
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
  },
});

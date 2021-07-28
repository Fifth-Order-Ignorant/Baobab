export default () => ({
  production: process.env.NODE_ENV === 'production',
  jwtSecret: process.env.JWT_SECRET || '1eUKAdATDgkk6fGW1hvblDolPxCMgjhq',
  jwtExp: parseInt(process.env.JWT_EXP) || 604800, // 7d (secs)
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/baobab',
  redisUri: process.env.REDIS_URI || 'redis://localhost:6379/0',
});

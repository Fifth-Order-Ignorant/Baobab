import * as crypto from 'crypto';

export default () => ({
  production: process.env.NODE_ENV === 'production',
  // all sessions become invalid on server shutdown (so we don't have to persist stale sessions)
  jwtSecret: crypto.randomBytes(10).toString('hex'),
});

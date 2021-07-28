import { CACHE_MANAGER, INestApplication } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DEFAULT_DB_CONNECTION } from '@nestjs/mongoose/dist/mongoose.constants';
import { Cache } from 'cache-manager';

export async function clean(app: INestApplication) {
  const conn = app.get<Connection>(DEFAULT_DB_CONNECTION);
  if (conn) {
    const cols = await conn.db.collections();
    for (const col of cols) {
      await col.deleteMany({});
    }
  }
  const cache = app.get<Cache>(CACHE_MANAGER);
  await cache.reset();
}

import { Module } from '@nestjs/common';
import { UsersInMemory } from '../dao/users';

@Module({
  providers: [UsersInMemory],
  exports: [UsersInMemory],
})
export class DbModule {}

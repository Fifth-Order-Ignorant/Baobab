import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}

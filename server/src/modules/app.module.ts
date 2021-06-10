import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { RequestModule } from './request.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    AuthModule,
    RequestModule
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UserProfileModule } from './userprofile.module';
import { AuthModule } from './auth.module';
import { UserProfileEditModule } from './userprofileedit.module';
import { RequestModule } from './request.module';
import { MessageModule } from './message.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserProfileModule,
    AuthModule,
    UserProfileEditModule,
    RequestModule,
    MessageModule,
  ],
})
export class AppModule {}

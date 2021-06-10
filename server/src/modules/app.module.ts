import { Module } from '@nestjs/common';
import { UserProfileModule } from './userprofile.module';
import { AuthModule } from './auth.module';
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
  ],
})
export class AppModule {}

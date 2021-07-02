import { Module } from '@nestjs/common';
import { UserProfileModule } from './userprofile.module';
import { AuthModule } from './auth.module';
import { UserProfileEditModule } from './userprofileedit.module';
import { RequestModule } from './request.module';
import { PostModule } from './post.module';
import { TeamModule } from './team.module';
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
    PostModule,
    TeamModule,
  ],
})
export class AppModule {}

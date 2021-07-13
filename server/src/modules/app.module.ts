import { Module } from '@nestjs/common';
import { UserProfileModule } from './userprofile.module';
import { AuthModule } from './auth.module';
import { UserProfileEditModule } from './userprofileedit.module';
import { RequestModule } from './request.module';
import { AssignmentModule } from './assignment.module';
import { PostModule } from './post.module';
import { TeamModule } from './team.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { InMemoryDAOModule } from './memory.module';
import { MongoDBDAOModule } from './mongodb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongoDBDAOModule,
    // other modules below here
    UserProfileModule,
    AuthModule,
    UserProfileEditModule,
    RequestModule,
    PostModule,
    AssignmentModule,
    TeamModule,
  ],
})
export class AppModule {}

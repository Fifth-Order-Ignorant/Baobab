import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { UserSchema } from '../dao/mongodb/schemas/user.schema';
import { Profile } from '../entities/profile.entity';
import { ProfileSchema } from '../dao/mongodb/schemas/profile.schema';
import { Assignment } from '../entities/assignment.entity';
import { AssignmentSchema } from '../dao/mongodb/schemas/assignment.schema';
import { UserProfileMongoDAO } from '../dao/mongodb/userprofiles.mdb';
import { MulterConfigService, MulterMongoDAO } from '../dao/mongodb/files.mdb';
import { Post } from '../entities/post.entity';
import { PostSchema } from '../dao/mongodb/schemas/post.schema';
import { PostMongoDAO } from '../dao/mongodb/posts.mdb';
import { Request } from '../entities/request.entity';
import { RequestSchema } from '../dao/mongodb/schemas/request.schema';
import { RequestMongoDAO } from '../dao/mongodb/requests.mdb';
import { AssignmentMongoDAO } from '../dao/mongodb/assignments.mdb';
import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
        useFindAndModify: false,
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Post.name, schema: PostSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Assignment.name, schema: AssignmentSchema },
    ]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  providers: [
    { provide: 'MulterDAO', useClass: MulterMongoDAO },
    { provide: 'UserProfileDAO', useClass: UserProfileMongoDAO },
    { provide: 'PostDAO', useClass: PostMongoDAO },
    { provide: 'RequestDAO', useClass: RequestMongoDAO },
    { provide: 'AssignmentDAO', useClass: AssignmentMongoDAO },
  ],
  exports: [
    MulterModule,
    { provide: 'MulterDAO', useClass: MulterMongoDAO },
    { provide: 'UserProfileDAO', useClass: UserProfileMongoDAO },
    { provide: 'PostDAO', useClass: PostMongoDAO },
    { provide: 'RequestDAO', useClass: RequestMongoDAO },
    { provide: 'AssignmentDAO', useClass: AssignmentMongoDAO },
  ],
})
export class MongoDBDAOModule {}

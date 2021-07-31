import {
  CACHE_MANAGER,
  CacheModule,
  Global,
  Inject,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
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
import { Team } from '../entities/team.entity';
import { TeamSchema } from '../dao/mongodb/schemas/team.schema';
import { TeamMongoDAO } from '../dao/mongodb/teams.mdb';
import { Request } from '../entities/request.entity';
import { RequestSchema } from '../dao/mongodb/schemas/request.schema';
import { RequestMongoDAO } from '../dao/mongodb/requests.mdb';
import { AssignmentMongoDAO } from '../dao/mongodb/assignments.mdb';
import { MulterModule } from '@nestjs/platform-express';
import { Submission } from '../entities/submission.entity';
import { SubmissionSchema } from '../dao/mongodb/schemas/submisison.schema';
import { SubmissionMongoDAO } from '../dao/mongodb/submissions.mdb';
import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';

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
      { name: Team.name, schema: TeamSchema },
      { name: Submission.name, schema: SubmissionSchema },
    ]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get<string>('redisUri'),
      }),
    }),
  ],
  providers: [
    { provide: 'MulterDAO', useClass: MulterMongoDAO },
    { provide: 'UserProfileDAO', useClass: UserProfileMongoDAO },
    { provide: 'PostDAO', useClass: PostMongoDAO },
    { provide: 'RequestDAO', useClass: RequestMongoDAO },
    { provide: 'AssignmentDAO', useClass: AssignmentMongoDAO },
    { provide: 'TeamDAO', useClass: TeamMongoDAO },
    { provide: 'SubmissionDAO', useClass: SubmissionMongoDAO },
  ],
  exports: [
    MulterModule,
    CacheModule,
    { provide: 'MulterDAO', useClass: MulterMongoDAO },
    { provide: 'UserProfileDAO', useClass: UserProfileMongoDAO },
    { provide: 'PostDAO', useClass: PostMongoDAO },
    { provide: 'RequestDAO', useClass: RequestMongoDAO },
    { provide: 'AssignmentDAO', useClass: AssignmentMongoDAO },
    { provide: 'TeamDAO', useClass: TeamMongoDAO },
    { provide: 'SubmissionDAO', useClass: SubmissionMongoDAO },
  ],
})
export class MongoDBDAOModule implements OnModuleDestroy {
  constructor(@Inject(CACHE_MANAGER) private _cacheManager: Cache) {}

  onModuleDestroy() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._cacheManager.store.getClient().quit();
  }
}

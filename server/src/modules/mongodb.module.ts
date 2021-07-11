import { Global, Injectable, Module } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { UserSchema } from '../dao/mongodb/schemas/user.schema';
import { Profile } from '../entities/profile.entity';
import { ProfileSchema } from '../dao/mongodb/schemas/profile.schema';
import { Assignment } from '../entities/assignment.entity';
import { AssignmentSchema } from '../dao/mongodb/schemas/assignment.schema';
import { UserProfileMongoDAO } from '../dao/mongodb/userprofiles.mdb';
import { Post } from '../entities/post.entity';
import { PostSchema } from '../dao/mongodb/schemas/post.schema';
import { PostMongoDAO } from '../dao/mongodb/posts.mdb';
import { Request } from '../entities/request.entity';
import { RequestSchema } from '../dao/mongodb/schemas/request.schema';
import { RequestMongoDAO } from '../dao/mongodb/requests.mdb';
import { GridFsStorage } from 'multer-gridfs-storage/lib/gridfs';
import { Connection } from 'mongoose';
import {
  MulterModule,
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { AssignmentMongoDAO } from '../dao/mongodb/assignments.mdb';

@Injectable()
class MulterConfigService implements MulterOptionsFactory {
  constructor(@InjectConnection() private _connection: Connection) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: new GridFsStorage({ db: this._connection }),
    };
  }
}

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
    { provide: 'UserProfileDAO', useClass: UserProfileMongoDAO },
    { provide: 'PostDAO', useClass: PostMongoDAO },
    { provide: 'RequestDAO', useClass: RequestMongoDAO },
    { provide: 'AssignmentDAO', useClass: AssignmentMongoDAO },
  ],
  exports: [
    MulterModule,
    { provide: 'UserProfileDAO', useClass: UserProfileMongoDAO },
    { provide: 'PostDAO', useClass: PostMongoDAO },
    { provide: 'RequestDAO', useClass: RequestMongoDAO },
    { provide: 'AssignmentDAO', useClass: AssignmentMongoDAO },
  ],
})
export class MongoDBDAOModule {}

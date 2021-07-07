import { Global, Injectable, Module } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { UserSchema } from '../dao/mongodb/schemas/user.schema';
import { Profile } from '../entities/profile.entity';
import { ProfileSchema } from '../dao/mongodb/schemas/profile.schema';
import { UserProfileMongoDAO } from '../dao/mongodb/userprofiles.mdb';
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
      { name: Request.name, schema: RequestSchema }
    ]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  providers: [{ provide: 'UserProfileDAO', useClass: UserProfileMongoDAO }, 
              { provide: 'RequestDAO', useClass: RequestMongoDAO }],
  exports: [
    MulterModule,
    { provide: 'UserProfileDAO', useClass: UserProfileMongoDAO },
    { provide: 'RequestDAO', useClass: RequestMongoDAO }
  ],
})
export class MongoDBDAOModule {}

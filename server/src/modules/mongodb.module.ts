import { Global, Injectable, Module } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { UserSchema } from '../dao/mongodb/schemas/user.schema';
import { Profile } from '../entities/profile.entity';
import { ProfileSchema } from '../dao/mongodb/schemas/profile.schema';
import { UserProfileMongoDAO } from '../dao/mongodb/userprofiles.mdb';
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
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-lean-virtuals'));
          return connection;
        },
        useFindAndModify: false,
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  providers: [{ provide: 'UserProfileDAO', useClass: UserProfileMongoDAO }],
  exports: [
    MulterModule,
    { provide: 'UserProfileDAO', useClass: UserProfileMongoDAO },
  ],
})
export class MongoDBDAOModule {}

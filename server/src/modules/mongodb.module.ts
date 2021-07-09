import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { UserSchema } from '../dao/mongodb/schemas/user.schema';
import { Profile } from '../entities/profile.entity';
import { ProfileSchema } from '../dao/mongodb/schemas/profile.schema';
import { UserProfileMongoDAO } from '../dao/mongodb/userprofiles.mdb';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService, MulterMongoDAO } from '../dao/mongodb/files.mdb';

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
    ]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  providers: [
    { provide: 'MulterDAO', useClass: MulterMongoDAO },
    { provide: 'UserProfileDAO', useClass: UserProfileMongoDAO },
  ],
  exports: [
    MulterModule,
    { provide: 'MulterDAO', useClass: MulterMongoDAO },
    { provide: 'UserProfileDAO', useClass: UserProfileMongoDAO },
  ],
})
export class MongoDBDAOModule {}

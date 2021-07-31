import { CacheModule, Global, Module } from '@nestjs/common';
import { AssignmentInMemory } from '../dao/memory/assignments.mem';
import { PostInMemory } from '../dao/memory/posts.mem';
import { RequestInMemory } from '../dao/memory/requests.mem';
import { TeamInMemory } from '../dao/memory/teams.mem';
import { UserProfileInMemory } from '../dao/memory/userprofiles.mem';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MulterLocalDAO } from '../dao/memory/files.mem';

@Global()
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({}), // store files in OS temp directory, in memory behavior without possibility for memory leaks
    }),
    CacheModule.register(), // in memory cache
  ],
  providers: [
    { provide: 'MulterDAO', useClass: MulterLocalDAO },
    { provide: 'AssignmentDAO', useClass: AssignmentInMemory },
    { provide: 'PostDAO', useClass: PostInMemory },
    { provide: 'RequestDAO', useClass: RequestInMemory },
    { provide: 'TeamDAO', useClass: TeamInMemory },
    { provide: 'UserProfileDAO', useClass: UserProfileInMemory },
  ],
  exports: [
    MulterModule,
    CacheModule,
    { provide: 'MulterDAO', useClass: MulterLocalDAO },
    { provide: 'AssignmentDAO', useClass: AssignmentInMemory },
    { provide: 'PostDAO', useClass: PostInMemory },
    { provide: 'RequestDAO', useClass: RequestInMemory },
    { provide: 'TeamDAO', useClass: TeamInMemory },
    { provide: 'UserProfileDAO', useClass: UserProfileInMemory },
  ],
})
export class InMemoryDAOModule {}

import { Module } from '@nestjs/common';
import { AssignmentInMemory } from '../dao/memory/assignments.mem';
import { PostInMemory } from '../dao/memory/posts.mem';
import { RequestInMemory } from '../dao/memory/requests.mem';
import { TeamInMemory } from '../dao/memory/teams.mem';
import { UserProfileInMemory } from '../dao/memory/userprofiles.mem';

@Module({
  providers: [
    { provide: 'AssignmentDAO', useClass: AssignmentInMemory },
    { provide: 'PostDAO', useClass: PostInMemory },
    { provide: 'RequestDAO', useClass: RequestInMemory },
    { provide: 'TeamDAO', useClass: TeamInMemory },
    { provide: 'UserProfileDAO', useClass: UserProfileInMemory },
  ],
  exports: [
    { provide: 'AssignmentDAO', useClass: AssignmentInMemory },
    { provide: 'PostDAO', useClass: PostInMemory },
    { provide: 'RequestDAO', useClass: RequestInMemory },
    { provide: 'TeamDAO', useClass: TeamInMemory },
    { provide: 'UserProfileDAO', useClass: UserProfileInMemory },
  ],
})
export class InMemoryDAOModule {}

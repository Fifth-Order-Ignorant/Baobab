import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserProfilesInMemory } from '../dao/userprofiles';

@Module({
  controllers: [UserController],
  providers: [
    { provide: 'UserDAO', useClass: UserProfilesInMemory },
    UserService,
  ],
  exports: [{ provide: 'UserDAO', useClass: UserProfilesInMemory }],
})
export class UserModule {}

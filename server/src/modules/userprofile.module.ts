import { Module } from '@nestjs/common';
import { UserProfileController } from '../controllers/userprofile.controller';
import { UserProfileService } from '../services/userprofile.service';
import { UserProfileInMemory } from '../dao/userprofiles';

@Module({
  imports: [],
  controllers: [UserProfileController],
  providers: [
    { provide: 'UserProfileDAO', useClass: UserProfileInMemory },
    UserProfileService,
  ],
  exports: [{ provide: 'UserProfileDAO', useClass: UserProfileInMemory }],
})
export class UserProfileModule {}

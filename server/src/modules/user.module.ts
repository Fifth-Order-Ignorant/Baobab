import { forwardRef, Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserProfilesInMemory } from '../dao/userprofiles';
import { AuthModule } from './auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [
    { provide: 'UserDAO', useClass: UserProfilesInMemory },
    UserService,
  ],
  exports: [{ provide: 'UserDAO', useClass: UserProfilesInMemory }],
})
export class UserModule {}

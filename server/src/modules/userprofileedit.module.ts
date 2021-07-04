import { Module } from '@nestjs/common';
import { UserProfileEditController } from '../controllers/userprofileedit.controller';
import { UserProfileService } from '../services/userprofile.service';
import { AuthModule } from './auth.module';
import { InMemoryDAOModule } from './memory.module';

@Module({
  imports: [AuthModule, InMemoryDAOModule],
  controllers: [UserProfileEditController],
  providers: [UserProfileService],
})
export class UserProfileEditModule {}

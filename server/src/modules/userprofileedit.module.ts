import { Module } from '@nestjs/common';
import { UserProfileEditController } from '../controllers/userprofileedit.controller';
import { UserProfileService } from '../services/userprofile.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserProfileEditController],
  providers: [UserProfileService],
  exports: [],
})
export class UserProfileEditModule {}

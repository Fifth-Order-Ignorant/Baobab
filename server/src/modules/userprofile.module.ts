import { Module } from '@nestjs/common';
import { UserProfileController } from '../controllers/userprofile.controller';
import { UserProfileService } from '../services/userprofile.service';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}

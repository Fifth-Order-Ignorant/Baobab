import { Module } from '@nestjs/common';
import { UserProfileController } from '../controllers/userprofile.controller';
import { UserProfileService } from '../services/userprofile.service';
import { InMemoryDAOModule } from './memory.module';

@Module({
  imports: [InMemoryDAOModule],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}

import { Module } from '@nestjs/common';
import { UserProfileService } from '../services/userprofile.service';
import { RequestController } from '../controllers/request.controller';
import { RequestService } from '../services/request.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RequestController],
  providers: [RequestService, UserProfileService],
})
export class RequestModule {}

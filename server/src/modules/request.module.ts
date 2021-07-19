import { Module } from '@nestjs/common';
import { UserProfileService } from '../services/userprofile.service';
import { RequestController } from '../controllers/request.controller';
import { RequestService } from '../services/request.service';
import { AuthModule } from './auth.module';
import { RolesGuard } from '../controllers/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthModule],
  controllers: [RequestController],
  providers: [RequestService, UserProfileService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  ],
})
export class RequestModule {}

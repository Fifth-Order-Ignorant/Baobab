import { Module } from '@nestjs/common';
import { RequestController } from '../controllers/request.controller';
import { RequestService } from '../services/request.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}

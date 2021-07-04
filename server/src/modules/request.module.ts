import { Module } from '@nestjs/common';
import { RequestController } from '../controllers/request.controller';
import { RequestService } from '../services/request.service';
import { AuthModule } from './auth.module';
import { InMemoryDAOModule } from './memory.module';

@Module({
  imports: [AuthModule, InMemoryDAOModule],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}

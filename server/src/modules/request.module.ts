import { Module } from '@nestjs/common';
import { RequestController } from '../controllers/request.controller';
import { RequestService } from '../services/request.service';
import { RequestInMemory } from '../dao/requests';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RequestController],
  providers: [
    { provide: 'RequestDAO', useClass: RequestInMemory },
    RequestService,
  ],
  exports: [{ provide: 'RequestDAO', useClass: RequestInMemory }],
})
export class RequestModule {}

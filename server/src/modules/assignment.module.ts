import { AssignmentService } from '../services/assignment.service';
import { Module } from '@nestjs/common';
import { AssignmentController } from '../controllers/assignment.controller';
import { AuthModule } from './auth.module';
import { InMemoryDAOModule } from './memory.module';

@Module({
  imports: [InMemoryDAOModule, AuthModule],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}

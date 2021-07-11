import { AssignmentService } from '../services/assignment.service';
import { Module } from '@nestjs/common';
import { AssignmentController } from '../controllers/assignment.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}

import { AssignmentInMemory } from '../dao/memory/assignments.mem';
import { AssignmentService } from '../services/assignment.service';
import { Module } from '@nestjs/common';
import { AssignmentController } from '../controllers/assignment.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AssignmentController],
  providers: [
    { provide: 'AssignmentDAO', useClass: AssignmentInMemory },
    AssignmentService,
  ],
  exports: [{ provide: 'AssignmentDAO', useClass: AssignmentInMemory }],
})
export class AssignmentModule {}

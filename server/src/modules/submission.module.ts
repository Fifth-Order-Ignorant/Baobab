import { Module } from '@nestjs/common';
import { SubmissionController } from '../controllers/submission.controller';
import { SubmissionService } from '../services/submission.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}

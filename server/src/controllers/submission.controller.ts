import { Get, Controller, Req, Param, NotFoundException } from '@nestjs/common';
import { SubmissionService } from '../services/submission.service';
import {
  AssignmentSubmissionResponse,
  GetSingleSubmissionRequest,
} from 'baobab-common';
import { JwtAuth } from './jwt.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { Submission } from 'src/entities/submission.entity';

@Controller('submission')
export class SubmissionController {
  constructor(private _submissionService: SubmissionService) {}

  @JwtAuth()
  @Get('get/:id')
  @ApiResponse({ status: 200, description: 'The submission was found.' })
  @ApiResponse({
    status: 404,
    description: 'No submission found for this user on this assignment.',
  })
  async getUserSubmission(
    @Param() params: GetSingleSubmissionRequest,
    @Req() req,
  ): Promise<AssignmentSubmissionResponse> {
    const submission: Submission =
      await this._submissionService.getSubmissionForUser(
        req.user.id,
        params.id,
      );
    if (!submission) {
      throw new NotFoundException({
        errors: [],
      });
    }
    return {
      id: submission.id,
      userId: submission.userId,
      assignmentId: submission.assignmentId,
      timestamp: submission.timestamp.toString(),
      mark: submission.mark,
      feedback: submission.feedback,
    };
  }
}

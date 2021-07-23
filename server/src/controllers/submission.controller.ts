import {
  Get,
  Post,
  Put,
  Body,
  UseInterceptors,
  Controller,
  Req,
  Param,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { SubmissionService } from '../services/submission.service';
import * as mime from 'mime';
import {
  AssignmentSubmissionResponse,
  GetSingleSubAssRequest,
  UploadFileRequest,
  ResourceCreatedResponse,
  SubmissionCreateRequest,
} from 'baobab-common';

import { JwtAuthGuard } from './jwt.guard';
import { JwtAuth } from './jwt.decorator';
import {
  ApiResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
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
    @Param() params: GetSingleSubAssRequest,
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

  @UseGuards(JwtAuthGuard)
  @Put('create')
  @ApiResponse({ status: 201, description: 'The assignment is created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createSubmission(
    @Body() reqBody: SubmissionCreateRequest,
  ): Promise<ResourceCreatedResponse> {
    const submission: Submission =
      await this._submissionService.createSubmission(
        reqBody.userId,
        new Date(),
        reqBody.assignmentId,
      );

    if (!submission) {
      throw new InternalServerErrorException({
        errors: [],
      });
    }

    return { id: submission.id };
  }

  @Post('fileup/:id')
  @UseInterceptors(
    FileInterceptor('fileup', {
      fileFilter: (request, file, callback) => {
        if (
          [
            mime.getType('jpg'),
            mime.getType('png'),
            mime.getType('pdf'),
            mime.getType('mp3'),
            mime.getType('mp4'),
          ].includes(file.mimetype)
        ) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    }),
  )
  @ApiCreatedResponse({ description: 'File upload successful.' })
  @ApiBadRequestResponse({
    description: 'Uploaded file is not in one of the valid file formats.',
  })
  async uploadFile(
    @Param() params: UploadFileRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // when the callback above is rejected
    if (!file) {
      throw new BadRequestException();
    }

    const rv = await this._submissionService.uploadFile(
      params.id,
      file.originalname,
      file.mimetype,
      file.size,
      file.filename,
    );
    if (!rv) {
      throw new BadRequestException();
    }
  }
}

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
  Query,
  BadRequestException,
  InternalServerErrorException,
  UploadedFile,
  UseGuards,
  Res,
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
  FileRequest,
  SubmissionPaginationRequest,
  SubmissionPaginationResponse,
} from 'baobab-common';
import { JwtAuth } from './jwt.decorator';
import {
  ApiResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Submission } from '../entities/submission.entity';
import { UserProfileService } from '../services/userprofile.service';
import { Role } from '../entities/role.entity';

@Controller('submission')
export class SubmissionController {
  constructor(
    private _submissionService: SubmissionService,
    private _userProfileService: UserProfileService,
  ) {}

  @JwtAuth(Role.MENTOR, Role.ADMIN)
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
    const name = await this._userProfileService.getFullName(submission.userId);
    return {
      id: submission.id,
      name: name,
      assignmentId: submission.assignmentId,
      timestamp: submission.timestamp.toString(),
      mark: submission.mark,
      feedback: submission.feedback,
    };
  }

  @JwtAuth(Role.MENTOR, Role.ADMIN)
  @Get('pagination/:id')
  async pagination(
    @Param() params: GetSingleSubAssRequest,
    @Query() query: SubmissionPaginationRequest,
  ): Promise<SubmissionPaginationResponse> {
    const submissions: Submission[] =
      await this._submissionService.getPaginatedSubmissions(
        query.start,
        query.end,
        params.id,
      );
    const subRes: AssignmentSubmissionResponse[] = [];
    for (const submission of submissions) {
      const name = await this._userProfileService.getFullName(
        submission.userId,
      );
      subRes.push({
        id: submission.id,
        name: name,
        assignmentId: submission.assignmentId,
        timestamp: submission.timestamp.toString(),
        mark: submission.mark,
        feedback: submission.feedback,
      });
    }
    return {
      data: subRes,
      total: await this._submissionService.getCount(params.id),
    };
  }

  @JwtAuth()
  @Put('create')
  @ApiResponse({ status: 201, description: 'The submission is created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createSubmission(
    @Body() reqBody: SubmissionCreateRequest,
    @Req() req,
  ): Promise<ResourceCreatedResponse> {
    const submission: Submission =
      await this._submissionService.createSubmission(
        req.user.id,
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

  @ApiOkResponse({ description: 'File download successful.' })
  @ApiNotFoundResponse({ description: 'File not found.' })
  @Get('file/:id')
  async getSubFile(@Param() params: FileRequest, @Res() res: Response) {
    const subFile = await this._submissionService.getFile(params.id);
    if (subFile) {
      res.attachment(subFile.info.originalName);
      res.contentType(subFile.info.mimetype);
      subFile.data.pipe(res);
    } else {
      throw new NotFoundException();
    }
  }
}

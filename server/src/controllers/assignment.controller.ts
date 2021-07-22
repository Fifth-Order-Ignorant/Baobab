import { Assignment } from '../entities/assignment.entity';
import {
  Body,
  Get,
  Res,
  Controller,
  Query,
  Post,
  UseGuards,
  InternalServerErrorException,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AssignmentService } from '../services/assignment.service';
import {
  SingleAssignmentResponse,
  UploadFileRequest,
  CreateAssignmentRequest,
  AssignmentResponse,
  AssignmentPaginationRequest,
  GetSingleSubmissionRequest,
  FileRequest,
} from 'baobab-common';
import { JwtAuthGuard } from './jwt.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as mime from 'mime';
import { Response } from 'express';

@Controller('assignment')
export class AssignmentController {
  constructor(private _assignmentService: AssignmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({ status: 201, description: 'The assignment is created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createAssignment(
    @Body() reqBody: CreateAssignmentRequest,
  ): Promise<SingleAssignmentResponse> {
    let assignment: Assignment;
    if (reqBody.maxMark) {
      assignment = await this._assignmentService.createAssignment(
        reqBody.name,
        reqBody.description,
        reqBody.maxMark,
      );
    } else {
      assignment = await this._assignmentService.createAssignment(
        reqBody.name,
        reqBody.description,
      );
    }

    if (!assignment) {
      throw new InternalServerErrorException({
        errors: [],
      });
    }

    return { id: assignment.id };
  }

  @Post('fileup/:assId')
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

    await this._assignmentService.uploadFile(
      params.assId,
      file.originalname,
      file.mimetype,
      file.size,
      file.filename,
    );
  }

  @Get('pagination')
  async pagination(
    @Query() query: AssignmentPaginationRequest,
  ): Promise<AssignmentResponse[]> {
    const paginatedAssignments =
      await this._assignmentService.getPaginatedAssignments(
        query.start,
        query.end,
      );
    const response: AssignmentResponse[] = [];
    for (const assignment of paginatedAssignments) {
      let fileName: string = null;
      if (assignment.file) {
        fileName = assignment.file.originalName;
      }
      response.push({
        id: assignment.id,
        description: assignment.description,
        maxMark: assignment.maxMark,
        name: assignment.name,
        filename: fileName,
      });
    }
    return response;
  }

  @Get('get/:id')
  @ApiResponse({ status: 200, description: 'The assignment was found.' })
  @ApiResponse({ status: 404, description: 'No assignment found.' })
  async getUserSubmission(
    @Param() params: GetSingleSubmissionRequest,
  ): Promise<AssignmentResponse> {
    const assignment: Assignment = await this._assignmentService.getAssignment(
      params.id,
    );
    if (!assignment) {
      throw new NotFoundException({
        errors: [],
      });
    }
    let fileName: string = null;
    if (assignment.file) {
      fileName = assignment.file.originalName;
    }
    return {
      id: assignment.id,
      description: assignment.description,
      maxMark: assignment.maxMark,
      name: assignment.name,
      filename: fileName,
    };
  }

  @ApiOkResponse({ description: 'File download successful.' })
  @ApiNotFoundResponse({ description: 'File not found.' })
  @Get('file/:id')
  async getAssFile(@Param() params: FileRequest, @Res() res: Response) {
    const assFile = await this._assignmentService.getFile(params.id);
    if (assFile) {
      res.attachment(assFile.info.originalName);
      res.contentType(assFile.info.mimetype);
      assFile.data.pipe(res);
    } else {
      throw new NotFoundException();
    }
  }
}

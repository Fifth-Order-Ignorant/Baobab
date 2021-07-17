import { Assignment } from './../entities/assignment.entity';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  InternalServerErrorException,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { AssignmentService } from '../services/assignment.service';
import {
  SingleAssignmentResponse,
  CreateAssignmentRequest,
  UploadFileRequest,
} from 'baobab-common';
import { JwtAuthGuard } from './jwt.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as mime from 'mime';

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
}

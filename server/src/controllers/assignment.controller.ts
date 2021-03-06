import { Assignment } from '../entities/assignment.entity';
import {
  Body,
  Get,
  Res,
  Controller,
  Query,
  Post,
  InternalServerErrorException,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AssignmentService } from '../services/assignment.service';
import {
  ResourceCreatedResponse,
  UploadFileRequest,
  CreateAssignmentRequest,
  AssignmentResponse,
  AssignmentPaginationRequest,
  GetSingleSubAssRequest,
  FileRequest,
} from 'baobab-common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as mime from 'mime';
import { JwtAuth } from './jwt.decorator';
import { Role } from '../entities/role.entity';
import { Response } from 'express';

@Controller('assignment')
export class AssignmentController {
  constructor(private _assignmentService: AssignmentService) {}

  @JwtAuth(Role.ADMIN, Role.MENTOR)
  @Post('create')
  @ApiResponse({ status: 201, description: 'The assignment is created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'User is not logged in.' })
  @ApiResponse({
    status: 403,
    description: 'User is not a mentor nor an admin.',
  })
  async createAssignment(
    @Body() reqBody: CreateAssignmentRequest,
  ): Promise<ResourceCreatedResponse> {
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

  @JwtAuth(Role.ADMIN, Role.MENTOR)
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
  @ApiResponse({ status: 401, description: 'User is not logged in.' })
  @ApiResponse({
    status: 403,
    description: 'User is not a mentor nor an admin.',
  })
  async uploadFile(
    @Param() params: UploadFileRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // when the callback above is rejected
    if (!file) {
      throw new BadRequestException();
    }

    const rv: boolean = await this._assignmentService.uploadFile(
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

  @ApiResponse({ status: 400, description: 'Bad request' })
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
  async getAssignment(
    @Param() params: GetSingleSubAssRequest,
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

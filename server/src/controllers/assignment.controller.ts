import { Assignment } from './../entities/assignment.entity';
import {
  Body,
  Get,
  Controller,
  Query,
  Post,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { AssignmentService } from '../services/assignment.service';
import {
  CreateAssignmentRequest,
  AssignmentResponse,
  AssignmentPaginationRequest,
} from 'baobab-common';
import { JwtAuthGuard } from './jwt.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('assignment')
export class AssignmentController {
  constructor(private _assignmentService: AssignmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({ status: 201, description: 'The assignment is created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createAssignment(@Body() reqBody: CreateAssignmentRequest) {
    let assignment: Assignment;
    if (reqBody.maxMark) {
      assignment = this._assignmentService.createAssignment(
        reqBody.name,
        reqBody.description,
        reqBody.maxMark,
      );
    } else {
      assignment = this._assignmentService.createAssignment(
        reqBody.name,
        reqBody.description,
      );
    }

    if (!assignment) {
      throw new InternalServerErrorException({
        errors: [],
      });
    }
  }

  @Get('pagination')
  pagination(
    @Query() query: AssignmentPaginationRequest,
  ): AssignmentResponse[] {
    const paginatedProfiles = this._assignmentService.getPaginatedAssignments(
      query.start,
      query.end,
    );
    return paginatedProfiles;
  }
}

import {
  InternalServerErrorException,
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { RequestService } from '../services/request.service';
import { Response } from 'express';
import { RoleRequest } from 'baobab-common';
import { JwtAuthGuard } from './jwt.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('request')
export class RequestController {
  constructor(private _requestService: RequestService) {}

  @UseGuards(JwtAuthGuard)
  @Post('role')
  @ApiResponse({ status: 201, description: 'The role is returned.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  requestRole(
    @Body() reqBody: RoleRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ) {
    const today = new Date();

    const role = this._requestService.stringToRole(reqBody.role);

    if (!role) {
      throw new BadRequestException({
        errors: [],
      });
    }

    const request = this._requestService.createRequest(
      req.user.id,
      reqBody.description,
      today,
      role,
    );

    if (!request) {
      throw new InternalServerErrorException({
        errors: [],
      });
    }
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
} from '@nestjs/common';
import { UserProfileService } from '../services/userprofile.service';
import { Response } from 'express';
import { EditNameRequest, EditJobRequest, EditBioRequest } from 'baobab-common';
import { ConfigService } from '@nestjs/config';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { JwtAuth } from './jwt.decorator';

@Controller('profile')
export class UserProfileEditController {
  constructor(
    private _userProfileService: UserProfileService,
    private _authService: AuthService,
    private _configService: ConfigService,
  ) {}

  @JwtAuth()
  @Get('myprofile')
  @ApiResponse({
    status: 200,
    description: 'The profile is correctly fetched.',
  })
  @ApiResponse({ status: 400, description: 'The request is invalid.' })
  async getProfile(@Req() req) {
    const id = req.user.id;
    if (await this._userProfileService.isValidProfile(id)) {
      return this._userProfileService.getProfile(id);
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }

  @JwtAuth()
  @Post('editname')
  @ApiResponse({ status: 201, description: 'Name is updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async editName(@Req() req, @Body() reqBody: EditNameRequest) {
    const id = req.user.id;
    if (await this._userProfileService.isValidProfile(id)) {
      await this._userProfileService.editName(
        id,
        reqBody.firstName,
        reqBody.lastName,
      );
      this._authService.markSessionsStale(id, true);
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }

  @JwtAuth()
  @ApiResponse({ status: 201, description: 'Job is updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('editjob')
  async editJob(
    @Body() reqBody: EditJobRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ) {
    const id = req.user.id;
    if (await this._userProfileService.isValidProfile(id)) {
      await this._userProfileService.editJob(id, reqBody.jobTitle);
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }

  @JwtAuth()
  @ApiResponse({ status: 201, description: 'Bio is updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('editbio')
  async editBio(
    @Body() reqBody: EditBioRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ) {
    const id = req.user.id;
    if (await this._userProfileService.isValidProfile(id)) {
      await this._userProfileService.editBio(id, reqBody.bio);
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }
}

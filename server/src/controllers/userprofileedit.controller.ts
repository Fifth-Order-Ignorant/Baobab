import {
  BadRequestException,
  Body,
  Controller,
  Get,
  UseGuards,
  Post,
  Res,
  Req,
} from '@nestjs/common';
import { UserProfileService } from '../services/userprofile.service';
import { Response } from 'express';
import {
  EditNameRequest,
  EditJobRequest,
  EditBioRequest,
} from 'baobab-common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt.guard';

@Controller('profile')
export class UserProfileEditController {
  constructor(
    private _userProfileService: UserProfileService,
    private _configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('myprofile')
  getProfile(@Req() req) {
    const id = req.user.id;
    if (this._userProfileService.isValidProfile(id)) {
      return this._userProfileService.getProfile(id);
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('editname')
  editName(
    @Body() reqBody: EditNameRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ): void {
    const id = req.user.id;
    if (this._userProfileService.isValidProfile(id)) {
      this._userProfileService.editName(
        id,
        reqBody.firstName,
        reqBody.lastName,
      );
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('editjob')
  editJob(
    @Body() reqBody: EditJobRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ): void {
    const id = req.user.id;
    if (this._userProfileService.isValidProfile(id)) {
      this._userProfileService.editJob(id, reqBody.jobTitle);
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('editbio')
  editBio(
    @Body() reqBody: EditBioRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ): void {
    const id = req.user.id;
    if (this._userProfileService.isValidProfile(id)) {
      this._userProfileService.editBio(id, reqBody.bio);
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }
}

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
  RegisterRequest,
  ProfilePaginationRequest,
  EditNameRequest,
  EditJobRequest,
  EditBioRequest,
} from 'baobab-common';
import { ValidationError } from 'yup';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt.guard';

@Controller('user')
export class UserProfileController {
  constructor(
    private _userProfileService: UserProfileService,
    private _configService: ConfigService,
  ) {}

  @Post('register')
  register(
    @Body() reqBody: RegisterRequest,
    // @Res({ passthrough: true }) res: Response,
  ) {
    const user = this._userProfileService.registerUser(
      reqBody.firstName,
      reqBody.lastName,
      reqBody.email,
      reqBody.password,
    );

    if (!user) {
      throw new BadRequestException({
        errors: [new ValidationError('Email taken.', reqBody.email, 'email')],
      });
    }

    // redirect to automatically login (will work once we set up CORS later)
    // res.redirect(307, 'http://localhost:3001/auth/login');
  }

  @Get('pagination')
  pagination(
    @Body() reqBody: ProfilePaginationRequest,
  ): Record<string, string>[] {
    const paginatedProfiles = this._userProfileService.getPaginatedProfiles(
      reqBody.start,
      reqBody.end,
    );
    return paginatedProfiles;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
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

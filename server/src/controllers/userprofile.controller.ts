import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';
import { UserProfileService } from '../services/userprofile.service';
import { Response } from 'express';
import {
  RegisterRequest,
  ProfilePaginationRequest,
} from 'baobab-common';
import { ValidationError } from 'yup';
import { ConfigService } from '@nestjs/config';

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

  @Post('pagination')
  pagination(
    @Body() reqBody: ProfilePaginationRequest,
  ): Record<string, string>[] {
    const paginatedProfiles = this._userProfileService.getPaginatedProfiles(
      reqBody.start,
      reqBody.end,
    );
    return paginatedProfiles;
  }
}

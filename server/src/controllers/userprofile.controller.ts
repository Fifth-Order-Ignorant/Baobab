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
  EditProfileRequest,
} from 'baobab-common';
import { AuthService } from '../services/auth.service';
import { ValidationError } from 'yup';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt.guard';

@Controller('user')
export class UserProfileController {
  constructor(
    private _userProfileService: UserProfileService,
    private _authService: AuthService,
    private _configService: ConfigService,
  ) {}

  @Post('register')
  register(
    @Body() reqBody: RegisterRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userProfile = this._userProfileService.registerUser(
      reqBody.firstName,
      reqBody.lastName,
      reqBody.email,
      reqBody.password,
    );
    const user = userProfile ? userProfile[0] : null;

    if (!user) {
      throw new BadRequestException({
        errors: [new ValidationError('Email taken.', reqBody.email, 'email')],
      });
    }

    const { jwt, integrityString } = this._authService.genJwt(user.id);

    res.cookie('SESSION_JWT', jwt, {
      secure: this._configService.get<boolean>('production'),
      sameSite: 'lax',
    });

    res.cookie('SESSION_INT', integrityString, {
      httpOnly: true,
      secure: this._configService.get<boolean>('production'),
      sameSite: 'lax',
    });
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
  @Post('edit')
  editProfile(
    @Body() reqBody: EditProfileRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ): void {
    const id = req.user.id;
    if (this._userProfileService.isValidProfile(id)) {
      this._userProfileService.editProfile(
        id,
        reqBody.firstName,
        reqBody.lastName,
        reqBody.jobTitle,
        reqBody.bio,
      );
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }
}

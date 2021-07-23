import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Query,
  Get,
  Param,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { UserProfileService } from '../services/userprofile.service';
import {
  RegisterRequest,
  ProfilePaginationRequest,
  ProfileViewRequest,
  ProfileResponse,
  ProfilePictureRequest,
} from 'baobab-common';
import { ValidationError } from 'yup';
import { ConfigService } from '@nestjs/config';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

@Controller('user')
export class UserProfileController {
  constructor(
    private _userProfileService: UserProfileService,
    private _configService: ConfigService,
  ) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'The user registered.' })
  @ApiResponse({ status: 400, description: 'The email is taken.' })
  async register(@Body() reqBody: RegisterRequest) {
    const user = await this._userProfileService.registerUser(
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

  @Post('view')
  @ApiResponse({
    status: 201,
    description: 'The profile is correctly fetched.',
  })
  @ApiResponse({ status: 400, description: 'The request is invalid.' })
  async getProfile(@Body() reqBody: ProfileViewRequest) {
    const id = reqBody.userId;
    if (await this._userProfileService.isValidProfile(id)) {
      return this._userProfileService.getProfile(id);
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }

  @Get('pagination')
  async pagination(
    @Query() query: ProfilePaginationRequest,
  ): Promise<ProfileResponse[]> {
    const paginatedProfiles =
      await this._userProfileService.getPaginatedProfiles(
        query.start,
        query.end,
      );
    return paginatedProfiles;
  }

  @ApiOkResponse({ description: 'Profile picture download successful.' })
  @ApiNotFoundResponse({ description: 'Profile picture not found.' })
  @Get('picture/:id')
  async getPicture(
    @Param() params: ProfilePictureRequest,
    @Res() res: Response,
  ) {
    const picture = await this._userProfileService.getPicture(params.id);
    if (picture) {
      res.contentType(picture.info.mimetype);
      picture.data.pipe(res);
    } else {
      throw new NotFoundException();
    }
  }
}

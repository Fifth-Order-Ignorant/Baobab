import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserProfileService } from '../services/userprofile.service';
import { Response } from 'express';
import {
  EditNameRequest,
  EditJobRequest,
  EditBioRequest,
  EditLinksRequest,
} from 'baobab-common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { JwtAuth } from './jwt.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import * as mime from 'mime';

@Controller('profile')
export class UserProfileEditController {
  constructor(
    private _userProfileService: UserProfileService,
    private _authService: AuthService,
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
  @ApiResponse({ status: 200, description: 'Name is updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Patch('editname')
  async editName(@Req() req, @Body() reqBody: EditNameRequest) {
    const id = req.user.id;
    if (await this._userProfileService.isValidProfile(id)) {
      await this._userProfileService.editName(
        id,
        reqBody.firstName,
        reqBody.lastName,
      );
      await this._authService.markSessionsStale(id, true);
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }

  @JwtAuth()
  @ApiResponse({ status: 200, description: 'Job is updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Patch('editjob')
  async editJob(@Body() reqBody: EditJobRequest, @Req() req) {
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
  @ApiResponse({ status: 200, description: 'Bio is updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Patch('editbio')
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

  @JwtAuth()
  @ApiResponse({ status: 200, description: 'External Links are updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Patch('editlinks')
  async editLinks(
    @Body() reqBody: EditLinksRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ) {
    const id = req.user.id;
    if (await this._userProfileService.isValidProfile(id)) {
      await this._userProfileService.editLinks(id, reqBody.links);
    } else {
      throw new BadRequestException({
        errors: [],
      });
    }
  }

  @JwtAuth()
  @Post('picture')
  @UseInterceptors(
    FileInterceptor('picture', {
      fileFilter: (request, file, callback) => {
        if (
          [mime.getType('jpg'), mime.getType('png')].includes(file.mimetype)
        ) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    }),
  )
  @ApiCreatedResponse({ description: 'Profile picture update successful.' })
  @ApiBadRequestResponse({
    description: 'Uploaded file is not a JPG or PNG image.',
  })
  async editPicture(@Req() req, @UploadedFile() file: Express.Multer.File) {
    // when the callback above is rejected
    if (!file) {
      throw new BadRequestException();
    }

    await this._userProfileService.editPicture(
      req.user.id,
      file.originalname,
      file.mimetype,
      file.size,
      file.filename,
    );
  }
}

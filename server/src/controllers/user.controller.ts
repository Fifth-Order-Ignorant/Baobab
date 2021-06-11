import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response } from 'express';
import { RegisterRequest } from 'baobab-common';
import { ValidationError } from 'yup';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private _userService: UserService,
    private _configService: ConfigService,
  ) {}

  @Post('register')
  register(
    @Body() reqBody: RegisterRequest,
    // @Res({ passthrough: true }) res: Response,
  ) {
    const user = this._userService.registerUser(
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
}

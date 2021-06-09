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
import { AuthService } from '../services/auth.service';
import { ValidationError } from 'yup';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _configService: ConfigService,
  ) {}

  @Post('register')
  register(
    @Body() reqBody: RegisterRequest,
    @Res({ passthrough: true }) res: Response,
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
}

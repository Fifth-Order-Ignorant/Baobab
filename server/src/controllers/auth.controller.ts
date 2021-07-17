import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginRequest } from 'baobab-common';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from 'yup';
import { ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private _authService: AuthService,
    private _configService: ConfigService,
  ) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'The user logged in successfully.' })
  @ApiUnauthorizedResponse({ description: 'Invalid login.' })
  async login(
    @Body() reqBody: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this._authService.verifyLogin(
      reqBody.email,
      reqBody.password,
    );

    if (!user) {
      throw new UnauthorizedException({
        errors: [
          new ValidationError('Incorrect login.', reqBody.email, 'email'),
          new ValidationError('Incorrect login.', reqBody.password, 'password'),
        ],
      });
    }

    const { jwt, integrityString } = await this._authService.genJwt(user.id);

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

  @ApiResponse({ status: 200, description: 'The request has succeeded.' })
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('SESSION_JWT');
    res.clearCookie('SESSION_INT');
  }
}

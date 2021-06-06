import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginRequest } from 'baobab-common';
import { JwtAuthGuard } from './jwt.guard';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private _authService: AuthService,
    private _configService: ConfigService,
  ) {}

  @Post('login')
  login(
    @Body() reqBody: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = this._authService.verifyLogin(reqBody.email, reqBody.password);

    if (!user) {
      throw new UnauthorizedException();
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

  @UseGuards(JwtAuthGuard)
  @Get('session')
  session(@Req() req) {
    return req.user.id;
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('SESSION_JWT');
    res.clearCookie('SESSION_INT');
  }
}

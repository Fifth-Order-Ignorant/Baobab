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
import { RegisterRequest } from 'baobab-common';
import { JwtAuthGuard } from './jwt.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('login')
  login(
    @Body() reqBody: RegisterRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = this._authService.verifyLogin(reqBody.email, reqBody.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { jwt, integrityString } = this._authService.genJwt(user.id);

    res.cookie('SESSION_JWT', jwt, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.cookie('SESSION_INT', integrityString, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('session')
  session(@Req() req) {
    return req.user.id;
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { LoginResponse } from '../responses/LoginResponse';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { Request, Response } from 'express';
import { RegisterRequest } from 'baobab-common';

@Controller('user')
export class UserController {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  @Post('register')
  register(
    @Req() req: Request,
    @Body() reqBody: RegisterRequest,
    @Res({ passthrough: true }) res: Response,
  ): LoginResponse {
    const user = this._userService.registerUser(
      reqBody.firstName,
      reqBody.lastName,
      reqBody.email,
      reqBody.password,
    );

    if (!user) {
      throw new BadRequestException();
    }

    const integrityString = crypto.randomBytes(50).toString('hex');

    res.cookie('integrityString', integrityString);

    const integrityHash = crypto
      .createHash('sha256')
      .update(integrityString)
      .digest('hex');

    return {
      token: this._jwtService.sign({
        id: user.id,
        integrityHash: integrityHash,
      }),
    };
  }

  @Post('login')
  login(
    @Req() req: Request,
    @Body() reqBody: RegisterRequest,
    @Res({ passthrough: true }) res: Response,
  ): LoginResponse {
    const user = this._userService.verifyLogin(reqBody.email, reqBody.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const integrityString = crypto.randomBytes(50).toString('hex');

    res.cookie('integrityString', integrityString);

    const integrityHash = crypto
      .createHash('sha256')
      .update(integrityString)
      .digest('hex');

    return {
      token: this._jwtService.sign({
        id: user.id,
        integrityHash: integrityHash,
      }),
    };
  }
}

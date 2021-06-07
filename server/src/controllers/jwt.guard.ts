import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { extractJwtFromCookie } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private _authService: AuthService,
    private _configService: ConfigService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const jwt = extractJwtFromCookie(request);
    const integrityString = request.cookies['SESSION_INT'];

    if (
      !super.canActivate(context) ||
      !this._authService.verifyJwt(jwt, integrityString)
    ) {
      if (jwt) {
        // remove invalid cookies
        response.clearCookie('SESSION_JWT');
        response.clearCookie('SESSION_INT');
      }
      throw new UnauthorizedException();
    }

    // handle auto renewal of session token
    const renewed = this._authService.renew(jwt);
    if (renewed) {
      response.cookie('SESSION_JWT', renewed.jwt, {
        secure: this._configService.get<boolean>('production'),
        sameSite: 'lax',
      });
      response.cookie('SESSION_INT', renewed.integrityString, {
        httpOnly: true,
        secure: this._configService.get<boolean>('production'),
        sameSite: 'lax',
      });
    }

    return true;
  }
}

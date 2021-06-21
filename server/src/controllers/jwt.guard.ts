import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
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

    const jwt = extractJwtFromCookie(request);
    const integrityString = request.cookies['SESSION_INT'];

    if (jwt && !this._authService.verifyJwt(jwt, integrityString)) {
      throw new UnauthorizedException();
    }

    return super.canActivate(context);
  }
}

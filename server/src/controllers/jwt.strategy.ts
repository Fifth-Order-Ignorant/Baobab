import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';

export function extractJwtFromCookie(req: Request) {
  return req.cookies['SESSION_JWT'];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private _configService: ConfigService,
    private _authService: AuthService,
  ) {
    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: _configService.get<string>('jwtSecret'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const integrityString = request.cookies['SESSION_INT'];
    if (!(await this._authService.verifyJwt(payload, integrityString))) {
      throw new UnauthorizedException();
    }

    const renewed = await this._authService.renew(payload);

    if (renewed) {
      request.res.cookie('SESSION_JWT', renewed.jwt, {
        secure: this._configService.get<boolean>('production'),
        sameSite: 'lax',
      });
      request.res.cookie('SESSION_INT', renewed.integrityString, {
        httpOnly: true,
        secure: this._configService.get<boolean>('production'),
        sameSite: 'lax',
      });

      return renewed.payload;
    }

    return payload;
  }
}

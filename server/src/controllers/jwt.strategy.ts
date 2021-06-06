import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

export function extractJwtFromCookie(req: Request) {
  return req.cookies['SESSION_JWT'];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _configService: ConfigService) {
    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: _configService.get<string>('jwtSecret'),
    });
  }

  async validate(req: Request, payload: any) {
    return { id: payload.id };
  }
}

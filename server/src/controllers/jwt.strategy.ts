import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

export function extractJwtFromCookie(req: Request) {
  return req.cookies['SESSION_JWT'];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: 'devSecret', // todo: replace with dotenv
    });
  }

  async validate(req: Request, payload: any) {
    return { id: payload.id };
  }
}

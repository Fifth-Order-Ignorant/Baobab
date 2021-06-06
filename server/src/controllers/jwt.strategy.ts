import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'helloworld',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const integrityHash = crypto
      .createHash('sha256')
      .update(req.cookies['integrityString'])
      .digest('hex');

    if (integrityHash !== payload.integrityHash) {
      throw new UnauthorizedException();
    }

    return { id: payload.id };
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';
import { extractJwtFromCookie } from './jwt.strategy';
import { map } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(
    private _authService: AuthService,
    private _configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (data) => {
        const request = context.switchToHttp().getRequest<Request>();

        const jwt = extractJwtFromCookie(request);

        const renewed = await this._authService.renew(jwt);

        if (renewed) {
          const response = context.switchToHttp().getResponse<Response>();

          response.cookie('SESSION_JWT', renewed.jwt, {
            secure: this._configService.get<boolean>('production'),
            sameSite: 'lax',
          });
          response.cookie('SESSION_INT', renewed.integrityString, {
            httpOnly: true,
            secure: this._configService.get<boolean>('production'),
            sameSite: 'lax',
          });

          return data;
        }
      }),
    );
  }
}

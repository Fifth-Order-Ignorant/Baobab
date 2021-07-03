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
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(
    private _authService: AuthService,
    private _configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        const jwt = extractJwtFromCookie(request);

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
      }),
    );
  }
}

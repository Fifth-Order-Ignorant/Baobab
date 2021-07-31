import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';
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
        const { user } = context.switchToHttp().getRequest();

        const renewed = await this._authService.renew(user);

        if (renewed) {
          const response = context.switchToHttp().getResponse<Response>();

          const maxAge = renewed.payload.exp - Date.now() / 1000;

          response.cookie('SESSION_JWT', renewed.jwt, {
            secure: this._configService.get<boolean>('production'),
            sameSite: 'lax',
            maxAge: maxAge * 1000,
          });

          response.cookie('SESSION_INT', renewed.integrityString, {
            httpOnly: true,
            secure: this._configService.get<boolean>('production'),
            sameSite: 'lax',
            maxAge: maxAge * 1000,
          });
        }
        return data;
      }),
    );
  }
}

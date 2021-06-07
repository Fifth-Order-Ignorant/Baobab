import { ArgumentsHost, Catch, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CustomExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    if (exception instanceof UnauthorizedException) {
      const response = host.switchToHttp().getResponse<Response>();

      // in the scenario a user is unauthorized, remove any invalid cookies
      response.clearCookie('SESSION_JWT');
      response.clearCookie('SESSION_INT');
    }

    super.catch(exception, host);
  }
}

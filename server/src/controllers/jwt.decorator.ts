import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { JwtInterceptor } from './jwt.interceptor';

export function JwtAuth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    UseInterceptors(JwtInterceptor),
  );
}

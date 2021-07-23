import {
  applyDecorators,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtInterceptor } from './jwt.interceptor';
import { Role } from '../entities/role.entity';
import { ROLES_KEY, RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';

export function JwtAuth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    UseInterceptors(JwtInterceptor),
  );
}

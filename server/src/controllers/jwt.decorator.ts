import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { ROLES_KEY, RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';

export function JwtAuth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard('jwt'), RolesGuard),
  );
}

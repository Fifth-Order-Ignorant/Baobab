import { ROLES_KEY } from './roles.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const ctx = context.switchToHttp();

    // Problem: This object does not have a user property
    
    const request = ctx.getRequest();  
    console.log("Request is", request);
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }

    // const userId = request.user.id;
    // console.log("User Id is: ", userId);
    return true; 
    // return requiredRoles.some((role) => user.role == role);
  }
}
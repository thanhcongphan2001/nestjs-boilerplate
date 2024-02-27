import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);
    console.log(roles);

    if (!roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request.user?.role);

    return roles.includes(request.user?.role?.id);
  }
}

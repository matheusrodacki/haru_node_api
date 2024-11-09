// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const userRoleIndex = this.getRolePriority(user.role);
    return requiredRoles.some(
      (role) => userRoleIndex <= this.getRolePriority(role),
    );
  }

  private getRolePriority(role: Role): number {
    switch (role) {
      case Role.SUPERADMIN:
        return 1;
      case Role.ADMIN:
        return 2;
      case Role.OPERATOR:
        return 3;
      default:
        return 999;
    }
  }
}

// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientsRoles } from './clientsRoles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ClientsRoles[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

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

  private getRolePriority(role: ClientsRoles): number {
    switch (role) {
      case ClientsRoles.SUPERADMIN:
        return 1;
      case ClientsRoles.ADMIN:
        return 2;
      case ClientsRoles.OPERATOR:
        return 3;
      default:
        return 999;
    }
  }
}

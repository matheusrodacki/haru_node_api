// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { ClientsRoles } from './clientsRoles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ClientsRoles[]) =>
  SetMetadata(ROLES_KEY, roles);

import { Module } from '@nestjs/common';
import { PermissionsGuard } from './permissions.gaurd';

@Module({
  providers: [PermissionsGuard],
  exports: [PermissionsGuard],
})
export class AuthorizationModule {}

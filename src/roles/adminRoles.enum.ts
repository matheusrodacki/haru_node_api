export enum AdminRoles {
  SUPER_ADMIN = 'super_admin',
  MANAGER = 'manager',
}

export const AdminPermissions = {
  [AdminRoles.SUPER_ADMIN]: ['manage_all_clients', 'view_all_clients'],
  [AdminRoles.MANAGER]: ['view_all_clients'],
};

import { ROLES } from "@repo/common/constants";

export const canManageUsers = (roleId: number): boolean =>
  roleId === ROLES.ADMIN.ID || roleId === ROLES.MANAGER.ID;

export function canEditUser(
  userLoggedRoleId: number,
  userRoleId: number
): boolean {
  if (userLoggedRoleId === ROLES.ADMIN.ID) {
    return true;
  }

  if (
    userLoggedRoleId === ROLES.MANAGER.ID &&
    userRoleId === ROLES.EMPLOYEE.ID
  ) {
    return true;
  }

  return false;
}

export const canEditRestaurant = (roleId: number): boolean =>
  roleId === ROLES.ADMIN.ID || roleId === ROLES.MANAGER.ID;

export const canCreateRestaurant = (roleId: number): boolean =>
  roleId === ROLES.ADMIN.ID;

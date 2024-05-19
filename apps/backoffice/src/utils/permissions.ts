import { ROLES } from "@repo/common/constants";

export const hasManageUsersPermission = (roleId: number) =>
  roleId === ROLES.ADMIN.ID || roleId === ROLES.MANAGER.ID;

export function hasEditUserPermission(
  userLoggedRoleId: number,
  userRoleId: number
) {
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

import { ROLES } from "@repo/common/constants";

export const hasManageUsersPermission = (roleId: number) =>
  roleId === ROLES.ADMIN.id || roleId === ROLES.MANAGER.id;

export function hasEditUserPermission(
  userLoggedRoleId: number,
  userRoleId: number
) {
  if (userLoggedRoleId === ROLES.ADMIN.id) {
    return true;
  }

  if (
    userLoggedRoleId === ROLES.MANAGER.id &&
    userRoleId === ROLES.EMPLOYEE.id
  ) {
    return true;
  }

  return false;
}

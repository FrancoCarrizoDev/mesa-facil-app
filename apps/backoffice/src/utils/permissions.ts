import { ROLES } from "@repo/common/constants";

export const hasManageUsersPermission = (role: keyof typeof ROLES) =>
  role === ROLES.ADMIN.ID || role === ROLES.MANAGER.ID;

export function hasEditUserPermission(
  userLoggedRole: string,
  userRole: string
) {
  if (userLoggedRole === ROLES.ADMIN.ID) {
    return true;
  }

  if (userLoggedRole === ROLES.MANAGER.ID && userRole === ROLES.EMPLOYEE.ID) {
    return true;
  }

  return false;
}

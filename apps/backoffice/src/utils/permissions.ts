import { ROLES } from "@/constants/roles";

export const hasManageUsersPermission = (role: keyof typeof ROLES) =>
  role === ROLES.ADMIN.ID || role === ROLES.MANAGER.ID;

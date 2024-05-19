export interface Role {
  id: number;
  DISPLAY_NAME: string;
}

interface Roles {
  ADMIN: Role;
  EMPLOYEE: Role;
  MANAGER: Role;
}

export const ROLES: Roles = {
  ADMIN: {
    id: 1,
    DISPLAY_NAME: "Administrador",
  },
  MANAGER: {
    id: 2,
    DISPLAY_NAME: "Gerente/Encargado",
  },
  EMPLOYEE: {
    id: 3,
    DISPLAY_NAME: "Empleado",
  },
};

export const getRoleDisplayNameByRoleId = (roleId: number): string => {
  switch (roleId) {
    case ROLES.ADMIN.id:
      return ROLES.ADMIN.DISPLAY_NAME;
    case ROLES.MANAGER.id:
      return ROLES.MANAGER.DISPLAY_NAME;
    case ROLES.EMPLOYEE.id:
      return ROLES.EMPLOYEE.DISPLAY_NAME;
    default:
      return "Rol no encontrado";
  }
};

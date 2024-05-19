export interface Role {
  ID: number;
  DISPLAY_NAME: string;
}

interface Roles {
  ADMIN: Role;
  EMPLOYEE: Role;
  MANAGER: Role;
}

export const ROLES: Roles = {
  ADMIN: {
    ID: 1,
    DISPLAY_NAME: "Administrador",
  },
  MANAGER: {
    ID: 2,
    DISPLAY_NAME: "Gerente/Encargado",
  },
  EMPLOYEE: {
    ID: 3,
    DISPLAY_NAME: "Empleado",
  },
};

export const getRoleDisplayNameByRoleId = (roleId: number): string => {
  switch (roleId) {
    case ROLES.ADMIN.ID:
      return ROLES.ADMIN.DISPLAY_NAME;
    case ROLES.MANAGER.ID:
      return ROLES.MANAGER.DISPLAY_NAME;
    case ROLES.EMPLOYEE.ID:
      return ROLES.EMPLOYEE.DISPLAY_NAME;
    default:
      return "Rol no encontrado";
  }
};

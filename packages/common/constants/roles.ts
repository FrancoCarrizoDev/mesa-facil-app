interface Role {
  ID: string;
  DISPLAY_NAME: string;
}

interface Roles {
  ADMIN: Role;
  EMPLOYEE: Role;
  MANAGER: Role;
}

export const ROLES: Roles = {
  ADMIN: {
    ID: "ADMIN",
    DISPLAY_NAME: "Administrador",
  },
  MANAGER: {
    ID: "MANAGER",
    DISPLAY_NAME: "Gerente/Encargado",
  },
  EMPLOYEE: {
    ID: "EMPLOYEE",
    DISPLAY_NAME: "Empleado",
  },
};

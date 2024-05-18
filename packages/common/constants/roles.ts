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

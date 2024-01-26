type Role = {
  ID: string;
  DISPLAY_NAME: string;
};

interface Roles {
  ADMIN: Role;
  USER: Role;
}

export const ROLES: Roles = {
  ADMIN: {
    ID: "ADMIN",
    DISPLAY_NAME: "Administrador",
  },
  USER: {
    ID: "EMPLOYEE",
    DISPLAY_NAME: "Empleado",
  },
};

export interface CreateUserDTO {
  email: string;
  password: string;
  username: string;
  userRoleId?: number;
  restaurantIds?: string[];
  root_user_id?: string;
}

export interface UpdateUserDTO extends CreateUserDTO {
  id: string;
  changePassword: boolean;
}

export interface UserDTO {
  id: string;
  email: string;
  active: boolean;
  username: string;
  restaurants: UserRestaurantDTO[];
  userRoleId: number;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  userRootId: string | null;
}

export interface UserRestaurantDTO {
  id: string;
  name: string;
}

export interface UserStatus {
  ACTIVE: string;
  INACTIVE: string;
}

export const USER_STATUS: UserStatus = {
  ACTIVE: "Activo",
  INACTIVE: "Inactivo",
};

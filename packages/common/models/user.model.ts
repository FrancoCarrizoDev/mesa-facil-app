export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  restaurantIds: string[];
  root_user_id?: string;
}

export interface UpdateUserDTO extends CreateUserDTO {
  id: string;
  changePassword: boolean;
}

export interface UserDTO {
  id: string;
  provider: string;
  email: string;
  firstName: string;
  status: string;
  lastName: string;
  restaurants: UserRestaurantDTO[];
  createdAt: string;
  updatedAt: string;
  userRole: string;
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

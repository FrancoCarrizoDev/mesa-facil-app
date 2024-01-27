import { ROLES } from "@/constants/roles";
import { type Restaurant } from "./restaurant.model";

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  restaurantIds?: string[];
  root_user_id?: string;
}

export interface User {
  id: string;
  provider: string;
  email: string;
  password?: string;
  first_name: string;
  last_name?: string;
  restaurants: Restaurant[];
  createdAt: string;
  updatedAt: string;
}

export interface UserDTO {
  id: string;
  provider: string;
  email: string;
  firsName: string;
  lastName: string | null;
  restaurants: UserRestaurantDTO[];
  createdAt: string;
  updatedAt: string;
  userRole: string;
}

export interface UserRestaurantDTO {
  id: string;
  name: string;
}

import { type Restaurant } from "./restaurant.model";

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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

import { DefaultSession } from "next-auth";

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

import { CreateUserDTO } from "../../../apps/backoffice/src/models/user.model";
import { v4 as uuidv4 } from "uuid";

export const users = [
  {
    email: "jhon@doe.com",
    password: "123456",
    first_name: "Jhon",
    last_name: "Doe",
    restaurantIds: [],
    id: uuidv4(),
    provider: "google",
  },
];

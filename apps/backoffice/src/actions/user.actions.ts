"use server";

import { CreateUserDTO } from "src/models/user.model";
import prisma from "database";
import { hashPassword } from "src/utils/bcrypt";
import { v4 as uuidv4 } from "uuid";
export async function createUser(user: CreateUserDTO) {
  try {
    const alreadyExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (alreadyExists) {
      throw new Error("User already exists");
    }

    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        email: user.email,
        password: await hashPassword(user.password),
        first_name: user.firstName,
        last_name: user.lastName,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

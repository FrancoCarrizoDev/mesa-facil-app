"use server";

import { CreateUserDTO } from "src/models/user.model";
import prisma from "database";
import { hashPassword } from "src/utils/bcrypt";
import { v4 as uuidv4 } from "uuid";
import { ROLES } from "@/constants/roles";
import getSession from "@/utils/get-session";
import { hasManageUsersPermission } from "@/utils/permissions";
export async function createRootUser(user: CreateUserDTO) {
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
        provider: "credentials",
        user_role: ROLES.ADMIN.ID,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(user: CreateUserDTO) {
  try {
    const session = await getSession();
    if (!session) throw new Error("User not logged in");

    const hasPermission = hasManageUsersPermission(session.user.role);
    if (!hasPermission) throw new Error("User not authorized");

    const alreadyExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (alreadyExists) {
      throw new Error("User already exists");
    }

    // ensure that the restaurants belong to the user

    if (!user.restaurantIds) throw new Error("Restaurant not found");

    const restaurants = await prisma.restaurant.findMany({
      where: {
        users: {
          some: {
            id: session.user.id,
          },
        },
        id: {
          in: user.restaurantIds,
        },
      },
    });

    if (restaurants.length !== user.restaurantIds.length) {
      throw new Error("Restaurant not found");
    }

    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        email: user.email,
        password: await hashPassword(user.password),
        first_name: user.firstName,
        last_name: user.lastName,
        provider: "credentials",
        user_role: ROLES.ADMIN.ID,
        user_root_id: session.user.id,
        restaurants: {
          connect: restaurants.map((restaurant) => ({
            id: restaurant.id,
          })),
        },
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

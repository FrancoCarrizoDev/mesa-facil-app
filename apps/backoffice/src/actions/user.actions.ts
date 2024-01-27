"use server";

import { CreateUserDTO, User, UserDTO } from "src/models/user.model";
import prisma from "database";
import { hashPassword } from "src/utils/bcrypt";
import { v4 as uuidv4 } from "uuid";
import { ROLES } from "@/constants/roles";
import getSession from "@/utils/get-session";
import { hasManageUsersPermission } from "@/utils/permissions";
import { revalidatePath } from "next/cache";

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
        user_role: user.role,
        user_root_id: session.user.id,
        restaurants: {
          connect: restaurants.map((restaurant) => ({
            id: restaurant.id,
          })),
        },
      },
    });

    revalidatePath("/private/users");
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserList(): Promise<UserDTO[]> {
  try {
    const session = await getSession();
    if (!session) throw new Error("User not logged in");

    const hasPermission = hasManageUsersPermission(session.user.role);
    if (!hasPermission) throw new Error("User not authorized");

    // if the user is a root user, return all users with root id
    if (session.user.role === ROLES.ADMIN.ID) {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              user_root_id: session.user.id,
            },
            {
              id: session.user.id,
            },
          ],
        },
        select: {
          id: true,
          provider: true,
          email: true,
          first_name: true,
          last_name: true,
          created_at: true,
          updated_at: true,
          user_role: true,
          restaurants: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return users.map((user) => ({
        id: user.id,
        provider: user.provider,
        email: user.email,
        firsName: user.first_name,
        lastName: user.last_name,
        restaurants: user.restaurants,
        createdAt: user.created_at.toISOString(),
        updatedAt: user.updated_at.toISOString(),
        userRole: user.user_role,
      }));
    }
    // if the user is a manager, return all users with the same restaurants

    const userWithRestaurants = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        restaurants: true,
      },
    });

    const users = await prisma.user.findMany({
      where: {
        user_root_id: session.user.user_root_id,
        restaurants: {
          some: {
            id: {
              in: userWithRestaurants?.restaurants.map(
                (restaurant) => restaurant.id
              ),
            },
          },
        },
      },
      select: {
        id: true,
        provider: true,
        email: true,
        first_name: true,
        last_name: true,
        created_at: true,
        updated_at: true,
        user_role: true,
        restaurants: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return users.map((user) => ({
      id: user.id,
      provider: user.provider,
      email: user.email,
      firsName: user.first_name,
      lastName: user.last_name,
      restaurants: user.restaurants,
      createdAt: user.created_at.toISOString(),
      updatedAt: user.updated_at.toISOString(),
      userRole: user.user_role,
    }));
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

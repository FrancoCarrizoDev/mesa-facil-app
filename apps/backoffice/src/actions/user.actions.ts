"use server";

import {
  CreateUserDTO,
  USER_STATUS,
  UpdateUserDTO,
  UserDTO,
} from "@repo/common/models";
import prisma from "database";
import { hashPassword } from "@repo/common/bcrypt";
import uuid from "@repo/common/uuid";
import { ROLES } from "@repo/common/constants";
import getSession from "@/utils/get-session";
import { hasManageUsersPermission } from "@/utils/permissions";
import { revalidatePath } from "next/cache";

export async function createRootUser(user: CreateUserDTO) {
  // try {
  //   const alreadyExists = await prisma.admin.findUnique({
  //     where: {
  //       email: user.email,
  //     },
  //   });
  //   if (alreadyExists) {
  //     throw new Error("User already exists");
  //   }
  //   const newUser = await prisma.admin.create({
  //     data: {
  //       id: uuid(),
  //       email: user.email,
  //       password: await hashPassword(user.password),
  //       first_name: user.firstName,
  //       last_name: user.lastName,
  //       provider: "credentials",
  //       role_id: ROLES.ADMIN.id,
  //     },
  //   });
  //   return newUser;
  // } catch (error) {
  //   console.log(error);
  // }
}

export async function createUser(user: CreateUserDTO): Promise<void> {
  try {
    const alreadyExists = await prisma.user.findUnique({
      where: {
        username: user.email,
      },
    });
    if (alreadyExists) {
      throw new Error("User already exists");
    }

    const restaurants = await prisma.restaurant.findMany({
      where: {
        users: {
          some: {
            id: user.root_user_id!,
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
    await prisma.user.create({
      data: {
        id: uuid(),
        email: user.email,
        password: await hashPassword(user.password),
        username: user.username,
        role_id: user.userRoleId,
        user_root_id: user.root_user_id,
        restaurants: {
          connect: restaurants.map((restaurant) => ({
            id: restaurant.id,
          })),
        },
      },
    });
    revalidatePath("/private/users");
  } catch (error) {
    console.log(error);
  }
}

export async function getUserListByAdmin(userId: string): Promise<UserDTO[]> {
  try {
    // if the user is a root user, return all users with root id

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            user_root_id: userId,
          },
          {
            id: userId,
          },
        ],
      },
      select: {
        id: true,
        email: true,
        username: true,
        created_at: true,
        updated_at: true,
        role_id: true,
        active: true,
        last_login: true,
        user_root_id: true,
        restaurants: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        updated_at: "desc",
      },
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      username: user.username,
      restaurants: user.restaurants,
      createdAt: user.created_at.toISOString(),
      updatedAt: user.updated_at.toISOString(),
      userRoleId: user.role_id,
      active: user.active,
      lastLogin: user.last_login?.toISOString() || null,
      userRootId: user.user_root_id,
    }));

    // if the user is a manager, return all users with the same restaurants
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getUserListByManager(
  userId: string,
  userRootId: string
): Promise<UserDTO[]> {
  const userWithRestaurants = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      restaurants: true,
    },
  });

  const users = await prisma.user.findMany({
    where: {
      user_root_id: userRootId,
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
      email: true,
      username: true,
      created_at: true,
      updated_at: true,
      role_id: true,
      active: true,
      last_login: true,
      user_root_id: true,
      restaurants: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  return users.map((user) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    restaurants: user.restaurants,
    createdAt: user.created_at.toISOString(),
    updatedAt: user.updated_at.toISOString(),
    userRoleId: user.role_id,
    active: user.active,
    lastLogin: user.last_login?.toISOString() || null,
    userRootId: user.user_root_id,
  }));
}

export async function editUserStatus({
  id,
  status,
}: {
  id: string;
  status: (typeof USER_STATUS)[keyof typeof USER_STATUS];
}) {
  try {
    const session = await getSession();
    if (!session) throw new Error("User not logged in");

    const hasPermission = hasManageUsersPermission(session.user.role);
    if (!hasPermission) throw new Error("User not authorized");

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error("User not found");

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: status === USER_STATUS.ACTIVE,
      },
    });

    revalidatePath("/private/users");
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getUserByEmail(email: string): Promise<UserDTO> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        created_at: true,
        updated_at: true,
        role_id: true,
        active: true,
        last_login: true,
        user_root_id: true,
        restaurants: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      restaurants: user.restaurants,
      createdAt: user.created_at.toISOString(),
      updatedAt: user.updated_at.toISOString(),
      userRoleId: user.role_id,
      active: user.active,
      lastLogin: user.last_login?.toISOString() || null,
      userRootId: user.user_root_id,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function editUser(user: UpdateUserDTO): Promise<void> {
  try {
    const userToUpdate = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!userToUpdate) throw new Error("User not found");

    const restaurants = await prisma.restaurant.findMany({
      where: {
        users: {
          some: {
            id: user.root_user_id || user.id,
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

    if (user.changePassword) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email: user.email,
          username: user.username,
          role_id: user.userRoleId,
          password: await hashPassword(user.password),
          restaurants: {
            connect: restaurants.map((restaurant) => ({
              id: restaurant.id,
            })),
          },
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email: user.email,
          username: user.username,
          role_id: user.userRoleId,
          restaurants: {
            connect: restaurants.map((restaurant) => ({
              id: restaurant.id,
            })),
          },
        },
      });
    }

    revalidatePath("/private/users");
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

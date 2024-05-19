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

export async function createUser(user: CreateUserDTO) {
  // try {
  //   const session = await getSession();
  //   if (!session) throw new Error("User not logged in");
  //   const hasPermission = hasManageUsersPermission(session.user.role.id);
  //   if (!hasPermission) throw new Error("User not authorized");
  //   const alreadyExists = await prisma.user.findUnique({
  //     where: {
  //       username: user.email,
  //     },
  //   });
  //   if (alreadyExists) {
  //     throw new Error("User already exists");
  //   }
  //   // ensure that the restaurants belong to the user
  //   if (!user.restaurantIds) throw new Error("Restaurant not found");
  //   const restaurants = await prisma.restaurant.findMany({
  //     where: {
  //       users: {
  //         some: {
  //           id: session.user.id,
  //         },
  //       },
  //       id: {
  //         in: user.restaurantIds,
  //       },
  //     },
  //   });
  //   if (restaurants.length !== user.restaurantIds.length) {
  //     throw new Error("Restaurant not found");
  //   }
  //   const newUser = await prisma.user.create({
  //     data: {
  //       id: uuid(),
  //       email: user.email,
  //       password: await hashPassword(user.password),
  //       first_name: user.firstName,
  //       last_name: user.lastName,
  //       provider: "credentials",
  //       user_role: user.role,
  //       user_root_id: session.user.id,
  //       restaurants: {
  //         connect: restaurants.map((restaurant) => ({
  //           id: restaurant.id,
  //         })),
  //       },
  //     },
  //   });
  //   revalidatePath("/private/users");
  //   return newUser;
  // } catch (error) {
  //   console.log(error);
  // }
}

export async function getUserListByAdmin(userId: string): Promise<UserDTO[]> {
  try {
    // if the user is a root user, return all users with root id

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            created_by_id: userId,
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
    }));

    // if the user is a manager, return all users with the same restaurants
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

// export async function getUserListByManager(userId: string): Promise<UserDTO[]> {
//   const userWithRestaurants = await prisma.user.findUnique({
//     where: {
//       id: session.user.id,
//     },
//     include: {
//       restaurants: true,
//     },
//   });

//   const users = await prisma.user.findMany({
//     where: {
//       user_root_id: session.user.user_root_id,
//       restaurants: {
//         some: {
//           id: {
//             in: userWithRestaurants?.restaurants.map(
//               (restaurant) => restaurant.id
//             ),
//           },
//         },
//       },
//     },
//     select: {
//       id: true,
//       provider: true,
//       email: true,
//       first_name: true,
//       last_name: true,
//       created_at: true,
//       updated_at: true,
//       user_role: true,
//       active: true,
//       restaurants: {
//         select: {
//           id: true,
//           name: true,
//         },
//       },
//     },
//     orderBy: {
//       updated_at: "desc",
//     },
//   });

//   return users.map((user) => ({
//     id: user.id,
//     provider: user.provider,
//     email: user.email,
//     firstName: user.first_name,
//     lastName: user.last_name || "SIN DATOS",
//     restaurants: user.restaurants,
//     status: user.active ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE,
//     createdAt: user.created_at.toISOString(),
//     updatedAt: user.updated_at.toISOString(),
//     userRole: user.user_role,
//   }));
// }

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
    const session = await getSession();
    if (!session) throw new Error("User not logged in");

    const hasPermission = hasManageUsersPermission(session.user.role);
    if (!hasPermission) throw new Error("User not authorized");

    const user = await prisma.user.findUnique({
      where: {
        email: email,
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
        active: true,
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
      provider: user.provider,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name || "SIN DATOS",
      restaurants: user.restaurants,
      status: user.active ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE,
      createdAt: user.created_at.toISOString(),
      updatedAt: user.updated_at.toISOString(),
      userRole: user.user_role,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function editUser(user: UpdateUserDTO) {
  try {
    const session = await getSession();
    if (!session) throw new Error("User not logged in");

    const hasPermission = hasManageUsersPermission(session.user.role);
    if (!hasPermission) throw new Error("User not authorized");

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

    if (user.changePassword) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          user_role: user.role,
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
          first_name: user.firstName,
          last_name: user.lastName,
          user_role: user.role,
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

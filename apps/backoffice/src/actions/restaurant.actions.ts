"use server";
import getSession from "@/utils/get-session";
import prisma from "database";
import { getServerSession } from "next-auth";
import { RestaurantDTO } from "src/models/restaurant.model";
import { authOptions } from "src/utils/auth-options";
import uuid from "@repo/common/uuid";
import slugify from "@repo/common/slugify";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function getRestaurantsNameByUser() {
  const session = await getServerSession(authOptions);

  if (!session) return [];

  const { id } = session.user;

  const restaurants = await prisma.restaurant.findMany({
    where: {
      users: {
        some: {
          id: id,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return restaurants;
}

export async function getRestaurantsByUser(): Promise<RestaurantDTO[]> {
  const session = await getSession();

  if (!session) throw new Error("User not loggqged in");

  const { id } = session.user;

  const restaurants = await prisma.restaurant.findMany({
    where: {
      users: {
        some: {
          id: id,
        },
      },
    },
    include: {
      attention_schedule: true,
    },
  });

  return restaurants.map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    slug: restaurant.slug,
    phone: restaurant.phone,
    attentionSchedule: restaurant.attention_schedule.map((schedule) => ({
      id: schedule.id,
      dayName: schedule.day_name,
      dayNumber: schedule.day_number,
      openingHours: schedule.opening_hours,
      endingHours: schedule.ending_hours,
      restaurantId: schedule.restaurant_id,
    })),
  }));
}

export async function createRestaurant(restaurant: RestaurantDTO) {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }

  try {
    const newRestaurantId = uuid();
    await prisma.restaurant.create({
      data: {
        id: newRestaurantId,
        name: restaurant.name,
        slug: slugify(restaurant.name),
        address: restaurant.address,
        phone: restaurant.phone,
        attention_schedule: {
          createMany: {
            data: restaurant.attentionSchedule.map((schedule) => ({
              id: uuid(),
              opening_hours: schedule.openingHours,
              ending_hours: schedule.endingHours,
              day_name: schedule.dayName,
              day_number: schedule.dayNumber,
            })),
          },
        },
        users: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    revalidatePath("/private/restaurants");
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function updateRestaurant(restaurant: RestaurantDTO) {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }

  try {
    await prisma.restaurant.update({
      where: {
        id: restaurant.id,
      },
      data: {
        name: restaurant.name,
        address: restaurant.address,
        phone: restaurant.phone,
        attention_schedule: {
          deleteMany: {},
          createMany: {
            data: restaurant.attentionSchedule.map((schedule) => ({
              id: uuid(),
              opening_hours: schedule.openingHours,
              ending_hours: schedule.endingHours,
              day_name: schedule.dayName,
              day_number: schedule.dayNumber,
            })),
          },
        },
      },
    });

    revalidatePath("/private/restaurants");
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getRestaurantBySlug(
  slug: string
): Promise<RestaurantDTO> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug: slug,
        users: {
          some: {
            id: session.user.id,
          },
        },
      },
      include: {
        attention_schedule: true,
      },
    });

    if (restaurant)
      return {
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        slug: restaurant.slug,
        phone: restaurant.phone,
        attentionSchedule: restaurant.attention_schedule.map((schedule) => ({
          id: schedule.id,
          dayName: schedule.day_name,
          dayNumber: schedule.day_number,
          openingHours: schedule.opening_hours,
          endingHours: schedule.ending_hours,
          restaurantId: schedule.restaurant_id,
        })),
      };

    return notFound();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getRestaurantListToUserAssing(): Promise<
  {
    id: string;
    name: string;
  }[]
> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }

  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        users: {
          some: {
            id: session.user.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return restaurants.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name,
    }));
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

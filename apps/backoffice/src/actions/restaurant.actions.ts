"use server";

import prisma from "database";
import { RestaurantDTO } from "@repo/common/models";
import { authOptions } from "src/utils/auth-options";
import { generateUUID } from "@repo/common/uuid";
import { slugifyString } from "@repo/common/slugify";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import getSession from "@/utils/get-session";

export async function getRestaurantsByUserId(
  id: string
): Promise<RestaurantDTO[]> {
  const restaurants = await prisma.restaurant.findMany({
    where: {
      OR: [
        {
          users: {
            some: {
              id,
            },
          },
        },
      ],
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

export async function createRestaurant(
  restaurant: RestaurantDTO
): Promise<void> {
  const session = await getSession();

  try {
    const newRestaurantId = generateUUID();
    await prisma.restaurant.create({
      data: {
        id: newRestaurantId,
        name: restaurant.name,
        slug: slugifyString(restaurant.name),
        address: restaurant.address,
        phone: restaurant.phone,
        attention_schedule: {
          createMany: {
            data: restaurant.attentionSchedule.map((schedule) => ({
              id: generateUUID(),
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
              id: generateUUID(),
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
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug: slug,
        users: {
          // some: {
          //   id: session.user.id,
          // },
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
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        users: {
          some: {
            // id: session.user.id,
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

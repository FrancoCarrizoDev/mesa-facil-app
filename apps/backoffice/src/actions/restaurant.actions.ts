"use server";
import getSession from "@/utils/get-session";
import prisma from "database";
import { getServerSession } from "next-auth";
import { RestaurantDTO } from "src/models/restaurant.model";
import { authOptions } from "src/utils/auth-options";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

export async function getRestaurantsNameByUser() {
  const session = await getServerSession(authOptions);

  if (!session) return [];

  const { id } = session.user;

  const restaurants = await prisma.restaurant.findMany({
    where: {
      user_id: id,
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
      user_id: id,
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
    const newRestaurantId = uuidv4();
    await prisma.restaurant.create({
      data: {
        id: newRestaurantId,
        name: restaurant.name,
        slug: slugify(restaurant.name, {
          lower: true,
          remove: /[*+~.()'"!:@]/g,
        }),
        address: restaurant.address,
        phone: restaurant.phone,
        user_id: session.user.id,
        attention_schedule: {},
      },
    });

    for (const schedule of restaurant.attentionSchedule) {
      await prisma.attentionSchedule.create({
        data: {
          id: uuidv4(),
          opening_hours: schedule.openingHours,
          ending_hours: schedule.endingHours,
          day_name: schedule.dayName,
          day_number: schedule.dayNumber,
          restaurant_id: newRestaurantId,
        },
      });
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getRestaurantById(
  id: string
): Promise<RestaurantDTO | null> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: id,
        user_id: session.user.id,
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

    return null;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

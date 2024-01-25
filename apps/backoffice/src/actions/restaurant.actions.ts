import getSession from "@/utils/get-session";
import prisma from "database";
import { getServerSession } from "next-auth";
import { RestaurantDTO } from "src/models/restaurant.model";
import { authOptions } from "src/utils/auth-options";

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

  if (!session) return [];

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
      day_name: schedule.day_name,
      day_number: schedule.day_number,
      opening_hours: schedule.opening_hours,
      ending_hours: schedule.ending_hours,
      restaurant_id: schedule.restaurant_id,
    })),
  }));
}

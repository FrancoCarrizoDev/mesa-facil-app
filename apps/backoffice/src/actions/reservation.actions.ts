"use server";

import {
  CreateReservationDTO,
  ReservationDTO,
  ReservationStatusEnum,
} from "@/models/reservation.model";
import getSession from "@/utils/get-session";
import { notFound } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function createReserve(
  reserve: CreateReservationDTO
): Promise<void> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }

  try {
    await prisma?.reservation.create({
      data: {
        id: uuidv4(),
        attention_schedule_id: reserve.attentionScheduleId,
        date: new Date(reserve.date).toISOString(),
        diner_id: reserve.dinerId,
        people_quantity: reserve.peopleQuantity,
        message: reserve.message,
        status_id: ReservationStatusEnum.PENDING,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error creating reserve");
  }
}

export async function getReservationList(
  restaurantSlug: string
): Promise<ReservationDTO[]> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }

  try {
    const reservations = await prisma?.reservation.findMany({
      where: {
        attention_schedule: {
          restaurant: {
            slug: restaurantSlug,
          },
        },
      },
      include: {
        diner: true,
      },
    });

    if (!reservations) return [];

    const reservationList: ReservationDTO[] = reservations.map(
      ({
        id,
        date,
        diner,
        people_quantity,
        message,
        status_id,
        created_at,
        updated_at,
      }) => ({
        id: id,
        date: date,
        diner: {
          id: diner.id,
          firstName: diner.first_name,
          lastName: diner.last_name,
          phone: diner.phone,
          birthday: diner.birthday,
          email: diner.email,
        },
        peopleQuantity: people_quantity,
        message,
        statusId: status_id,
        createdAt: created_at,
        updatedAt: updated_at,
      })
    );

    return reservationList;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting reservation list");
  }
}

export async function ensureLoggedUserBelongsToRestaurant(
  restaurantSlug: string
): Promise<void> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }

  const restaurant = await prisma?.restaurant.findFirst({
    where: {
      slug: restaurantSlug,
      users: {
        some: {
          id: session.user.id,
        },
      },
    },
  });

  if (!restaurant) {
    notFound();
  }
}
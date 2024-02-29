"use server";

import {
  CreateReservationDTO,
  ReservationDTO,
  ReservationStatusEnum,
} from "@/models/reservation.model";
import getSession from "@/utils/get-session";
import { addDays } from "date-fns";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import type { SearchReservationParams } from "src/app/(home)/private/restaurants/[slug]/reservations/page";
import { v4 as uuidv4 } from "uuid";

function getReservationStatusBySearchKeyLabel(searchKey: string) {
  switch (searchKey) {
    case "pending":
      return ReservationStatusEnum.PENDING;
    case "confirmed":
      return ReservationStatusEnum.CONFIRMED;
    case "canceled":
      return ReservationStatusEnum.CANCELED;
    case "rejected":
      return ReservationStatusEnum.REJECTED;
    default:
      return null;
  }
}

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

    revalidatePath(`/private/restaurants`);
  } catch (error) {
    console.log(error);
    throw new Error("Error creating reserve");
  }
}

export async function getReservationList(
  restaurantSlug: string,
  searchParams: SearchReservationParams
): Promise<ReservationDTO[]> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }
  const status = getReservationStatusBySearchKeyLabel(searchParams.status);

  console.log({
    date: {
      gte: searchParams.date,
      lte: searchParams.date
        ? addDays(new Date(searchParams.date), 1).toISOString()
        : undefined,
    },
  });

  try {
    const reservations = await prisma?.reservation.findMany({
      where: {
        attention_schedule: {
          restaurant: {
            slug: restaurantSlug,
          },
        },
        diner: {
          OR: [
            {
              first_name: {
                contains: searchParams.term,
              },
            },
            {
              last_name: {
                contains: searchParams.term,
              },
            },
            {
              email: {
                contains: searchParams.term,
              },
            },
          ],
        },
        status_id: status ? status : undefined,
        date: {
          gte: searchParams.date,
          lte: searchParams.date
            ? addDays(new Date(searchParams.date), 1).toISOString()
            : undefined,
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

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
import uuid from "@repo/common/uuid";
import { PaginationDTO } from "../models/pagination.model";

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
        id: uuid(),
        attention_schedule_id: reserve.attentionScheduleId,
        date: new Date(reserve.date).toISOString(),
        diner_id: reserve.dinerId,
        people_quantity: reserve.peopleQuantity,
        message: reserve.message,
        status_id: reserve.reservationStatusId,
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
): Promise<PaginationDTO<ReservationDTO[]>> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }
  const status = getReservationStatusBySearchKeyLabel(searchParams.status);

  console.log({
    searchParams,
  });

  try {
    const submission = await prisma?.$transaction([
      prisma?.reservation.findMany({
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
        skip:
          searchParams.page === 1
            ? 0
            : (searchParams.page - 1) * searchParams.pageSize,
        take: searchParams.pageSize,
      }),
      prisma?.reservation.count({
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
      }),
    ]);

    if (!submission)
      return {
        page: searchParams.page,
        pageSize: searchParams.pageSize,
        total: 0,
        data: [],
      };

    const reservationList: ReservationDTO[] = submission[0].map(
      ({
        id,
        date,
        diner,
        people_quantity,
        message,
        status_id,
        created_at,
        updated_at,
        table_number,
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
        tableNumber: table_number,
      })
    );

    return {
      page: searchParams.page,
      pageSize: searchParams.pageSize,
      total: submission[1],
      data: reservationList,
    };
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

export async function getReservationById(id: string): Promise<ReservationDTO> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }

  const reservation = await prisma?.reservation.findUnique({
    where: {
      id: id,
    },
    include: {
      diner: true,
    },
  });

  if (!reservation) {
    notFound();
  }

  return {
    id: reservation.id,
    date: reservation.date,
    diner: {
      id: reservation.diner.id,
      firstName: reservation.diner.first_name,
      lastName: reservation.diner.last_name,
      phone: reservation.diner.phone,
      birthday: reservation.diner.birthday,
      email: reservation.diner.email,
    },
    tableNumber: reservation.table_number,
    peopleQuantity: reservation.people_quantity,
    message: reservation.message,
    statusId: reservation.status_id,
    createdAt: reservation.created_at,
    updatedAt: reservation.updated_at,
  };
}

export async function updateReservationStatus({
  id,
  status,
  tableNumber,
}: {
  id: string;
  status: ReservationStatusEnum;
  tableNumber?: number | null;
}): Promise<void> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }

  try {
    await prisma?.reservation.update({
      where: {
        id: id,
      },
      data: {
        status_id: status,
        table_number: tableNumber,
      },
    });

    revalidatePath(`/private/restaurants`);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating reservation status");
  }
}

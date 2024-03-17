"use server";

import getSession from "@/utils/get-session";
import type { DinerDTO } from "@repo/common/models";
import uuid from "@repo/common/uuid";
import prisma from "database";

export async function getDinerByEmail(email: string): Promise<DinerDTO[]> {
  const diner = await prisma.diner.findMany({
    where: {
      email: {
        contains: email.toLowerCase(),
      },
    },
    include: {
      reservation: true,
    },
  });

  if (diner.length > 0) {
    return diner.map((mapDiner) => ({
      id: mapDiner.id,
      firstName: mapDiner.first_name,
      lastName: mapDiner.last_name,
      phone: mapDiner.phone,
      email: mapDiner.email,
      birthday: mapDiner.birthday,
      reservations: mapDiner.reservation.map((reservation) => ({
        id: reservation.id,
        date: reservation.date,
        peopleQuantity: reservation.people_quantity,
        attentionScheduleId: reservation.attention_schedule_id,
        restaurantId: reservation.id,
        dinerId: reservation.diner_id,
        created_at: reservation.created_at,
        updated_at: reservation.updated_at,
        message: reservation.message,
        reservationStatusId: reservation.status_id,
      })),
    }));
  }

  return [];
}

export async function createDiner(diner: DinerDTO): Promise<DinerDTO> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not loggqged in");
  }

  try {
    const newDiner = await prisma.diner.create({
      data: {
        id: uuid(),
        first_name: diner.firstName,
        last_name: diner.lastName,
        phone: diner.phone,
        email: diner.email,
        birthday: diner.birthday,
      },
    });

    return {
      id: newDiner.id,
      firstName: newDiner.first_name,
      lastName: newDiner.last_name,
      phone: newDiner.phone,
      email: newDiner.email,
      birthday: newDiner.birthday,
      reservations: [],
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error creating diner");
  }
}

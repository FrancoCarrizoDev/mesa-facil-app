"use server";

import { DinerDTO } from "@/models/diner.model";
import { getSession } from "next-auth/react";

export async function getDinerByEmail(email: string): Promise<DinerDTO[]> {
  const diner = await prisma?.diner.findMany({
    where: {
      email: {
        contains: email.toLowerCase(),
      },
    },
    include: {
      reservation: true,
    },
  });

  if (diner) {
    return diner.map((diner) => ({
      id: diner.id,
      firstName: diner.first_name,
      lastName: diner.last_name,
      phone: diner.phone,
      email: diner.email,
      birthday: diner.birthday,
      reservations: diner.reservation.map((reservation) => ({
        id: reservation.id,
        date: reservation.date,
        peopleQuantity: reservation.people_quantity,
        attentionScheduleId: reservation.attention_schedule_id,
        restaurantId: reservation.id,
        dinerId: reservation.diner_id,
        created_at: reservation.created_at,
        updated_at: reservation.updated_at,
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
    const newDiner = await prisma?.diner.create({
      data: {
        id: diner.id,
        first_name: diner.firstName,
        last_name: diner.lastName,
        phone: diner.phone,
        email: diner.email,
        birthday: diner.birthday,
      },
    });

    if (!newDiner) {
      throw new Error("Error creating diner");
    }

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

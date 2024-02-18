"use server";

import { DinerDTO } from "@/models/diner.model";

export default async function getDinnerByEmail(
  email: string
): Promise<DinerDTO[]> {
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

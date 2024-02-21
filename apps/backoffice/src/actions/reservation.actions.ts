"use server";

import { DinerDTO } from "@/models/diner.model";
import {
  ReservationDTO,
  ReservationStatusEnum,
} from "@/models/reservation.model";
import getSession from "@/utils/get-session";
import { v4 as uuidv4 } from "uuid";

export async function createReserve(reserve: ReservationDTO): Promise<void> {
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

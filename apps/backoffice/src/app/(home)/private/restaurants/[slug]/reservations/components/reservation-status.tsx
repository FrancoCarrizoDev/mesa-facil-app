"use client";
import {
  getReservationStatusLabelById,
  getReservationStatusLabelColorById,
} from "@/utils/reservations";

export default function ReservationStatus({ statusId }: { statusId: number }) {
  const reservationStatusLabelColor =
    getReservationStatusLabelColorById(statusId);
  return (
    <p className={`${reservationStatusLabelColor} font-semibold`}>
      {getReservationStatusLabelById(statusId)}
    </p>
  );
}

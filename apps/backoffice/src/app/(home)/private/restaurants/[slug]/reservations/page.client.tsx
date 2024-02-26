"use client";

import { ReservationDTO } from "@/models/reservation.model";
import { TableColumn } from "@repo/ui/data-table";

interface Props {
  reservationList: ReservationDTO[];
}

const columns: TableColumn[] = [
  { key: "date", header: "Fecha" },
  { key: "firstName", header: "Nombre" },
  { key: "lastName", header: "Apellido" },
  { key: "email", header: "Email" },
  { key: "statusId", header: "Estado de reserva" },
  { key: "createdAt", header: "Fecha Creación" },
  { key: "updatedAt", header: "Fecha Actualización" },
  { key: "date", header: "Fecha de reserva" },
  { key: "action", header: "Action" },
];

export default function ReservationClientPage({ reservationList }: Props) {
  return (
    <div>
      <code>{JSON.stringify(reservationList)}</code>
    </div>
  );
}

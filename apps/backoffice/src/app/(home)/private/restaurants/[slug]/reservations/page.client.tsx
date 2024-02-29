"use client";

import InputDatePicker from "@/components/InputDatePicker/input-date-picker";
import Link from "@/components/Link/link";
import Spinner from "@/components/Spinner/Spinner";
import useSearchReservation from "@/hooks/useSearchReservation";
import {
  ReservationDTO,
  ReservationStatusEnum,
} from "@/models/reservation.model";
import DataTable, { TableColumn, TableData } from "@repo/ui/data-table";
import Input from "@repo/ui/input";
import Select from "@repo/ui/select";
import { useState } from "react";

interface Props {
  reservationList: ReservationDTO[];
}

const columns: TableColumn[] = [
  { key: "firstName", header: "Nombre" },
  { key: "lastName", header: "Apellido" },
  { key: "date", header: "Fecha de reserva" },
  { key: "statusId", header: "Estado de reserva" },
  { key: "email", header: "Email" },
  { key: "message", header: "Nota" },
  { key: "createdAt", header: "Fecha Creación" },
  { key: "updatedAt", header: "Fecha Actualización" },
  { key: "action", header: "Action" },
];

export default function ReservationClientPage({ reservationList }: Props) {
  const { filters, onChangeDate, onChangeStatus, onChangeTerm, isDebouncing } =
    useSearchReservation();
  const tableData: TableData[] = reservationList.map((reservation) => {
    return {
      date: new Date(reservation.date).toLocaleString("es-ES"),
      firstName: reservation.diner.firstName,
      lastName: reservation.diner.lastName || "SIN/DATOS",
      email: reservation.diner.email,
      message: reservation.message || "SIN/DATOS",
      statusId: reservation.statusId,
      createdAt: new Date(reservation.createdAt).toLocaleString("es-ES"),
      updatedAt: new Date(reservation.updatedAt).toLocaleString("es-ES"),

      action: (
        <div className="flex items-center">
          <div className="flex items-center gap-1 min-w-[60px]">
            <Link href={`#`}>Ver</Link>
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="w-full">
      <div className="flex items-baseline gap-3 mb-3">
        <Input
          label="Buscar"
          placeholder="Buscar por nombre o email"
          onChange={(e) => onChangeTerm(e.target.value)}
          value={filters.term}
        />
        <Select
          label="Estado"
          onChange={(e) => onChangeStatus(e.target.value)}
          value={filters.status?.toString() || "0"}
          options={[
            { value: "all", label: "Todos" },
            { value: "pending", label: "Pendiente" },
            { value: "confirmed", label: "Confirmado" },
            { value: "canceled", label: "Cancelado" },
            { value: "rejected", label: "Rechadaza" },
          ]}
          size="small"
        />
        <InputDatePicker
          label="Fecha"
          placeholderText="Buscar por fecha"
          onChange={(date) => onChangeDate(date)}
          selectedDate={filters.date}
          required={false}
          error={false}
        />
        {isDebouncing && (
          <div className="h-full mt-auto pb-2">
            <Spinner size="sm" />
          </div>
        )}
      </div>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}

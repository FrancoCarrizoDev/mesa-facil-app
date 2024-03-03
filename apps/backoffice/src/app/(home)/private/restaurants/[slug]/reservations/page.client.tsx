"use client";

import InputDatePicker from "@/components/InputDatePicker/input-date-picker";
import Link from "@/components/Link/link";
import Spinner from "@/components/Spinner/Spinner";
import useSearchReservation from "@/hooks/useSearchReservation";
import {
  ReservationDTO,
  ReservationStatusEnum,
} from "@/models/reservation.model";
import {
  getReservationStatusLabelById,
  getReservationStatusLabelByType,
  getReservationStatusLabelColorById,
} from "@/utils/reservations";
import DataTable, { TableColumn, TableData } from "@repo/ui/data-table";
import Input from "@repo/ui/input";
import Select from "@repo/ui/select";
import { PaginationDTO } from "../../../../../../models/pagination.model";
import Button from "@repo/ui/button";
import CustomDropdownMenu from "@repo/ui/dropdown-menu";
import CustomChevronDownIcon from "@repo/ui/icons/chevron-down-icon";
import ReservationStatusLabel from "../../../../../../../../../packages/ui/src/reservation-status-label";

interface Props {
  paginatedReservation: PaginationDTO<ReservationDTO[]>;
}

const columns: TableColumn[] = [
  { key: "firstName", header: "Nombre" },
  { key: "lastName", header: "Apellido" },
  { key: "date", header: "Fecha de reserva" },
  { key: "statusId", header: "Estado de reserva" },
  { key: "message", header: "Nota" },
  { key: "createdAt", header: "Fecha Creación" },
  { key: "updatedAt", header: "Fecha Actualización" },
  { key: "action", header: "Action" },
];

export default function ReservationClientPage({ paginatedReservation }: Props) {
  const { filters, onChangeDate, onChangeStatus, onChangeTerm, isDebouncing } =
    useSearchReservation();

  console.log({ reservationList: paginatedReservation });
  const tableData: TableData[] = paginatedReservation.data.map(
    (reservation) => {
      return {
        date: (
          <p className="min-w-[150px]">
            {new Date(reservation.date).toLocaleString("es-ES")}
          </p>
        ),
        firstName: reservation.diner.firstName,
        lastName: reservation.diner.lastName || "SIN/DATOS",
        message: (
          <p className=" overflow-auto">{reservation.message || "SIN/DATOS"}</p>
        ),
        statusId: (
          <div className="flex items-center justify-between border gap-2 px-2 bg-gray-50 border-gray-300 p-1 rounded-sm  hover:bg-white hover:border-gray-200 min-w-[90px]">
            <ReservationStatusLabel
              label={getReservationStatusLabelById(reservation.statusId)}
              status={getReservationStatusLabelByType(reservation.statusId)}
            />
            <CustomDropdownMenu
              items={[
                {
                  label: "Pending",
                  onClick: () => console.log("Pending"),
                },
                {
                  label: "Confirm",
                  onClick: () => console.log("Pending"),
                },
                {
                  label: "Reject",
                  onClick: () => console.log("Pending"),
                },
              ]}
            >
              <div className="cursor-pointer">
                <CustomChevronDownIcon />
              </div>
            </CustomDropdownMenu>
          </div>
        ),
        createdAt: (
          <p className="min-w-[150px]">
            {new Date(reservation.createdAt).toLocaleString("es-ES")}
          </p>
        ),
        updatedAt: (
          <p className="min-w-[150px]">
            {new Date(reservation.updatedAt).toLocaleString("es-ES")}
          </p>
        ),
        action: (
          <div className="flex items-center">
            <div className="flex w-full  items-center gap-3">
              <Link href={`./reservations/${reservation.id}`}>Editar</Link>
            </div>
          </div>
        ),
      };
    }
  );

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
          dateFormat="dd/MM/yyyy"
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

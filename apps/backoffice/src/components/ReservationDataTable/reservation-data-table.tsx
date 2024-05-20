"use client";

import {
  ReservationStatusEnum,
  type ReservationDTO,
  type PaginationDTO,
} from "@repo/common/models";
import {
  getReservationStatusLabelById,
  getReservationStatusLabelByType,
} from "@/utils/reservations";
import { DialogContext } from "src/context/dialog/dialog.context";
import { useContext, useMemo } from "react";
import ChangeReservationStatusContainer from "@/components/ChangeReservationStatusContainer/change-reservation-status-container";
import CheckIcon from "@repo/ui/icons/check-icon";
import CrossIcon from "@repo/ui/icons/cross-icon";
import CustomChevronDownIcon from "@repo/ui/icons/chevron-down-icon";
import CustomDropdownMenu from "@repo/ui/dropdown-menu";
import DataTable, { TableColumn, TableData } from "@repo/ui/data-table";
import Input from "@repo/ui/input";
import InputDatePicker from "@repo/ui/input-date-picker";
import Link from "@/components/Link/link";
import QuestionIcon from "@repo/ui/icons/question-icon";
import RemoveIcon from "@repo/ui/icons/remove-icon";
import ReservationStatusLabel from "@repo/ui/reservation-status-label";
import Select from "@repo/ui/select";
import Spinner from "@/components/Spinner/Spinner";
import StopwatchIcon from "@repo/ui/icons/stop-watch-icon";
import Tooltip from "@repo/ui/tooltip";
import useSearchReservation, {
  ReservationParamsProps,
} from "@/hooks/useSearchReservation";

interface Props {
  paginatedReservation: PaginationDTO<ReservationDTO[]>;
  reservationParamsProps: ReservationParamsProps;
  restaurantSlug: string;
}

const columns: TableColumn[] = [
  { key: "fullName", header: "Comensal" },
  { key: "date", header: "Fecha de reserva" },
  {
    key: "statusId",
    header: (
      <Tooltip label="Puede cambiar los estados con los selectores.">
        <div className="flex items-center">
          <p>Estado de reserva</p>
          <QuestionIcon />
        </div>
      </Tooltip>
    ),
  },
  { key: "tableNumber", header: "Mesa Asignada" },
  { key: "message", header: "Nota" },
  { key: "createdAt", header: "Fecha Creación" },
  { key: "updatedAt", header: "Fecha Actualización" },
  { key: "action", header: "Action" },
];

const reservationStatusSelectItems = [
  {
    label: "Pendiente",
    value: ReservationStatusEnum.PENDING,
    icon: <StopwatchIcon className="text-yellow-500" />,
    dialog: {
      title: "Volver reserva a pendiente",
      description: (dinerFullName: string) =>
        `¿Está seguro de volver a pendiente la reserva de ${dinerFullName}?`,
    },
  },
  {
    label: "Aceptado",
    value: ReservationStatusEnum.CONFIRMED,
    icon: <CheckIcon className="text-green-500" />,
    dialog: {
      title: "Confirmar reserva",
      description: (dinerFullName: string) =>
        `¿Está seguro de confirmar la reserva de ${dinerFullName}? Ingrese un número de mesa para asignar al comensal.`,
    },
  },
  {
    label: "Rechazado",
    value: ReservationStatusEnum.REJECTED,
    icon: <CrossIcon className="text-red-400" />,
    dialog: {
      title: "Rechazar reserva",
      description: (dinerFullName: string) =>
        `¿Está seguro de rechazar la reserva de ${dinerFullName}?`,
    },
  },
  {
    label: "Cancelado",
    value: ReservationStatusEnum.CANCELED,
    icon: <RemoveIcon className="text-red-400" />,
    dialog: {
      title: "Cancelar reserva",
      description: (dinerFullName: string) =>
        `¿Está seguro de cancelar la reserva de ${dinerFullName}?`,
    },
  },
];

export default function ReservationDataTable({
  paginatedReservation,
  reservationParamsProps,
  restaurantSlug,
}: Props): JSX.Element {
  const {
    filters,
    onChangeDateFrom,
    onChangeStatus,
    onChangeTerm,
    isDebouncing,
    onChangeDateTo,
  } = useSearchReservation({
    page: reservationParamsProps.page,
    pageSize: reservationParamsProps.pageSize,
    status: reservationParamsProps.status,
    dateFrom: reservationParamsProps.dateFrom,
    dateTo: reservationParamsProps.dateTo,
    term: reservationParamsProps.term,
  });
  const { openDialog } = useContext(DialogContext);

  const tableData: TableData[] = useMemo(
    () =>
      paginatedReservation.data.map((reservation) => {
        return {
          date: (
            <p className="min-w-[150px]">
              {new Date(reservation.date).toLocaleString("es-ES")}
            </p>
          ),
          fullName: (
            <p>
              {`${reservation.diner.firstName} ${
                reservation.diner.lastName || "SIN/DATOS"
              }`}
            </p>
          ),
          tableNumber: <p>{reservation.tableNumber || "SIN/DATOS"}</p>,
          message: (
            <p className="text-balance" style={{ height: "inherit" }}>
              {reservation.message || "SIN/DATOS"}
            </p>
          ),
          statusId: (
            <CustomDropdownMenu
              items={reservationStatusSelectItems.map((status) => {
                return {
                  label: (
                    <div className="w-full flex items-center justify-between">
                      <p className="min-w-[60px] font-medium">{status.label}</p>
                      <span>{status.icon}</span>
                    </div>
                  ),
                  onClick: async () => {
                    return openDialog({
                      content: (
                        <ChangeReservationStatusContainer
                          reservationId={reservation.id}
                          reservationStatusId={status.value}
                          title={status.dialog.title}
                          description={status.dialog.description(
                            `${reservation.diner.firstName} ${
                              reservation.diner.lastName || "SIN/DATOS"
                            }`
                          )}
                        />
                      ),
                    });
                  },
                  enabled: reservation.statusId !== status.value,
                };
              })}
            >
              <div className="flex items-center justify-between border gap-2 px-2 bg-gray-50 border-gray-300 p-1 rounded-sm   hover:border-gray-400 min-w-[120px] cursor-pointer">
                <ReservationStatusLabel
                  label={getReservationStatusLabelById(reservation.statusId)}
                  status={getReservationStatusLabelByType(reservation.statusId)}
                />
                <CustomChevronDownIcon />
              </div>
            </CustomDropdownMenu>
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
                <Link href={`${restaurantSlug}/reservations/${reservation.id}`}>
                  Editar
                </Link>
              </div>
            </div>
          ),
        };
      }),
    [paginatedReservation.data, restaurantSlug, openDialog]
  );

  return (
    <div className="w-full">
      <div className="flex items-baseline gap-3 mb-3">
        <Input
          label="Buscar"
          onChange={(e) => onChangeTerm(e.target.value)}
          placeholder="Buscar por nombre o email"
          value={filters.term}
        />
        <Select
          label="Estado"
          onChange={(e) => onChangeStatus(e.target.value)}
          value={filters.status?.toString() || "0"}
          size="small"
          options={[
            { value: "all", label: "Todos" },
            { value: "pending", label: "Pendiente" },
            { value: "confirmed", label: "Confirmado" },
            { value: "canceled", label: "Cancelado" },
            { value: "rejected", label: "Rechadaza" },
          ]}
        />
        <InputDatePicker
          label="Desde"
          placeholderText="Buscar por fecha"
          onChange={(date) => onChangeDateFrom(date)}
          selectedDate={filters.dateFrom}
          required={false}
          error={false}
          dateFormat="dd/MM/yyyy"
        />
        <InputDatePicker
          label="Hasta"
          placeholderText="Buscar por fecha"
          onChange={(date) => onChangeDateTo(date)}
          selectedDate={filters.dateTo}
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
      <DataTable
        pagination={{
          page: paginatedReservation.page,
          pageSize: paginatedReservation.pageSize,
          total: paginatedReservation.total,
        }}
        columns={columns}
        data={tableData}
      />
    </div>
  );
}

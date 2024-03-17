import { DinerDTO } from "./diner.model";

export interface CreateReservationDTO {
  readonly attentionScheduleId: string;
  readonly date: string;
  readonly dinerId: string;
  readonly peopleQuantity: number;
  readonly tableNumber?: number;
  readonly message: string | null;
  readonly reservationStatusId: number;
}

export interface ReservationDTO {
  readonly id: string;
  readonly date: string;
  readonly diner: DinerDTO;
  readonly peopleQuantity: number;
  readonly message: string | null;
  readonly tableNumber: number | null;
  readonly statusId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface ReservationListItemDTO {}

export enum ReservationStatusEnum {
  PENDING = 1,
  CONFIRMED = 2,
  CANCELED = 3,
  REJECTED = 4,
}

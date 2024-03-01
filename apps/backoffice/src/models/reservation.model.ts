import type { Diner } from "database";
import type { AttentionSchedule } from "./restaurant.model";
import { DinerDTO } from "./diner.model";

export interface Reservation {
  readonly id: string;
  readonly attention_schedule: AttentionSchedule;
  readonly attention_schedule_id: string;
  readonly diner: Diner;
  readonly diner_id: string;
  readonly date: string;
  readonly people_quantity: number;
  readonly message?: string;
  readonly reservation_status_id: ReservationStatus;
  readonly status_id: number;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export interface ReservationStatus {
  readonly id: number;
  readonly reservation: Reservation[];
  readonly status: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export interface CreateReservationDTO {
  readonly attentionScheduleId: string;
  readonly date: string;
  readonly dinerId: string;
  readonly peopleQuantity: number;
  readonly message: string | null;
  readonly reservationStatusId: number;
}

export interface ReservationDTO {
  readonly id: string;
  readonly date: string;
  readonly diner: DinerDTO;
  readonly peopleQuantity: number;
  readonly message: string | null;
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

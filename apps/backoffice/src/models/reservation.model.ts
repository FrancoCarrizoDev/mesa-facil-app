import type { Diner } from "database";
import type { AttentionSchedule } from "./restaurant.model";

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

export interface ReservationDTO {
  readonly attentionScheduleId: string;
  readonly date: string;
  readonly dinerId: string;
  readonly peopleQuantity: number;
  readonly message?: string;
}

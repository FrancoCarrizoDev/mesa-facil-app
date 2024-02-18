import type { Reservation } from "database";
import { ReservationDTO } from "./reservation.model";

export interface Diner {
  id: string;
  sub?: string;
  first_name: string;
  last_name?: string;
  phone?: string;
  email: string;
  birthday?: string;
  reservation: Reservation[];
  created_at: Date;
  updated_at: Date;
}

export interface DinerDTO {
  id: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  email: string;
  birthday?: string;
  reservations: ReservationDTO[];
}

import type { Reservation } from "database";
import { CreateReservationDTO } from "./reservation.model";

export interface Diner {
  id: string;
  sub?: string;
  first_name: string;
  last_name: string | null;
  phone: string | null;
  email: string;
  birthday: string | null;
  reservation: Reservation[];
  created_at: Date;
  updated_at: Date;
}

export interface DinerDTO {
  id: string;
  firstName: string;
  lastName: string | null;
  phone: string | null;
  email: string;
  birthday: string | null;
  reservations?: CreateReservationDTO[];
}

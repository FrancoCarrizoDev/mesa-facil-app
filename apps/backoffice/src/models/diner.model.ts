import type { Reservation } from "database";

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

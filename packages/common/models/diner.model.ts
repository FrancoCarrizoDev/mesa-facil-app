import { type CreateReservationDTO } from "./reservation.model";

export interface DinerDTO {
  id: string;
  firstName: string;
  lastName: string | null;
  phone: string | null;
  email: string;
  birthday: string | null;
  reservations?: CreateReservationDTO[];
}

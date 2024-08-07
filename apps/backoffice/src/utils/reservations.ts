export function getReservationStatusLabelById(
  reservationStatus: number
): string {
  switch (reservationStatus) {
    case 1:
      return "Pendiente";
    case 2:
      return "Confirmada";
    case 3:
      return "Cancelada";
    case 4:
      return "Rechazada";
    default:
      return "Sin estado";
  }
}

export function getReservationStatusLabelColorById(
  reservationStatus: number
): string {
  switch (reservationStatus) {
    case 1:
      return "text-gray-500";
    case 2:
      return "text-green-500";
    case 3:
      return "text-red-500";
    case 4:
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

export function getReservationStatusLabelByType(
  reservationStatus: number
): StatusType {
  switch (reservationStatus) {
    case 1:
      return "pending";
    case 2:
      return "confirm";
    case 3:
      return "cancel";
    case 4:
      return "reject";
    default:
      return "pending";
  }
}

type StatusType = "pending" | "confirm" | "reject" | "cancel";

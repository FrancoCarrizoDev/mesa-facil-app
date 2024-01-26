interface WeekDay {
  weekDay:
    | "Lunes"
    | "Martes"
    | "Miércoles"
    | "Jueves"
    | "Viernes"
    | "Sábado"
    | "Domingo";
  id: number;
}

export const WEEK_DAYS: WeekDay[] = [
  { weekDay: "Domingo", id: 0 },
  { weekDay: "Lunes", id: 1 },
  { weekDay: "Martes", id: 2 },
  { weekDay: "Miércoles", id: 3 },
  { weekDay: "Jueves", id: 4 },
  { weekDay: "Viernes", id: 5 },
  { weekDay: "Sábado", id: 6 },
];

import { useState } from "react";
import { setMinutes, setHours, addDays } from "@repo/common/date";
import { WEEK_DAYS } from "@/constants/week-days";
import { RestaurantDTO } from "@/models/restaurant.model";

export default function useDinerReservation({
  restaurant,
}: {
  readonly restaurant: RestaurantDTO;
}) {
  const [dinnerDate, setDinnerDate] = useState<Date | null>(null);

  const closedDays = WEEK_DAYS.filter(
    (day) =>
      !restaurant.attentionSchedule.some(
        (schedule) => schedule.dayNumber === day.id
      )
  );
  const hashClosedDays = closedDays.reduce(
    (acc, day) => {
      acc[day.id] = true;
      return acc;
    },
    {} as Record<number, boolean>
  );

  const filterTimes = (time: Date) => {
    const day = time.getDay();

    const filterByDayId = restaurant.attentionSchedule.filter(
      (schedule) => schedule.dayNumber === day
    );

    if (!filterByDayId) return false;

    return filterByDayId.some((schedule) => {
      const [startRangeHours, startRangeMinutes] =
        schedule.openingHours.split(":");
      const [endRangeHours, endRangeMinutes] = schedule.endingHours.split(":");

      const hours = time.getHours();
      const minutes = time.getMinutes();
      return (
        setHours(setMinutes(new Date(), minutes), hours) >=
          setHours(
            setMinutes(new Date(), +startRangeMinutes),
            +startRangeHours
          ) &&
        setHours(setMinutes(new Date(), minutes), hours) <=
          setHours(setMinutes(new Date(), +endRangeMinutes), +endRangeHours)
      );
    });
  };

  const minDate = new Date();
  const maxDate = addDays(new Date(), 30);

  return {
    dinnerDate,
    setDinnerDate,
    filterTimes,
    hashClosedDays,
    restaurant,
    minDate,
    maxDate,
  };
}

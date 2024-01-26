import { AttentionScheduleDTO } from "@/models/restaurant.model";

export const checkIfClosingTimeIsBeforeOpeningTime = (
  attentionSchedule: AttentionScheduleDTO
) => {
  const [openingTimeHour, openingTimeMinutes] =
    attentionSchedule.openingHours.split(":");
  const [closingTimeHour, closeTimeMinutes] =
    attentionSchedule.endingHours.split(":");

  if (parseInt(openingTimeHour) > parseInt(closingTimeHour)) {
    return true;
  }

  if (
    parseInt(openingTimeHour) === parseInt(closingTimeHour) &&
    parseInt(openingTimeMinutes) > parseInt(closeTimeMinutes)
  ) {
    return true;
  }

  return false;
};

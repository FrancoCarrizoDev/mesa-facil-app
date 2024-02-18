"use client";
import { RestaurantDTO } from "@/models/restaurant.model";
import DatePicker from "@/components/DatePicker/date-picker";
import React from "react";
import useDinnerReservation from "@/hooks/useDinnerReservation";
import useForm from "@/hooks/use-form";
import InputDatePicker from "@/components/InputDatePicker/input-date-picker";

interface ReservationFormProps {
  restaurant: RestaurantDTO;
}

export default function ReservationForm({
  restaurant: restaurantData,
}: ReservationFormProps): JSX.Element {
  const { filterTimes, hashClosedDays, restaurant, minDate, maxDate } =
    useDinnerReservation({
      restaurant: restaurantData,
    });

  const { values, errors, handleChange, handleSubmit, setErrors } = useForm<{
    date: Date | null;
    attentionScheduleId: string;
    dinerId: string;
    peopleQuantity: number;
    message?: string;
  }>({
    initialValues: {
      date: new Date() || null,
      attentionScheduleId: "",
      dinerId: "",
      peopleQuantity: 1,
      message: "",
    },
    onSubmit: (values) => {},
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <InputDatePicker
            selectedDate={values.date}
            onChange={(date) => {
              handleChange({
                date: date,
                attentionScheduleId: values.attentionScheduleId,
              });
            }}
            placeholderText="Fecha"
            minDate={minDate}
            maxDate={maxDate}
            filterDate={(date) => !hashClosedDays[date.getDay()]}
            filterTime={filterTimes}
            label="Fecha"
            required
            error={Boolean(errors.date)}
          />
        </div>
      </form>
    </div>
  );
}

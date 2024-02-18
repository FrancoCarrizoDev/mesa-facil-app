"use client";
import { RestaurantDTO } from "@/models/restaurant.model";
import DatePicker from "@/components/DatePicker/date-picker";
import React from "react";
import useDinnerReservation from "@/hooks/useDinnerReservation";
import useForm from "@/hooks/use-form";
import InputDatePicker from "@/components/InputDatePicker/input-date-picker";
import Input from "@repo/ui/input";

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
    email: string;
  }>({
    initialValues: {
      date: new Date() || null,
      attentionScheduleId: "",
      email: "",
      dinerId: "",
      peopleQuantity: 1,
      message: "",
    },
    onSubmit: (values) => {},
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between">
          <div className="mb-6">
            <Input
              label="Email"
              onChange={(e) => {
                handleChange({
                  email: e.target.value,
                });
              }}
              type="text"
              placeholder="Buscar por email"
              value={values.email}
            />
          </div>
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

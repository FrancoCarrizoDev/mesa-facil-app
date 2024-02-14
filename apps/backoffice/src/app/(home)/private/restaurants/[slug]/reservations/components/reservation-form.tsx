"use client";
import "react-datepicker/dist/react-datepicker.css";
import useForm from "@/hooks/use-form";
import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { RestaurantDTO } from "@/models/restaurant.model";
import useDinnerReservation from "@/hooks/useDinnerReservation";
registerLocale("es", es);

interface ReservationFormProps {
  restaurant: RestaurantDTO;
}

export default function ReservationForm({
  restaurant: restaurantData,
}: ReservationFormProps): JSX.Element {
  console.log({ restaurantData });
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
          <ReactDatePicker
            selected={values.date}
            onChange={(date) =>
              handleChange({
                date: date,
                attentionScheduleId: values.attentionScheduleId,
              })
            }
            showTimeSelect
            locale="es"
            dateFormat="MMMM d, yyyy HH:mm"
            wrapperClassName="w-full"
            placeholderText="Fecha"
            className="w-full fullborder border bg-lemon-50 border-lemon-200 text-gray-500 rounded-md  capitalize placeholder:text-gray-500 placeholder:text-sm py-1 px-2"
            minDate={minDate}
            maxDate={maxDate}
            calendarStartDay={1}
            filterDate={(date) => !hashClosedDays[date.getDay()]}
            filterTime={filterTimes}
            timeIntervals={15}
          />
          <span className="ps-2">
            {values.date && values.attentionScheduleId ? "✔️" : "👈"}
          </span>
        </div>
      </form>
    </div>
  );
}

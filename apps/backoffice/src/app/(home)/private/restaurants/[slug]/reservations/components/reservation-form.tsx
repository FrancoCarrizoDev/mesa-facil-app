"use client";
import { RestaurantDTO } from "@/models/restaurant.model";
import React, { useEffect } from "react";
import useDinerReservation from "@/hooks/useDinerReservation";
import useForm from "@/hooks/use-form";
import InputDatePicker from "@/components/InputDatePicker/input-date-picker";
import Input from "@repo/ui/input";

import { DinerDTO } from "@/models/diner.model";
import useDebounce from "@/hooks/useDebounce";
import getDinnerByEmail from "@/actions/diner.actions";
import Autocomplete from "@repo/ui/autocomplete";
import useSearchDiner from "@/hooks/useSearchDiner";

interface ReservationFormProps {
  restaurant: RestaurantDTO;
}

export default function ReservationForm({
  restaurant: restaurantData,
}: ReservationFormProps): JSX.Element {
  const { filterTimes, hashClosedDays, restaurant, minDate, maxDate } =
    useDinerReservation({
      restaurant: restaurantData,
    });

  const { values, errors, handleChange, handleSubmit, setErrors } = useForm<{
    date: Date | null;
    attentionScheduleId: string;
    dinerId: string;
    peopleQuantity: string;
    message?: string;
    email: string;
    firstName: string;
    lastName: string | null;
    phone: string | null;
  }>({
    initialValues: {
      date: new Date() || null,
      attentionScheduleId: "",
      email: "",
      dinerId: "",
      peopleQuantity: "",
      message: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
    onSubmit: (values) => {},
  });

  const { diner, setDiner, dinerData } = useSearchDiner();

  console.log({ values });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between">
          <div className="mb-6">
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
          <div className="mb-6">
            <Autocomplete
              items={dinerData.map((diner) => ({
                ...diner,
                label: `${diner.firstName} ${diner.lastName}`,
              }))}
              onChange={(e) => {
                setDiner(e.target.value);
              }}
              onSelect={(val) => {
                const diner = dinerData.find((diner) => diner.id === val.id);
                if (diner) {
                  handleChange({
                    dinerId: diner.id,
                    email: diner.email,
                    firstName: diner.firstName,
                    lastName: diner.lastName,
                    phone: diner.phone,
                  });
                  setDiner(diner.email);
                }
              }}
              value={diner}
              displayProperty="email"
              label="Email"
              placeholder="Buscar por email"
              required
            />
          </div>
          <div className="mb-6">
            <Input
              label="Nombre"
              onChange={(e) => {
                handleChange({
                  firstName: e.target.value,
                });
              }}
              type="text"
              placeholder="Ingrese el nombre"
              value={values.firstName}
              required
              disabled={Boolean(values.dinerId)}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Apellido"
              onChange={(e) => {
                handleChange({
                  firstName: e.target.value,
                });
              }}
              type="text"
              placeholder="Ingrese el apellido"
              value={values.lastName!}
              required
              disabled={Boolean(values.dinerId)}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Teléfono"
              onChange={(e) => {
                handleChange({
                  phone: e.target.value,
                });
              }}
              type="text"
              placeholder="Ingrese el número de teléfono"
              value={values.phone!}
              required
              disabled={Boolean(values.dinerId)}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Cantidad de personas"
              onChange={(e) => {
                handleChange({
                  peopleQuantity: e.target.value,
                });
              }}
              type="text"
              placeholder="Ingrese la cantidad de personas"
              value={values.peopleQuantity}
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}

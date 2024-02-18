"use client";
import { RestaurantDTO } from "@/models/restaurant.model";
import React, { useEffect } from "react";
import useDinnerReservation from "@/hooks/useDinnerReservation";
import useForm from "@/hooks/use-form";
import InputDatePicker from "@/components/InputDatePicker/input-date-picker";
import Input from "@repo/ui/input";

import { DinerDTO } from "@/models/diner.model";
import useDebounce from "@/hooks/useDebounce";
import getDinnerByEmail from "@/actions/diner.actions";
import Autocomplete from "@repo/ui/autocomplete";

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
    dinerEmail: string | null;
  }>({
    initialValues: {
      date: new Date() || null,
      attentionScheduleId: "",
      email: "",
      dinerId: "",
      peopleQuantity: 1,
      message: "",
      dinerEmail: null,
    },
    onSubmit: (values) => {},
  });

  const [diner, setDiner] = React.useState<string>("");
  const [dinerData, setDinerData] = React.useState<DinerDTO[]>([]);
  const dinerDebounce = useDebounce(diner, 1000);

  useEffect(() => {
    const getDinerByEmail = async () => {
      if (dinerDebounce) {
        const diner = await getDinnerByEmail(dinerDebounce);
        setDinerData(diner);
      }
    };
    getDinerByEmail();
  }, [dinerDebounce]);

  console.log({ values });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between">
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
                debugger;
                const diner = dinerData.find((diner) => diner.id === val.id);
                if (diner) {
                  handleChange({
                    dinerId: diner.id,
                    dinerEmail: diner.email,
                  });
                }
              }}
              value={diner}
              displayProperty="email"
              label="Diner"
            />
          </div>
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

"use client";
import {
  AttentionScheduleDTO,
  type RestaurantDTO,
} from "@/models/restaurant.model";
import { useRouter } from "next/navigation";
import Button from "@repo/ui/button";
import useForm from "@/hooks/use-form";
import AttentionSchedules from "./attention-schedules";
import { checkIfClosingTimeIsBeforeOpeningTime } from "@/utils/attention-schedule";
import { useState } from "react";

const INITIAL_VALUES: RestaurantDTO = {
  id: "1",
  name: "",
  address: "",
  phone: "",
  attentionSchedule: [],
  slug: "",
};

export default function RestaurantForm({
  restaurant,
}: {
  restaurant?: RestaurantDTO;
}): JSX.Element {
  const { handleChange, handleSubmit, values } = useForm<RestaurantDTO>({
    initialValues: restaurant || INITIAL_VALUES,
    onSubmit: (formValues) => {
      console.log(formValues);
    },
  });
  const [attentionScheduleToEdit, setAttentionScheduleToEdit] = useState<
    AttentionScheduleDTO | undefined
  >();
  const router = useRouter();

  const checkIfAttentionScheduleIsColliding = (
    attentionSchedule: AttentionScheduleDTO
  ) => {
    const weekDay = attentionSchedule.day_name;
    const filteredAttentionScheduleByWeekDay = values.attentionSchedule.filter(
      (schedule) => schedule.day_name === weekDay
    );
    return filteredAttentionScheduleByWeekDay.some((schedule) => {
      const openingTime = parseInt(schedule.opening_hours.split(":")[0]);
      const closingTime = parseInt(schedule.ending_hours.split(":")[0]);
      const newOpeningTime = parseInt(
        attentionSchedule.opening_hours.split(":")[0]
      );
      const newClosingTime = parseInt(
        attentionSchedule.ending_hours.split(":")[0]
      );
      if (newOpeningTime >= openingTime && newOpeningTime <= closingTime) {
        return true;
      }
      if (newClosingTime >= openingTime && newClosingTime <= closingTime) {
        return true;
      }
      return false;
    });
  };

  const onAddAttentionSchedule = (
    attentionSchedule: AttentionScheduleDTO | AttentionScheduleDTO[]
  ) => {
    if (Array.isArray(attentionSchedule)) {
      const isOpeningTimeBeforeClosingTime = attentionSchedule.some(
        (schedule) => {
          return checkIfClosingTimeIsBeforeOpeningTime(schedule);
        }
      );

      if (isOpeningTimeBeforeClosingTime) {
        alert("El horario de cierre debe ser mayor al de apertura.");
        return;
      }
      const isCollided = attentionSchedule.some((schedule) => {
        return checkIfAttentionScheduleIsColliding(schedule);
      });
      if (isCollided) {
        alert("El horario ingresado se superpone con otro.");
        return;
      }
      handleChange({
        attentionSchedule: [...values.attentionSchedule, ...attentionSchedule],
      });
      return;
    }

    const isOpeningTimeBeforeClosingTime =
      checkIfClosingTimeIsBeforeOpeningTime(attentionSchedule);

    if (isOpeningTimeBeforeClosingTime) {
      alert("El horario de cierre debe ser mayor al de apertura.");
      return;
    }

    const isCollided = checkIfAttentionScheduleIsColliding(attentionSchedule);

    if (isCollided) {
      alert("El horario ingresado se superpone con otro.");
      return;
    }

    handleChange({
      attentionSchedule: [...values.attentionSchedule, attentionSchedule],
    });
  };

  return (
    <form
      className="mt-5 w-full flex flex-col justify-between min-h-[400px]"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="flex flex-col ">
          <AttentionSchedules
            onChange={onAddAttentionSchedule}
            initialAttentionSchedule={attentionScheduleToEdit}
          />
        </div>
      </div>

      <pre>{JSON.stringify(values, null, 2)}</pre>

      <div className="flex justify-center gap-3">
        <Button
          onClick={() => {
            router.back();
          }}
          type="button"
        >
          Volver
        </Button>
        <Button type="submit">CREAR</Button>
      </div>
    </form>
  );
}

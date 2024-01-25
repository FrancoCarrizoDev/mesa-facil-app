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
import { useMemo, useState } from "react";
import Input from "@repo/ui/input";
import { WEEK_DAYS } from "@/constants/week-days";

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

  const filterAttentionSchedule = (
    attentionSchedule: AttentionScheduleDTO[],
    { day_name, opening_hours, ending_hours }: AttentionScheduleDTO
  ) => {
    return attentionSchedule.filter((schedule) => {
      if (schedule.day_name !== day_name) {
        return true;
      }

      return (
        schedule.opening_hours !== opening_hours &&
        schedule.ending_hours !== ending_hours
      );
    });
  };

  const sortAttentionScheduleByWeekDayAndOpeningTime = useMemo(() => {
    return values.attentionSchedule.sort((a, b) => {
      const weekDayA = WEEK_DAYS.find((day) => day.weekDay === a.day_name)!.id;
      const weekDayB = WEEK_DAYS.find((day) => day.weekDay === b.day_name)!.id;
      if (weekDayA > weekDayB) {
        return 1;
      }
      if (weekDayA < weekDayB) {
        return -1;
      }
      const openingTimeA = parseInt(a.opening_hours.split(":")[0]);
      const openingTimeB = parseInt(b.ending_hours.split(":")[0]);
      if (openingTimeA > openingTimeB) {
        return 1;
      }
      if (openingTimeA < openingTimeB) {
        return -1;
      }
      return 0;
    });
  }, [values.attentionSchedule]);

  return (
    <form
      className="mt-5 w-full flex flex-col justify-between min-h-[400px]"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="flex flex-col">
          <AttentionSchedules
            onChange={onAddAttentionSchedule}
            initialAttentionSchedule={attentionScheduleToEdit}
          />
        </div>
        <div>
          <Input
            label={"Nombre"}
            onChange={(e) =>
              handleChange({
                name: e.target.value,
              })
            }
            value={values.name}
            placeholder="Delicattesen"
          />
          <Input
            value={values.address}
            label={"Dirección"}
            onChange={(e) =>
              handleChange({
                address: e.target.value,
              })
            }
            placeholder="Av. Siempre Viva 123"
          />
          <Input
            value={values.phone}
            label={"Teléfono de reservas"}
            onChange={(e) =>
              handleChange({
                phone: e.target.value,
              })
            }
            placeholder="123-45-678"
          />
        </div>
      </div>

      <div className="pe-6">
        <div className="w-1/2 border border-lemon-500 rounded-md p-3">
          <div className="max-w-fit">
            <h3 className="font-bold ">Horarios de reserva cargados</h3>
            <hr className="w-full border-lemon-300 pt-1 pb-3" />
          </div>
          {values.attentionSchedule.length > 0 ? (
            sortAttentionScheduleByWeekDayAndOpeningTime.map(
              ({ day_name, ending_hours, opening_hours }) => (
                <div
                  key={day_name + opening_hours}
                  className="flex justify-between items-center pt-1"
                >
                  <div className="w-full flex items-center justify-between pe-3">
                    <p className="text-xs font-medium">{day_name}</p>
                    <p className="text-xs font-medium">{`${opening_hours}hs - ${ending_hours}hs`}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        setAttentionScheduleToEdit({
                          day_name: day_name,
                          opening_hours: opening_hours,
                          ending_hours: ending_hours,
                          day_number: WEEK_DAYS.find(
                            (weekDay) => weekDay.weekDay === day_name
                          )!.id,
                        });
                        handleChange({
                          attentionSchedule: filterAttentionSchedule(
                            values.attentionSchedule,
                            {
                              day_name: day_name,
                              opening_hours: opening_hours,
                              ending_hours: ending_hours,
                              day_number: WEEK_DAYS.find(
                                (weekDay) => weekDay.weekDay === day_name
                              )!.id,
                            }
                          ),
                        });
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        handleChange({
                          attentionSchedule: filterAttentionSchedule(
                            values.attentionSchedule,
                            {
                              day_name: day_name,
                              opening_hours: opening_hours,
                              ending_hours: ending_hours,
                              day_number: WEEK_DAYS.find(
                                (weekDay) => weekDay.weekDay === day_name
                              )!.id,
                            }
                          ),
                        });
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              )
            )
          ) : (
            <p>No tienes horarios cargados todavía.</p>
          )}
        </div>
      </div>

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

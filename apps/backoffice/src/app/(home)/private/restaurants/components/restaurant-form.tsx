"use client";
import {
  AttentionScheduleDTO,
  RestaurantDTOValidateFields,
  type RestaurantDTO,
} from "@/models/restaurant.model";
import { checkIfClosingTimeIsBeforeOpeningTime } from "@/utils/attention-schedule";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { WEEK_DAYS } from "@/constants/week-days";
import AttentionSchedules from "./attention-schedules";
import Button from "@repo/ui/button";
import Input from "@repo/ui/input";
import useForm from "@/hooks/use-form";
import {
  createRestaurant,
  updateRestaurant,
} from "@/actions/restaurant.actions";
import {
  validateRestaurantAddress,
  validateRestaurantName,
  validateRestaurantPhone,
} from "@/utils/validations";

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
  const { handleChange, handleSubmit, values, errors } = useForm<RestaurantDTO>(
    {
      initialValues: restaurant || INITIAL_VALUES,
      onSubmit: async (formValues) => {
        try {
          if (restaurant) {
            await updateRestaurant(formValues);
          } else {
            await createRestaurant(formValues);
          }
          toast("Restaurante creado con éxito", { type: "success" });
          router.push("/private/restaurants");
        } catch (error) {
          console.log(error);
        }
      },
      validationSchema: () => {
        const errors: {
          [K in keyof RestaurantDTOValidateFields]?: string;
        } = {};
        if (validateRestaurantName(values.name)) {
          errors.name = "El nombre es requerido";
        }
        if (validateRestaurantAddress(values.address)) {
          errors.address = "La dirección es requerida";
        }
        if (validateRestaurantPhone(values.phone)) {
          errors.phone = "El teléfono es requerido";
        }
        return errors;
      },
    }
  );
  const [attentionScheduleToEdit, setAttentionScheduleToEdit] = useState<
    AttentionScheduleDTO | undefined
  >();
  const router = useRouter();

  const checkIfAttentionScheduleIsColliding = (
    attentionSchedule: AttentionScheduleDTO
  ): boolean => {
    const weekDay = attentionSchedule.dayName;
    const filteredAttentionScheduleByWeekDay = values.attentionSchedule.filter(
      (schedule) => schedule.dayName === weekDay
    );
    return filteredAttentionScheduleByWeekDay.some((schedule) => {
      const openingTime = parseInt(schedule.openingHours.split(":")[0]);
      const closingTime = parseInt(schedule.endingHours.split(":")[0]);
      const newOpeningTime = parseInt(
        attentionSchedule.openingHours.split(":")[0]
      );
      const newClosingTime = parseInt(
        attentionSchedule.endingHours.split(":")[0]
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
  ): void => {
    if (Array.isArray(attentionSchedule)) {
      const isOpeningTimeBeforeClosingTime = attentionSchedule.some(
        (schedule) => {
          return checkIfClosingTimeIsBeforeOpeningTime(schedule);
        }
      );

      if (isOpeningTimeBeforeClosingTime) {
        toast("El horario de cierre debe ser mayor al de apertura.");
        return;
      }
      const isCollided = attentionSchedule.some((schedule) => {
        return checkIfAttentionScheduleIsColliding(schedule);
      });
      if (isCollided) {
        toast("El horario ingresado se superpone con otro.");
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
      toast("El horario de cierre debe ser mayor al de apertura.");
      return;
    }

    const isCollided = checkIfAttentionScheduleIsColliding(attentionSchedule);

    if (isCollided) {
      toast("El horario ingresado se superpone con otro.");
      return;
    }

    handleChange({
      attentionSchedule: [...values.attentionSchedule, attentionSchedule],
    });
  };

  const filterAttentionSchedule = (
    attentionSchedule: AttentionScheduleDTO[],
    { dayName, openingHours, endingHours }: AttentionScheduleDTO
  ) => {
    return attentionSchedule.filter((schedule) => {
      if (schedule.dayName !== dayName) {
        return true;
      }

      return (
        schedule.openingHours !== openingHours &&
        schedule.endingHours !== endingHours
      );
    });
  };

  const sortAttentionScheduleByWeekDayAndOpeningTime = useMemo(() => {
    return values.attentionSchedule.sort((a, b) => {
      const weekDayA =
        WEEK_DAYS.find((day) => day.weekDay === a.dayName)?.id || 0;
      const weekDayB =
        WEEK_DAYS.find((day) => day.weekDay === b.dayName)?.id || 0;
      if (weekDayA > weekDayB) {
        return 1;
      }
      if (weekDayA < weekDayB) {
        return -1;
      }
      const openingTimeA = parseInt(a.openingHours.split(":")[0]);
      const openingTimeB = parseInt(b.endingHours.split(":")[0]);
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
            initialAttentionSchedule={attentionScheduleToEdit}
            onChange={onAddAttentionSchedule}
          />
        </div>
        <div>
          <div className="mb-6">
            <Input
              label="Nombre"
              error={Boolean(errors.name)}
              errorText={errors.name}
              onChange={(e) => {
                handleChange({
                  name: e.target.value,
                });
              }}
              placeholder="Delicattesen"
              required
              value={values.name}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Dirección"
              error={Boolean(errors.address)}
              errorText={errors.address}
              required
              onChange={(e) => {
                handleChange({
                  address: e.target.value,
                });
              }}
              placeholder="Av. Siempre Viva 123"
              value={values.address}
            />
          </div>
          <Input
            label="Teléfono de reservas"
            error={Boolean(errors.phone)}
            errorText={errors.phone}
            required
            onChange={(e) => {
              handleChange({
                phone: e.target.value,
              });
            }}
            placeholder="123-45-678"
            value={values.phone}
          />
        </div>
      </div>

      <div className="pe-6 mb-6">
        <div className="w-1/2 border border-lemon-500 rounded-md p-3">
          <div className="max-w-fit">
            <h3 className="font-bold ">Horarios de reserva cargados</h3>
            <hr className="w-full border-lemon-300 pt-1 pb-3" />
          </div>
          {values.attentionSchedule.length > 0 ? (
            sortAttentionScheduleByWeekDayAndOpeningTime.map(
              ({ dayName, endingHours, openingHours }) => (
                <div
                  key={dayName + openingHours}
                  className="flex justify-between items-center pt-1"
                >
                  <div className="w-full flex items-center justify-between pe-3">
                    <p className="text-xs font-medium">{dayName}</p>
                    <p className="text-xs font-medium">{`${openingHours}hs - ${endingHours}hs`}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        setAttentionScheduleToEdit({
                          dayName: dayName,
                          openingHours: openingHours,
                          endingHours: endingHours,
                          dayNumber: WEEK_DAYS.find(
                            (weekDay) => weekDay.weekDay === dayName
                          )!.id,
                        });
                        handleChange({
                          attentionSchedule: filterAttentionSchedule(
                            values.attentionSchedule,
                            {
                              dayName,
                              openingHours,
                              endingHours,
                              dayNumber: WEEK_DAYS.find(
                                (weekDay) => weekDay.weekDay === dayName
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
                              dayName,
                              openingHours,
                              endingHours,
                              dayNumber: WEEK_DAYS.find(
                                (weekDay) => weekDay.weekDay === dayName
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
        <Button type="submit">{restaurant ? "Editar" : "Crear"}</Button>
      </div>
    </form>
  );
}

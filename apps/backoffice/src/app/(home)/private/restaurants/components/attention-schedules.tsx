"use client";

import { useEffect, useState } from "react";
import type { AttentionScheduleDTO } from "@repo/common/models";
import { WEEK_DAYS } from "@/constants/week-days";
import Select from "@repo/ui/select";
import Input from "@repo/ui/input";
import Checkbox from "@repo/ui/checkbox";
import Button from "@repo/ui/button";

interface AttentionScheduleProps {
  readonly onChange: (e: AttentionScheduleDTO | AttentionScheduleDTO[]) => void;
  readonly initialAttentionSchedule?: AttentionScheduleDTO;
}

export default function AttentionSchedules({
  onChange,
  initialAttentionSchedule,
}: AttentionScheduleProps): JSX.Element {
  const [closingTime, setClosingTime] = useState<string>("22:00");
  const [openingTime, setOpeningTime] = useState<string>("20:00");
  const [repeatForOtherDays, setRepeatForOtherDays] = useState<boolean>(false);
  const [weekDayId, setWeekDayId] = useState<number>(1);

  useEffect(() => {
    if (!initialAttentionSchedule) return;

    setWeekDayId(
      WEEK_DAYS.find((day) => day.weekDay === initialAttentionSchedule.dayName)
        ?.id || 1
    );
    setOpeningTime(initialAttentionSchedule.openingHours);
    setClosingTime(initialAttentionSchedule.endingHours);
  }, [initialAttentionSchedule]);

  const handleAddAttentionSchedule = (): void => {
    if (repeatForOtherDays) {
      const mapDays: AttentionScheduleDTO[] = WEEK_DAYS.map((day) => ({
        dayName: day.weekDay,
        openingHours: openingTime,
        endingHours: closingTime,
        dayNumber: day.id,
      }));

      onChange(mapDays);
      setRepeatForOtherDays(false);
      return;
    }

    const attentionSchedule: AttentionScheduleDTO = {
      dayName: WEEK_DAYS.find((day) => day.id === weekDayId)?.weekDay || "",
      openingHours: openingTime,
      endingHours: closingTime,
      dayNumber: weekDayId,
    };

    onChange(attentionSchedule);
  };

  return (
    <>
      <div className="mb-6">
        <Select
          disabled={repeatForOtherDays}
          label="Horarios de reserva"
          onChange={(e) => {
            setWeekDayId(Number(e.target.value));
          }}
          options={WEEK_DAYS.map((day) => ({
            value: day.id,
            label: day.weekDay,
          }))}
          value={weekDayId}
        />
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <Input
          label="Desde"
          onChange={(e) => {
            setOpeningTime(e.target.value);
          }}
          type="time"
          value={openingTime}
        />
        <Input
          label="Hasta"
          onChange={(e) => {
            setClosingTime(e.target.value);
          }}
          type="time"
          value={closingTime}
        />
        <div className="flex items-center mt-auto pb-2">
          <Checkbox
            id="repeatForOtherDays"
            checked={repeatForOtherDays}
            onChange={(e) => {
              setRepeatForOtherDays(e.target.checked);
            }}
          >
            Repetir este horario para todos los días
          </Checkbox>
        </div>
      </div>
      <div className=" flex">
        <Button onClick={handleAddAttentionSchedule} size="sm" type="button">
          AGREGAR HORARIO
        </Button>
      </div>
    </>
  );
}

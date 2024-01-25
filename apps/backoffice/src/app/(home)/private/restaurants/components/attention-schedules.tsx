"use client";

import { useEffect, useState } from "react";
import { AttentionScheduleDTO } from "@/models/restaurant.model";
import { WEEK_DAYS } from "@/constants/week-days";
import Select from "@repo/ui/select";
import Input from "@repo/ui/input";
import Checkbox from "@repo/ui/checkbox";
import Button from "@repo/ui/button";

type AttentionScheduleProps = {
  readonly onChange: (e: AttentionScheduleDTO | AttentionScheduleDTO[]) => void;
  readonly initialAttentionSchedule?: AttentionScheduleDTO;
};

export default function AttentionSchedules({
  onChange,
  initialAttentionSchedule,
}: AttentionScheduleProps): JSX.Element {
  const [closingTime, setClosingTime] = useState<string>("22:00");
  const [openingTime, setOpeningTime] = useState<string>("08:00");
  const [repeatForOtherDays, setRepeatForOtherDays] = useState<boolean>(false);
  const [weekDayId, setWeekDayId] = useState<number>(1);

  useEffect(() => {
    if (!initialAttentionSchedule) return;

    setWeekDayId(
      WEEK_DAYS.find(
        (day) => day.weekDay === initialAttentionSchedule.day_name
      )!.id
    );
    setOpeningTime(initialAttentionSchedule.opening_hours);
    setClosingTime(initialAttentionSchedule.ending_hours);
  }, [initialAttentionSchedule]);

  const handleAddAttentionSchedule = () => {
    if (repeatForOtherDays) {
      const mapDays: AttentionScheduleDTO[] = WEEK_DAYS.map((day) => ({
        day_name: day.weekDay,
        opening_hours: openingTime,
        ending_hours: closingTime,
        day_number: day.id,
      }));

      onChange(mapDays);
      setRepeatForOtherDays(false);
      return;
    }

    const attentionSchedule: AttentionScheduleDTO = {
      day_name: WEEK_DAYS.find((day) => day.id === weekDayId)!.weekDay,
      opening_hours: openingTime,
      ending_hours: closingTime,
      day_number: weekDayId,
    };

    onChange(attentionSchedule);
  };

  return (
    <>
      <div className="mb-6">
        <Select
          value={weekDayId}
          label="Horarios de reserva"
          options={WEEK_DAYS.map((day) => ({
            value: day.id,
            label: day.weekDay,
          }))}
          onChange={(e) => {
            setWeekDayId(Number(e.target.value));
          }}
          disabled={repeatForOtherDays}
        />
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <Input
          label="Desde"
          type="time"
          value={openingTime}
          onChange={(e) => {
            setOpeningTime(e.target.value);
          }}
        />
        <Input
          label="Hasta"
          type="time"
          value={closingTime}
          onChange={(e) => {
            setClosingTime(e.target.value);
          }}
        />
        <div className="flex items-center mt-auto pb-2">
          <Checkbox
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
        <Button size="sm" type="button" onClick={handleAddAttentionSchedule}>
          AGREGAR
        </Button>
      </div>
    </>
  );
}

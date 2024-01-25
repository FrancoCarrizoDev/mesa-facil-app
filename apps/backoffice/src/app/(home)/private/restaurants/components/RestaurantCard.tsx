import Link from "@/components/Link/link";
import React from "react";
import { RestaurantDTO } from "src/models/restaurant.model";

export default function RestaurantCard({
  name,
  address,
  id,
  slug,
  attentionSchedule,
  phone,
}: RestaurantDTO) {
  return (
    <div className="max-w-sm p-6 rounded-lg shadow bg-gray-800 border-gray-700 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 ">
          <a href="#">
            <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>
        </div>
        <Link href={`/private/restaurants/${id}`} color="secondary">
          Editar
        </Link>
      </div>
      <div className="mb-3 font-normal text-xs text-gray-500 dark:text-gray-400">
        <p className="mb-1">
          <span className="font-bold">Horario de atención</span>
        </p>
        {!attentionSchedule.length && (
          <p>No hay horario de atención registrado</p>
        )}
        {attentionSchedule?.map((schedule) => {
          return (
            <div
              key={schedule.id}
              className="flex justify-between items-center"
            >
              <p>{schedule.day_name}:</p>
              <p>
                {schedule.opening_hours} - {schedule.ending_hours}
              </p>
            </div>
          );
        })}

        <div className="mt-3">
          <p>
            <span className="font-bold">Dirección:</span> {address}
          </p>
          <p>
            <span className="font-bold">Teléfono:</span> {phone}
          </p>
        </div>
      </div>
      <div className="mx-auto">
        <Link color="secondary" href={`/reserve/${slug}`}>
          Ver sitio
        </Link>
      </div>
    </div>
  );
}

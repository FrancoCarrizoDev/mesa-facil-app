import Link from "@/components/Link/link";
import { type RestaurantDTO } from "src/models/restaurant.model";

export default function RestaurantCard({
  name,
  address,
  id,
  slug,
  attentionSchedule,
  phone,
}: RestaurantDTO) {
  return (
    <div className="max-w-sm p-6 rounded-lg shadow bg-gray-800 border-gray-700 h-full flex flex-col  ">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 ">
          <a href="/#">
            <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>
        </div>
        <Link color="secondary" href={`/private/restaurants/${id}`}>
          Editar
        </Link>
      </div>
      <div className="min-h-[150px] mb-3 font-normal text-xs text-gray-500 dark:text-gray-400">
        <p className="mb-1">
          <span className="font-bold">Horario de atención</span>
        </p>
        {!attentionSchedule.length && (
          <p>No hay horario de atención registrado</p>
        )}
        {attentionSchedule.map((schedule) => {
          return (
            <div
              className="flex justify-between items-center"
              key={schedule.id}
            >
              <p>{schedule.dayName}:</p>
              <p>
                {schedule.openingHours} - {schedule.endingHours}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
        <p>
          <span className="font-bold">Dirección:</span> {address}
        </p>
        <p>
          <span className="font-bold">Teléfono:</span> {phone}
        </p>
      </div>
      <div className="mt-auto flex justify-around">
        <Link color="secondary" href={`/reserve/${slug}`}>
          Gestionar
        </Link>
        <Link color="secondary" href={`/reserve/${slug}`}>
          Ver sitio
        </Link>
      </div>
    </div>
  );
}

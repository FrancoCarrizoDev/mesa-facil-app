import Link from "@/components/Link/link";
import { type RestaurantDTO } from "@repo/common/models";

export default function RestaurantCard({
  name,
  address,
  slug,
  attentionSchedule,
  phone,
}: RestaurantDTO) {
  return (
    <Link color="primary" href={`/private/restaurants/${slug}`}>
      <div className="max-w-sm p-6 rounded-lg shadow bg-slate-900 hover:bg-gray-800 transition-all h-full flex flex-col ">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 ">
            <h5 className="text-white text-md font-semibold tracking-tight text-lg">
              {name}
            </h5>
          </div>
        </div>
        <div className="min-h-[150px] mb-3 font-normal text-xs text-gray-600 ">
          <p className="mb-1">
            <span className="font-bold text-white">Horario de atención</span>
          </p>
          {!attentionSchedule.length && (
            <p>No hay horario de atención registrado</p>
          )}
          {attentionSchedule.map((schedule) => {
            return (
              <div
                className="flex justify-between items-center text-white"
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
        <div className="text-xs text-white">
          <p>
            <span className="font-bold">Dirección:</span> {address}
          </p>
          <p>
            <span className="font-bold">Teléfono:</span> {phone}
          </p>
        </div>
      </div>
    </Link>
  );
}

import Section from "@repo/ui/section";
import { useSession } from "next-auth/react";
import { getRestaurantsNameByUser } from "src/actions/restaurant.actions";
import Link from "src/components/shared/Link/link";
import { Restaurant } from "src/models/restaurant.model";

export default async function Page(): Promise<JSX.Element> {
  const restaurants = await getRestaurantsNameByUser();
  console.log({ restaurants });
  return (
    <Section>
      <h1 className="text-4xl font-bold text-yellow-950">Bienvenido!</h1>
      <div className="flex items-center gap-5 mt-5 text-yellow-900">
        <div className="p-5 bg-yellow-200 rounded-md">
          {restaurants.length === 0 && (
            <p>
              No tienes restaurantes cargandos.{" "}
              <Link href={"/private/restaurants/create"}>Crea uno aquí</Link>
            </p>
          )}
          {restaurants.map((restaurant) => (
            <p key={restaurant.id}>{restaurant.name}</p>
          ))}
        </div>
        <div className="p-5 bg-yellow-200 rounded-md">
          <p>No tienes reservas para el día de hoy...</p>
        </div>
        <div className="p-5 bg-yellow-200 rounded-md">
          <p>No tienes reseñas aún ...</p>
        </div>
      </div>
    </Section>
  );
}

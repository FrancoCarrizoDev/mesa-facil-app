import Link from "src/components/Link/link";

interface RestaurantListProps {
  restaurants: {
    id: string;
    name: string;
  }[];
}

export default function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <div className="p-5 bg-gray-200 rounded-md">
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
  );
}

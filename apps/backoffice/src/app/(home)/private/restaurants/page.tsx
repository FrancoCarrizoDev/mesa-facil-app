import { getRestaurantsByUser } from "@/actions/restaurant.actions";
import Link from "@/components/Link/link";
import GridListContainer from "@repo/ui/grid-list-container";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import RestaurantCard from "./components/restaurant-card";

export default async function RestauranstPage(): Promise<JSX.Element> {
  const restaurants = await getRestaurantsByUser();

  return (
    <Section>
      <div className="mb-6 flex justify-between">
        <SectionTitle>Mis Restaurantes</SectionTitle>
        <div className="underline">
          <Link href="/private/restaurants/create">Crear Restaurante</Link>
        </div>
      </div>
      <SectionBody>
        <GridListContainer>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className="h-full">
              <RestaurantCard {...restaurant} />
            </li>
          ))}
        </GridListContainer>
      </SectionBody>
    </Section>
  );
}

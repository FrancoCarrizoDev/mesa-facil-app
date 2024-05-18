import { getRestaurantsByUserId } from "@/actions/restaurant.actions";
import { redirect } from "next/navigation";
import getSession from "@/utils/get-session";
import GridListContainer from "@repo/ui/grid-list-container";
import Link from "@/components/Link/link";
import React from "react";
import RestaurantCard from "./components/restaurant-card";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";

export default async function RestauranstPage(): Promise<JSX.Element> {
  const session = await getSession();

  const restaurants = await getRestaurantsByUserId(session.user.id);

  return (
    <Section>
      <div className="mb-6 flex justify-between">
        <SectionTitle>Mis Restaurantes</SectionTitle>
        <Link underline="hover" href="/private/restaurants/create">
          Crear Restaurante
        </Link>
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

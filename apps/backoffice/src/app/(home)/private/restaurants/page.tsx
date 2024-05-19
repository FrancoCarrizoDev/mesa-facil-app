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
import { canCreateRestaurant, canEditRestaurant } from "@/utils/permissions";

export default async function RestauranstPage(): Promise<JSX.Element> {
  const session = await getSession();

  const restaurants = await getRestaurantsByUserId(session.user.id);
  const hasCreateRestaurantPermission = canCreateRestaurant(
    session.user.roleId
  );
  const hasEditRestaurantPermission = canEditRestaurant(session.user.roleId);

  return (
    <Section>
      <div className="mb-6 flex justify-between">
        <SectionTitle>Mis Restaurantes</SectionTitle>
        {hasCreateRestaurantPermission ? (
          <Link href="/private/restaurants/create" underline="hover">
            Crear Restaurante
          </Link>
        ) : null}
      </div>
      <SectionBody>
        <GridListContainer>
          {restaurants.map((restaurant) => (
            <li className="h-full" key={restaurant.id}>
              <RestaurantCard
                {...restaurant}
                canEdit={hasEditRestaurantPermission}
              />
            </li>
          ))}
        </GridListContainer>
      </SectionBody>
    </Section>
  );
}

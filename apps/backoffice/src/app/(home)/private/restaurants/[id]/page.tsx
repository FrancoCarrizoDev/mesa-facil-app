import { getRestaurantById } from "@/actions/restaurant.actions";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import RestaurantForm from "../components/restaurant-form";
import { notFound } from "next/navigation";

interface Props {
  readonly params: {
    id: string;
  };
}

export default async function RestaurantPage({
  params,
}: Props): Promise<JSX.Element> {
  const restaurant = await getRestaurantById(params.id);

  if (!restaurant) return notFound();

  return (
    <Section>
      <div className="mb-6">
        <SectionTitle>Crear restaurante</SectionTitle>
      </div>
      <SectionBody>
        <RestaurantForm restaurant={restaurant} />
      </SectionBody>
    </Section>
  );
}

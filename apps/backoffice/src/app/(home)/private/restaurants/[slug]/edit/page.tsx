import { getRestaurantBySlug } from "@/actions/restaurant.actions";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import { notFound } from "next/navigation";
import RestaurantForm from "../../components/restaurant-form";

interface Props {
  readonly params: {
    slug: string;
  };
}

export default async function RestaurantPage({
  params,
}: Props): Promise<JSX.Element> {
  const restaurant = await getRestaurantBySlug(params.slug);

  if (!restaurant) return notFound();

  return (
    <Section>
      <div className="mb-6">
        <SectionTitle>Editar restaurante</SectionTitle>
      </div>
      <SectionBody>
        <RestaurantForm restaurant={restaurant} />
      </SectionBody>
    </Section>
  );
}

import { getRestaurantBySlug } from "@/actions/restaurant.actions";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import { notFound } from "next/navigation";
import React from "react";
import ReservationForm from "../components/reservation-form";

interface Props {
  readonly params: {
    slug: string;
  };
}

export default async function CreateReservationPage({
  params,
}: Props): Promise<JSX.Element> {
  const restaurant = await getRestaurantBySlug(params.slug);

  if (!restaurant) return notFound();

  return (
    <Section>
      <SectionTitle>Crear reserva</SectionTitle>
      <SectionBody>
        <ReservationForm restaurant={restaurant} />
      </SectionBody>
    </Section>
  );
}

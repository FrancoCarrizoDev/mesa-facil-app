import { getReservationById } from "@/actions/reservation.actions";
import { getRestaurantBySlug } from "@/actions/restaurant.actions";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import ReservationForm from "../components/reservation-form";

interface Props {
  readonly params: {
    id: string;
    slug: string;
  };
}

export default async function ReservationPage({ params }: Props) {
  const reservation = await getReservationById(params.id);
  const restaurant = await getRestaurantBySlug(params.slug);

  return (
    <Section>
      <SectionTitle>{`${reservation.diner.firstName} ${reservation.diner.lastName}`}</SectionTitle>
      <SectionBody>
        <ReservationForm
          restaurantData={restaurant}
          reservationData={reservation}
        />
      </SectionBody>
    </Section>
  );
}

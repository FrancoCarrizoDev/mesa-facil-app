import Link from "@/components/Link/link";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import ReservationClientPage from "./page.client";
import {
  ensureLoggedUserBelongsToRestaurant,
  getReservationList,
} from "@/actions/reservation.actions";
import getSession from "@/utils/get-session";

interface Props {
  readonly params: {
    slug: string;
  };
}

export default async function ReservationPage({ params }: Props) {
  const restaurantSlug = params.slug;
  await ensureLoggedUserBelongsToRestaurant(restaurantSlug);
  const reservationList = await getReservationList(restaurantSlug);

  return (
    <Section>
      <div className="flex justify-between items-center">
        <SectionTitle>Reservas</SectionTitle>
        <Link
          underline="hover"
          href={`/private/restaurants/${params.slug}/reservations/create`}
        >
          Crear reserva
        </Link>
      </div>
      <SectionBody>
        <ReservationClientPage reservationList={reservationList} />
      </SectionBody>
    </Section>
  );
}

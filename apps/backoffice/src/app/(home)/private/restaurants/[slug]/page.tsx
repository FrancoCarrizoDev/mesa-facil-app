import { getRestaurantBySlug } from "@/actions/restaurant.actions";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import { notFound } from "next/navigation";
import Link from "@/components/Link/link";
import { SearchReservationParams } from "./reservations/page";
import { getReservationSearchParams } from "@/utils/search-params";
import { getReservationList } from "@/actions/reservation.actions";

interface Props {
  readonly params: {
    slug: string;
  };
  readonly searchParams: SearchReservationParams;
}

export default async function RestaurantPage({
  params,
  searchParams,
}: Props): Promise<JSX.Element> {
  const restaurant = await getRestaurantBySlug(params.slug);

  const reservationSearchParams = getReservationSearchParams(searchParams);

  const restaurantList = await getReservationList(
    params.slug,
    reservationSearchParams
  );

  return (
    <Section>
      <div className="mb-6 flex justify-between">
        <SectionTitle>{restaurant.name}</SectionTitle>
        <div className="flex gap-3">
          <Link
            href={`/private/restaurants/${params.slug}/reservations/create`}
          >
            Crear reserva
          </Link>
          <Link href={`/private/restaurants/${params.slug}/reservations`}>
            Reservas
          </Link>
          <Link href={`/private/restaurants/${params.slug}/reviews`}>
            Reseñas
          </Link>
          <Link href={`/private/restaurants/${params.slug}/reviews`}>
            Cear sorteo
          </Link>
        </div>
      </div>
      <SectionBody>
        <div>
          <h4>Reservas de hoy</h4>
        </div>
      </SectionBody>
    </Section>
  );
}

import { getRestaurantBySlug } from "@/actions/restaurant.actions";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import Link from "@/components/Link/link";
import { SearchReservationParams } from "./reservations/page";
import { getReservationSearchParams } from "@/utils/search-params";
import { getReservationList } from "@/actions/reservation.actions";
import ReservationDataTable from "@/components/ReservationDataTable/reservation-data-table";

interface Props {
  readonly params: {
    slug: string;
  };
  searchParams: SearchReservationParams;
}

export default async function RestaurantPage({
  params,
  searchParams,
}: Props): Promise<JSX.Element> {
  const restaurant = await getRestaurantBySlug(params.slug);

  searchParams.date = new Date().toISOString();
  const reservationSearchParams = getReservationSearchParams(searchParams);

  console.log({ reservationSearchParams });
  const reservationList = await getReservationList(
    params.slug,
    reservationSearchParams
  );

  return (
    <Section>
      <div className="mb-6 flex justify-between">
        <SectionTitle>{`${restaurant.name} - Reservas para hoy`}</SectionTitle>
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
        <ReservationDataTable
          paginatedReservation={reservationList}
          reservationParamsProps={{
            page: Number(searchParams.page) || 1,
            pageSize: Number(searchParams.pageSize) || 10,
            status: searchParams.status,
            date: searchParams.date ? new Date(searchParams.date) : null,
            term: searchParams.term || "",
          }}
        />
      </SectionBody>
    </Section>
  );
}

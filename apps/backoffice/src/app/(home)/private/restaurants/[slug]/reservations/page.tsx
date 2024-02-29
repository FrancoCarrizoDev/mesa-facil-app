import Link from "@/components/Link/link";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import ReservationClientPage from "./page.client";
import {
  ensureLoggedUserBelongsToRestaurant,
  getReservationList,
} from "@/actions/reservation.actions";
import { Suspense } from "react";

export interface SearchReservationParams {
  readonly status: string;
  readonly date?: string;
  readonly term?: string;
}

interface Props {
  readonly params: {
    slug: string;
  };
  readonly searchParams: SearchReservationParams;
}

export default async function ReservationPage({ params, searchParams }: Props) {
  const restaurantSlug = params.slug;
  await ensureLoggedUserBelongsToRestaurant(restaurantSlug);
  const reservationList = await getReservationList(
    restaurantSlug,
    searchParams
  );

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

import Link from "@/components/Link/link";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import {
  ensureLoggedUserBelongsToRestaurant,
  getReservationList,
} from "@/actions/reservation.actions";
import ReservationDataTable from "@/components/ReservationDataTable/reservation-data-table";

export interface SearchReservationParams {
  readonly status: string;
  date?: string;
  readonly term?: string;
  readonly page: number;
  readonly pageSize: number;
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
  const reservationList = await getReservationList(restaurantSlug, {
    status: searchParams.status,
    date: searchParams.date,
    term: searchParams.term || "",
    page: Number(searchParams.page) || 1,
    pageSize: Number(searchParams.pageSize) || 10,
  });

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

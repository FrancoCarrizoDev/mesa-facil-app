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
  dateFrom: string | null;
  dateTo: string | null;
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

export default async function ReservationPage({
  params,
  searchParams,
}: Props): Promise<JSX.Element> {
  const restaurantSlug = params.slug;
  await ensureLoggedUserBelongsToRestaurant(restaurantSlug);
  console.log({
    searchParams,
  });

  const reservationList = await getReservationList(restaurantSlug, {
    status: searchParams.status,
    dateFrom: searchParams.dateFrom,
    dateTo: searchParams.dateTo,
    term: searchParams.term || "",
    page: Number(searchParams.page) || 1,
    pageSize: Number(searchParams.pageSize) || 10,
  });

  return (
    <Section>
      <div className="flex justify-between items-center">
        <SectionTitle>Reservas</SectionTitle>
        <Link
          href={`/private/restaurants/${params.slug}/reservations/create`}
          underline="hover"
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
            dateFrom: searchParams.dateFrom
              ? new Date(searchParams.dateFrom)
              : null,
            dateTo: searchParams.dateTo ? new Date(searchParams.dateTo) : null,
            term: searchParams.term || "",
          }}
        />
      </SectionBody>
    </Section>
  );
}

import { SearchReservationParams } from "src/app/(home)/private/restaurants/[slug]/reservations/page";

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;
export const DEFAULT_STATUS = "pending";

export const getReservationSearchParams = (
  searchParams: SearchReservationParams
): SearchReservationParams => {
  return {
    page: searchParams.page ?? DEFAULT_PAGE,
    pageSize: searchParams.pageSize ?? DEFAULT_PAGE_SIZE,
    status: searchParams.status ?? DEFAULT_STATUS,
    term: searchParams.term ?? "",
    date: searchParams.date ?? new Date().toISOString(),
  };
};

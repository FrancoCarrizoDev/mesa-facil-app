import { SearchReservationParams } from "src/app/(home)/private/restaurants/[slug]/reservations/page";

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;
export const DEFAULT_STATUS = "";

export const getReservationSearchParams = (
  searchParams: SearchReservationParams
): SearchReservationParams => {
  return {
    page: Number(searchParams.page) || DEFAULT_PAGE,
    pageSize: Number(searchParams.pageSize) || DEFAULT_PAGE_SIZE,
    status: searchParams.status ?? DEFAULT_STATUS,
    term: searchParams.term ?? "",
    dateFrom: searchParams.dateFrom ?? new Date().toISOString(),
    dateTo: searchParams.dateTo ?? new Date().toISOString(),
  };
};

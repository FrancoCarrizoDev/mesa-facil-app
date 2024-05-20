import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export interface ReservationParamsProps {
  status: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  term: string;
  page: number;
  pageSize: number;
}

export default function useSearchReservation(params: ReservationParamsProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<ReservationParamsProps>(params);
  const termDebounce = useDebounce(filters, 1000);
  const pathname = usePathname();

  const onChangeStatus = (status: string): void => {
    setFilters({ ...filters, status });
  };

  const onChangeDateFrom = (date: Date | null): void => {
    setFilters({ ...filters, dateFrom: date });
  };

  const onChangeDateTo = (date: Date | null): void => {
    setFilters({ ...filters, dateTo: date });
  };

  const onChangeTerm = (term: string): void => {
    setFilters({ ...filters, term });
  };

  const isDebouncing =
    termDebounce.status !== filters.status ||
    termDebounce.dateFrom !== filters.dateFrom ||
    termDebounce.term !== filters.term ||
    termDebounce.page !== filters.page ||
    termDebounce.pageSize !== filters.pageSize ||
    termDebounce.dateTo !== filters.dateTo;

  useEffect(() => {
    const query = new URLSearchParams();

    if (termDebounce.status) {
      query.set("status", termDebounce.status.toString());
    }

    if (termDebounce.dateFrom) {
      query.set("dateFrom", termDebounce.dateFrom.toISOString());
    }

    if (termDebounce.dateTo) {
      query.set("dateTo", termDebounce.dateTo.toISOString());
    }

    query.set("term", termDebounce.term.toString());

    query.set("page", termDebounce.page.toString());

    query.set("pageSize", termDebounce.pageSize.toString());

    router.push(`${pathname}?${query.toString()}`);
  }, [termDebounce]);

  return {
    filters,
    onChangeStatus,
    onChangeDateFrom,
    onChangeTerm,
    isDebouncing,
    onChangeDateTo,
  };
}

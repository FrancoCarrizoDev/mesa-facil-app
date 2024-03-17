import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export interface ReservationParamsProps {
  status: string;
  date: Date | null;
  term: string;
  page: number;
  pageSize: number;
}

export default function useSearchReservation(params: ReservationParamsProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<ReservationParamsProps>(params);
  const termDebounce = useDebounce(filters, 1000);
  const pathname = usePathname();

  const onChangeStatus = (status: string) => {
    setFilters({ ...filters, status });
  };

  const onChangeDate = (date: Date | null) => {
    setFilters({ ...filters, date });
  };

  const onChangeTerm = (term: string) => {
    setFilters({ ...filters, term });
  };

  const isDebouncing =
    termDebounce.status !== filters.status ||
    termDebounce.date !== filters.date ||
    termDebounce.term !== filters.term ||
    termDebounce.page !== filters.page ||
    termDebounce.pageSize !== filters.pageSize;
  useEffect(() => {
    const query = new URLSearchParams();

    if (termDebounce.status) {
      query.set("status", termDebounce.status.toString());
    }

    if (termDebounce.date) {
      query.set("date", termDebounce.date.toISOString());
    }

    query.set("term", termDebounce.term.toString());

    query.set("page", termDebounce.page.toString());

    query.set("pageSize", termDebounce.pageSize.toString());

    router.push(`${pathname}?${query.toString()}`);
  }, [termDebounce]);

  return {
    filters,
    onChangeStatus,
    onChangeDate,
    onChangeTerm,
    isDebouncing,
  };
}

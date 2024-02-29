import { ReservationStatusEnum } from "@/models/reservation.model";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

interface FilterProps {
  status: string;
  date: Date | null;
  term: string;
}

export default function useSearchReservation() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterProps>({
    status: "all",
    date: null,
    term: "",
  });
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
    termDebounce.term !== filters.term;

  useEffect(() => {
    const query = new URLSearchParams();

    if (termDebounce.status) {
      query.set("status", termDebounce.status.toString());
    }

    if (termDebounce.date) {
      query.set("date", termDebounce.date.toISOString());
    }

    query.set("term", termDebounce.term.toString());

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

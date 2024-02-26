import { ReservationStatusEnum } from "@/models/reservation.model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  const onChangeStatus = (status: string) => {
    setFilters({ ...filters, status });
  };

  const onChangeDate = (date: Date | null) => {
    setFilters({ ...filters, date });
  };

  const onChangeTerm = (term: string) => {
    setFilters({ ...filters, term });
  };

  console.log({ filters });

  useEffect(() => {
    const query = new URLSearchParams();

    if (filters.status) {
      query.set("status", filters.status.toString());
    }

    if (filters.date) {
      query.set("date", filters.date.toISOString());
    }

    if (filters.term) {
      query.set("term", filters.term);
    }

    // router.push(`./?${query.toString()}`);
  }, [filters]);

  return {
    filters,
    onChangeStatus,
    onChangeDate,
    onChangeTerm,
  };
}

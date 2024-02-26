"use client";

import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { getDinerByEmail as getDinerByEmailAction } from "@/actions/diner.actions";
import { DinerDTO } from "@/models/diner.model";

export default function useSearchDiner() {
  const [dinerTerm, setDinerTerm] = useState<string>("");
  const [dinerData, setDinerData] = useState<DinerDTO[]>([]);
  const dinerDebounce = useDebounce(dinerTerm, 1000);
  useEffect(() => {
    const getDinerByEmail = async () => {
      if (dinerDebounce) {
        const diner = await getDinerByEmailAction(dinerDebounce);
        setDinerData(diner);
      } else {
        setDinerData([]);
      }
    };
    getDinerByEmail();
  }, [dinerDebounce]);

  return {
    dinerTerm,
    setDinerTerm,
    dinerData,
  };
}
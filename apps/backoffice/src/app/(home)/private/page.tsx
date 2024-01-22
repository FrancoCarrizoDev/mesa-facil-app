"use client";

import { useSession } from "next-auth/react";

export default function Page(): JSX.Element {
  const { data } = useSession();

  console.log({ data });

  return <div>Private</div>;
}

"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page(): JSX.Element {
  const { data } = useSession();

  console.log({ data });
  useEffect(() => {
    // @ts-expect-error library error
    if (data?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [data]);
  return <div>Private</div>;
}

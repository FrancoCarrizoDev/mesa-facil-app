import Link from "@repo/ui/link";
import { Session } from "next-auth";
import Image from "next/image";
import React from "react";

export default function PrivateNavbar({
  session,
}: {
  session: Session;
}): JSX.Element {
  return (
    <div className="flex items-center gap-5">
      <Link color="secondary" href="/diner/reservations">
        Mis Reservas
      </Link>
      <Image
        alt="profile"
        className="rounded-full"
        height={32}
        src={session.user?.image || "/profile.png"}
        width={32}
      />
    </div>
  );
}

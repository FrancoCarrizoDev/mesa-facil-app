"use client";
import Link from "@repo/ui/link";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function PrivateNavbar({
  session,
}: {
  session: Session;
}): JSX.Element {
  return (
    <div className="flex items-center gap-5">
      <Link color="secondary" href="/">
        Inicio
      </Link>
      <Link color="secondary" href="/my-reservations">
        Mis Reservas
      </Link>
      <Image
        alt="profile"
        className="rounded-full"
        height={32}
        src={session.user?.image || "/profile.png"}
        width={32}
      />
      <button
        className="text-white text-sm font-semibold"
        onClick={() => signOut({ callbackUrl: "/" })}
        type="button"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

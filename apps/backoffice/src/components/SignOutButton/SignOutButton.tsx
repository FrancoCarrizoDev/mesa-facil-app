"use client";

import Button from "@repo/ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      size="sm"
      variant="text"
      color="tertiary"
      onClick={() =>
        signOut({
          callbackUrl: process.env.NEXT_PUBLIC_BASE_URL + "/auth/login",
        })
      }
    >
      Cerrar sessión
    </Button>
  );
}

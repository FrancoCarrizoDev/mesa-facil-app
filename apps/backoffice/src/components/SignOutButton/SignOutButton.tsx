"use client";

import Button from "@repo/ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      size="sm"
      onClick={() =>
        signOut({
          callbackUrl: "http://localhost:3000/auth/login",
        })
      }
    >
      Cerrar sessión
    </Button>
  );
}

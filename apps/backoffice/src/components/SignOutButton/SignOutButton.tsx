"use client";

import Button from "@repo/ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button size="sm" onClick={signOut}>
      Cerrar sessión
    </Button>
  );
}

"use client";
import React from "react";
import { signIn } from "next-auth/react";

interface Props {
  callbackUrl?: string;
}

export default function PageClient({ callbackUrl }: Props): JSX.Element {
  console.log({ callbackUrl });
  return (
    <div>
      Debes iniciar sesión para ver esta página <br />
      <button
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl,
          })
        }
        type="button"
      >
        Sign in
      </button>
    </div>
  );
}

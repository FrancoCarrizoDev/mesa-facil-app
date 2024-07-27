"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { type Session } from "next-auth";

export default function PageClient({ session }: { session: Session }) {
  console.log({ session });
  return (
    <div>
      {session ? (
        <>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn("google")}>Sign in</button>
        </>
      )}
    </div>
  );
}

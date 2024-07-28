"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";
import { type Session } from "next-auth";
export default function PageClient({
  session,
}: {
  session: Session;
}): JSX.Element {
  console.log({ session });
  return (
    <div>
      {session ? (
        <>
          Signed in as {session?.user?.email} <br />
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Sign out
          </button>
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

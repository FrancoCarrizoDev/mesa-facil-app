"use client";
import { type ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider as NextSessionProvider } from "next-auth/react";

export default function SessionProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null | undefined;
}) {
  return (
    <NextSessionProvider session={session}>{children}</NextSessionProvider>
  );
}

"use client";
import { type ReactNode } from "react";
import ToastifyProvider from "./toastify-provider";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function ComposeProviders({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null | undefined;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

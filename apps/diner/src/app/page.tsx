import { signIn, signOut, useSession } from "next-auth/react";
import PageClient from "./page.client";
import getSession from "@/utils/get-session";
export default async function Page(): Promise<JSX.Element> {
  const session = await getSession();

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <PageClient session={session} />
    </main>
  );
}

import { type Session, getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export default async function getSession(): Promise<Session> {
  const session = await getServerSession(authOptions);
  return session!;
}

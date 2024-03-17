import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export default function getSession(): Promise<any> {
  return getServerSession(authOptions);
}

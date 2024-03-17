import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export default function getSession() {
  return getServerSession(authOptions);
}

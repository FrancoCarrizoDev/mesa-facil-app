import { ROLES } from "@repo/common/constants";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      user_root_id?: string;
      role: keyof typeof ROLES;
    } & DefaultSession["user"];
  }
}

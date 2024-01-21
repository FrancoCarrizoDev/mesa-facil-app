import { NextAuthOptions, Session } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "database";
import { comparePasswords } from "./bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const existsUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existsUser) throw new Error("User not found");

        if (!existsUser.password) return null;

        const isValidPassword = await comparePasswords(
          credentials.password,
          existsUser.password
        );

        if (isValidPassword)
          return {
            id: existsUser.id,
            name: existsUser.first_name,
            email: existsUser.email,
          };

        throw new Error("Invalid password");
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        // @ts-expect-error id is not in the user object
        session.user.id = token.sub || "";
      }
      return session;
    },
  },
};

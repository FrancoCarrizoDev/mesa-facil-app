import { comparePasswords } from "@repo/common/bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "database";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        term: {
          label: "Email or Username",
          type: "text",
          placeholder: " Email or Username",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        console.log(credentials);
        const existsUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                email: credentials.term,
              },
              {
                username: credentials.term,
              },
            ],
          },
        });

        if (!existsUser) throw new Error("Invalid email or password");

        const isValidPassword = await comparePasswords(
          credentials.password,
          existsUser.password
        );

        if (!isValidPassword) throw new Error("Invalid password");

        return {
          id: existsUser.id,
          email: existsUser.email,
          role: existsUser.role_id,
          username: existsUser.username,
          lastLogin: existsUser.last_login,
          createdById: existsUser.created_by_id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    // 1 day
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      console.log({
        token,
        user,
      });
      return token;
      // if (user) {
      //   const userDB = await prisma.user.findUnique({
      //     where: {
      //       id: user.id,
      //     },
      //   });

      //   if (!userDB) return {};
      //   token.id = userDB.id;
      //   token.role = userDB.role_id;
      //   token.created_by_id = userDB.created_by_id;
      // }

      // return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log({
        session,
        token,
      });
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.admin_id = token.admin_id;
      }

      return session;
    },
  },
};

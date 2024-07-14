import { comparePasswords } from "@repo/common/bcrypt";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "database";
import type { NextAuthOptions } from "next-auth";

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
      async authorize(credentials): Promise<any> {
        if (!credentials) return null;
        console.log({ credentials });
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

        const lastLogin = new Date();
        prisma.user
          .update({
            where: {
              id: existsUser.id,
            },
            data: {
              last_login: lastLogin,
            },
          })
          .then((user) => {
            console.log(
              `User ${user.email} logged in at ${new Date(
                lastLogin
              ).toISOString()}`
            );
          });

        return {
          id: existsUser.id,
          email: existsUser.email,
          roleId: existsUser.role_id,
          username: existsUser.username,
          lastLogin: existsUser.last_login,
          userRootId: existsUser.user_root_id,
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
    async jwt({ user, token }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roleId = user.roleId;
        token.username = user.username;
        token.lastLogin = user.lastLogin;
        token.userRootId = user.userRootId;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.roleId = token.roleId;
        session.user.username = token.username;
        session.user.lastLogin = token.lastLogin;
        session.user.userRootId = token.userRootId;
      }
      return session;
    },
  },
};

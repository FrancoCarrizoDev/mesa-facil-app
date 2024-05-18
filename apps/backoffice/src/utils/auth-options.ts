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
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        return {
          id: user.id,
          email: user.email,
          roleId: user.roleId,
          username: user.username,
          lastLogin: user.lastLogin,
          createdById: user.createdById,
        };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log({ session, token });
      if (token) {
        return {
          user: {
            id: token.id,
            email: token.email,
            roleId: token.roleId,
            username: token.username,
            lastLogin: token.lastLogin,
            createdById: token.createdById,
          },
        };
      }
      return session;
    },
  },
};

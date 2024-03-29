import { comparePasswords } from "@repo/common/bcrypt";
import type { NextAuthOptions } from "next-auth";
import { ROLES } from "@repo/common/constants";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "database";

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

        if (existsUser.provider === "google" || !existsUser.password) {
          throw new Error(
            "El usuario se registro con Google, por favor inicie sesión con Google"
          );
        }

        if (!existsUser.active) {
          throw new Error(
            "El usuario se encuentra inactivo, por favor contacte al administrador"
          );
        }

        const isValidPassword = await comparePasswords(
          credentials.password,
          existsUser.password
        );

        if (isValidPassword)
          return {
            id: existsUser.id,
            name: existsUser.first_name,
            email: existsUser.email,
            role: existsUser.user_role,
            user_root_id: existsUser.user_root_id,
          };

        throw new Error("Invalid password");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
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
    async jwt({ token, user, account }) {
      // console.log({
      //   jwt: {
      //     token,
      //     user,
      //     account,
      //   },
      // });

      if (user) {
        const userDB = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        if (!userDB) return {};
        token.id = userDB.id;
        token.role = userDB.user_role;
        token.user_root_id = userDB.user_root_id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.user_root_id = token.user_root_id;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      // console.log({
      //   signIn: {
      //     user,
      //     account,
      //     profile,
      //   },
      // });

      if (account?.provider === "credentials") return true;

      const iprofile = profile as {
        email?: string;
        given_name?: string;
        name?: string;
        family_name?: string;
        sub?: string;
      };

      const userDB = await prisma.user.findUnique({
        where: {
          email: user.email || "",
        },
      });

      if (!userDB) {
        await prisma.user.create({
          data: {
            email: iprofile?.email || "",
            first_name: iprofile?.given_name || "",
            last_name: iprofile?.family_name || null,
            password: null,
            id: iprofile.sub!,
            provider: "google",
            user_role: ROLES.ADMIN.ID,
          },
        });
        return true;
      }

      if (userDB?.password) {
        throw new Error(
          encodeURI(
            "El usuario ya existe, pero se registro con usuario y contraseña, por favor inicie sesión con su usuario y contraseña."
          )
        );
      }

      if (!userDB.active) {
        throw new Error(
          encodeURI(
            "El usuario ya existe, pero se encuentra inactivo, por favor contacte al administrador."
          )
        );
      }

      return true;
    },
  },
};

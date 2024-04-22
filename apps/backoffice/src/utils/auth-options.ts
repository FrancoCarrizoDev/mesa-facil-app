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

        let existsUser: any = await prisma.admin.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existsUser) {
          existsUser = await prisma.user.findUnique({
            where: {
              username: credentials.email,
            },
          });
        }

        if (!existsUser) throw new Error("Invalid email or password");

        if (existsUser.provider === "google" || !existsUser.password) {
          throw new Error(
            "El usuario se registro con Google, por favor inicie sesión con Google"
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
            role: existsUser.role_id,
            admin_id: existsUser.admin_id,
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
        token.role = userDB.role_id;
        token.admin_id = userDB.admin_id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role_id;
        session.user.admin_id = token.admin_id;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      console.log({
        signIn: {
          user,
          account,
          profile,
        },
      });

      if (account?.provider === "credentials") return true;

      if (!user.email)
        throw new Error(
          "No se pudo obtener el email de Google, por favor intente de nuevo."
        );

      const iprofile = profile as {
        email?: string;
        given_name?: string;
        name?: string;
        family_name?: string;
        sub?: string;
      };

      const userDB = await prisma.admin.findUnique({
        where: {
          email: user.email || "",
        },
      });

      if (!userDB) {
        await prisma.admin.create({
          data: {
            email: iprofile?.email || "",
            first_name: iprofile?.given_name || "",
            last_name: iprofile?.family_name || null,
            password: null,
            id: iprofile.sub!,
            provider: "google",
            role_id: ROLES.ADMIN.id,
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

      await prisma.admin.update({
        where: {
          email: user.email,
        },
        data: {
          last_login: new Date(),
          // TODO refactor after
          id: iprofile.sub!,
        },
      });

      return true;
    },
  },
};

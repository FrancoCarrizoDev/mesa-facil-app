import { NextAuthOptions, Session } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "database";
import { comparePasswords } from "./bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

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
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_S || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
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
    async jwt({ token, user, account }) {
      console.log({
        jwt: {
          token,
          user,
          account,
        },
      });

      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log({
        session: {
          session,
          token,
        },
      });

      if (session.user) {
        session.user.id = token.id;
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

      return true;
    },
  },
};

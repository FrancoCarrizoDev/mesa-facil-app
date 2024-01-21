import { NextAuthOptions, Session } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "database";
import { comparePasswords } from "./bcrypt";
import { v4 as uuidv4 } from "uuid";

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
  },
  jwt: {
    maxAge: 60,
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          // @ts-expect-error id is not in the user object
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      // @ts-expect-error id is not in the user object
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
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
            id: uuidv4(),
            sub: iprofile.sub || null,
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

async function refreshAccessToken(token: any) {
  try {
    console.log("ejecting refresh token");
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_S!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    const obj = {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
    return obj;
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

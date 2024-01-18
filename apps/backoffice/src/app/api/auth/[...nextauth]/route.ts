import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "database";
import { comparePasswords } from "src/utils/bcrypt";
const authOptions = {
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
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};
console.log({ secret: process.env.NEXT_PUBLIC_SECRET });
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

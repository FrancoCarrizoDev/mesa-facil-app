"use server";

import { type Claims } from "@auth0/nextjs-auth0";
import prisma from "database";
import { v4 as uuid } from "uuid";

export async function encureExistsUser(oauthUser: Claims): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: oauthUser.email,
      },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          email: oauthUser.email,
          first_name: oauthUser.given_name ?? "",
          last_name: oauthUser.family_name ?? "",
          id: uuid(),
          sub: oauthUser.sub,
        },
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

import prisma from "database";
import { getServerSession } from "next-auth";
import { authOptions } from "src/utils/auth-options";

export async function getRestaurantsNameByUser() {
  const session = await getServerSession(authOptions);
  if (!session) return [];

  const { id } = session.user;

  const restaurants = await prisma.restaurant.findMany({
    where: {
      user_id: id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return restaurants;
}

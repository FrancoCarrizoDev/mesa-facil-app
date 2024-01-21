import prisma from "database";
import { getServerSession } from "next-auth";
import { authOptions } from "src/utils/auth-options";

// export async function getRestaurantsByUser() {
//     try {
//         const user = await getServerSession(authOptions);
//         user?.user
//       if (!user) {
//         return [];
//       }

//       const existsUser = await prisma.user.findUnique({
//         where: {
//           id: user.sub,
//         },
//       });

//       if (!existsUser) {
//         return [];
//       }

//       const restaurants = await prisma.restaurant.findMany({
//         where: {
//           userId: user.id,
//         },
//         include: {
//           attentionSchedule: true,
//         },
//       });

//       return restaurants;
//     } catch (error) {
//       console.log(error);
//     }
//   }

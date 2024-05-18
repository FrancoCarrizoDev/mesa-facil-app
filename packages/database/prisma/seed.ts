import { PrismaClient, Role, User } from "@prisma/client";

import { faker } from "@faker-js/faker";
import { uuid } from "uuidv4";

const prisma = new PrismaClient();

const ADMIN_ROLE: Role = {
  id: 1,
  name: "ADMIN",
  created_at: new Date(),
  updated_at: new Date(),
};
const MANAGER_ROLE: Role = {
  id: 2,
  name: "MANAGER",
  created_at: new Date(),
  updated_at: new Date(),
};
const EMPLOYEE_ROLE: Role = {
  id: 3,
  name: "EMPLOYEE",
  created_at: new Date(),
  updated_at: new Date(),
};

const createUser = (role_id: number): User => {
  return {
    id: uuid(),
    created_at: new Date() || 1,
    last_login: new Date(),
    role_id,
    updated_at: new Date(),
    password: "test1234",
    active: true,
    username: faker.internet.userName(),
    created_by_id: null,
    email: faker.internet.email(),
  };
};

const reservationStatus = [
  {
    id: 1,
    status: "PENDING",
  },
  {
    id: 2,
    status: "CONFIRMED",
  },
  {
    id: 3,
    status: "CANCELED",
  },
  {
    id: 4,
    status: "REJECTED",
  },
];

// export const generateRestaurants = (numberRestaurants) => {
//   const restaurants = [];
//   for (let i = 0; i < numberRestaurants; i++) {
//     const restaurantId = uuid();
//     restaurants.push({
//       id: restaurantId,
//       name: faker.company.name(),
//       slug: slugify(faker.company.name()),
//       address: faker.location.secondaryAddress(),
//       phone: faker.phone.number(),
//       attention_schedule: [
//         {
//           id: uuid(),
//           day_name: "Domingo",
//           opening_hours: "08:00",
//           ending_hours: "22:00",
//           day_number: 0,
//         },
//         {
//           id: uuid(),
//           day_name: "Lunes",
//           opening_hours: "08:00",
//           ending_hours: "22:00",
//           day_number: 1,
//         },
//         {
//           id: uuid(),
//           day_name: "Martes",
//           opening_hours: "08:00",
//           ending_hours: "22:00",
//           day_number: 2,
//         },
//         {
//           id: uuid(),
//           day_name: "Miércoles",
//           opening_hours: "08:00",
//           ending_hours: "22:00",
//           day_number: 3,
//         },
//         {
//           id: uuid(),
//           day_name: "Jueves",
//           opening_hours: "08:00",
//           ending_hours: "22:00",
//           day_number: 4,
//         },
//         {
//           id: uuid(),
//           day_name: "Viernes",
//           opening_hours: "08:00",
//           ending_hours: "22:00",
//           day_number: 5,
//         },
//         {
//           id: uuid(),
//           day_name: "Sábado",
//           opening_hours: "08:00",
//           ending_hours: "22:00",
//           day_number: 6,
//         },
//       ],
//     });
//   }
//   return restaurants;
// };

// export const generateDiners = (numberDiners) => {
//   const diners = [];
//   for (let i = 0; i < numberDiners; i++) {
//     diners.push({
//       id: uuid(),
//       first_name: faker.person.firstName(),
//       last_name: faker.person.lastName(),
//       email: faker.internet.email(),
//       phone: faker.phone.number(),
//       sub: faker.number.int({ min: 1000000, max: 9999999 }).toString(),
//       birthday: faker.date.birthdate().toISOString(),
//     });
//   }
//   return diners;
// };

// export const generateReservations = (numberReservations) => {
//   const reservations = [];
//   for (let i = 0; i < numberReservations; i++) {
//     reservations.push({
//       id: uuid(),
//       attention_schedule_id:
//         restaurants[Math.floor(Math.random() * restaurants.length)]
//           .attention_schedule[faker.number.int({ min: 0, max: 6 })].id,
//       date: faker.date.future().toISOString(),
//       diner_id: diners[Math.floor(Math.random() * diners.length)].id,
//       people_quantity: faker.number.int({ min: 1, max: 10 }),
//       message: faker.lorem.sentence(),
//       status_id:
//         reservationStatus[
//           faker.number.int({ min: 0, max: reservationStatus.length - 1 })
//         ].id,
//     });
//   }
//   return reservations;
// };

const roles = [ADMIN_ROLE, MANAGER_ROLE, EMPLOYEE_ROLE];
// const restaurants = generateRestaurants(2);
// const diners = generateDiners(400);
// const reservations = generateReservations(1000);

const load = async () => {
  try {
    await prisma.reservation.deleteMany();
    console.log("Reservations deleted data");
    await prisma.diner.deleteMany();
    console.log("Diners deleted data");
    await prisma.attentionSchedule.deleteMany();
    console.log("AttentionSchedule deleted data");
    await prisma.restaurant.deleteMany();
    console.log("Restaurant deleted data");
    await prisma.user.deleteMany();
    console.log("Users deleted data");
    await prisma.reservationStatus.deleteMany();
    console.log("Admins deleted data");
    await prisma.role.deleteMany();
    console.log("Roles deleted data");

    const rolesPromises = roles.map(async (role) => {
      await prisma.role.create({
        data: role,
      });
    });

    await Promise.all(rolesPromises);

    console.log("roles created data");

    console.log("Admin created data");

    const managerUser = createUser(MANAGER_ROLE.id);
    const employeeUser = createUser(EMPLOYEE_ROLE.id);
    const adminUser = createUser(ADMIN_ROLE.id);

    await prisma.user.createMany({
      data: [managerUser, employeeUser, adminUser].map((user) => ({
        ...user,
        password: "test1234",
      })),
    });

    console.log("Users created data");

    // const restaurantsPromises = restaurants.map(async (restaurant) => {
    //   await prisma.restaurant.create({
    //     data: {
    //       ...restaurant,
    //       attention_schedule: {
    //         createMany: {
    //           data: restaurant.attention_schedule,
    //         },
    //       },
    //     },
    //   });
    // });

    // await Promise.all(restaurantsPromises);
    // console.log("Restaurants created data");

    // const reservationStatusPromises = reservationStatus.map(async (status) => {
    //   await prisma.reservationStatus.create({
    //     data: status,
    //   });
    // });

    // await Promise.all(reservationStatusPromises);
    // console.log("ReservationStatus created data");

    // const dinersPromises = diners.map(async (diner) => {
    //   await prisma.diner.create({
    //     data: diner,
    //   });
    // });

    // await Promise.all(dinersPromises);

    // console.log("Diners created data");

    // const reservationsPromises = reservations.map(async (reservation) => {
    //   await prisma.reservation.create({
    //     data: reservation,
    //   });
    // });

    // await Promise.all(reservationsPromises);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

load();

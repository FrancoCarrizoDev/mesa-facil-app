"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var faker_1 = require("@faker-js/faker");
var uuidv4_1 = require("uuidv4");
var prisma = new client_1.PrismaClient();
var ADMIN_ROLE = {
    id: 1,
    name: "ADMIN",
    created_at: new Date(),
    updated_at: new Date(),
};
var MANAGER_ROLE = {
    id: 2,
    name: "MANAGER",
    created_at: new Date(),
    updated_at: new Date(),
};
var EMPLOYEE_ROLE = {
    id: 3,
    name: "EMPLOYEE",
    created_at: new Date(),
    updated_at: new Date(),
};
var createUser = function (role_id) {
    return {
        id: (0, uuidv4_1.uuid)(),
        created_at: new Date(),
        last_login: new Date(),
        role_id: role_id,
        updated_at: new Date(),
        password: "test1234",
        active: true,
        username: faker_1.faker.internet.userName(),
        created_by_id: null,
        email: faker_1.faker.internet.email(),
    };
};
var reservationStatus = [
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
var roles = [ADMIN_ROLE, MANAGER_ROLE, EMPLOYEE_ROLE];
// const restaurants = generateRestaurants(2);
// const diners = generateDiners(400);
// const reservations = generateReservations(1000);
var load = function () { return __awaiter(void 0, void 0, void 0, function () {
    var rolesPromises, managerUser, employeeUser, adminUser, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, 11, 13]);
                return [4 /*yield*/, prisma.reservation.deleteMany()];
            case 1:
                _a.sent();
                console.log("Reservations deleted data");
                return [4 /*yield*/, prisma.diner.deleteMany()];
            case 2:
                _a.sent();
                console.log("Diners deleted data");
                return [4 /*yield*/, prisma.attentionSchedule.deleteMany()];
            case 3:
                _a.sent();
                console.log("AttentionSchedule deleted data");
                return [4 /*yield*/, prisma.restaurant.deleteMany()];
            case 4:
                _a.sent();
                console.log("Restaurant deleted data");
                return [4 /*yield*/, prisma.user.deleteMany()];
            case 5:
                _a.sent();
                console.log("Users deleted data");
                return [4 /*yield*/, prisma.reservationStatus.deleteMany()];
            case 6:
                _a.sent();
                console.log("Admins deleted data");
                return [4 /*yield*/, prisma.role.deleteMany()];
            case 7:
                _a.sent();
                console.log("Roles deleted data");
                rolesPromises = roles.map(function (role) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma.role.create({
                                    data: role,
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(rolesPromises)];
            case 8:
                _a.sent();
                console.log("roles created data");
                console.log("Admin created data");
                managerUser = createUser(MANAGER_ROLE.id);
                employeeUser = createUser(EMPLOYEE_ROLE.id);
                adminUser = createUser(ADMIN_ROLE.id);
                return [4 /*yield*/, prisma.user.createMany({
                        data: [managerUser, employeeUser, adminUser].map(function (user) { return (__assign(__assign({}, user), { password: "test1234" })); }),
                    })];
            case 9:
                _a.sent();
                console.log("Users created data");
                return [3 /*break*/, 13];
            case 10:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 13];
            case 11: return [4 /*yield*/, prisma.$disconnect()];
            case 12:
                _a.sent();
                return [7 /*endfinally*/];
            case 13: return [2 /*return*/];
        }
    });
}); };
load();

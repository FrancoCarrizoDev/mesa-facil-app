/*
  Warnings:

  - You are about to drop the column `createdAt` on the `AttentionSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `dayName` on the `AttentionSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `dayNumber` on the `AttentionSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `endingHours` on the `AttentionSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `openingHours` on the `AttentionSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `restaurantId` on the `AttentionSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AttentionSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Diner` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Diner` table. All the data in the column will be lost.
  - You are about to drop the column `attentionScheduleId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `dinerId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `peopleQuantity` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ReservationStatus` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ReservationStatus` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `day_name` to the `AttentionSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day_number` to the `AttentionSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ending_hours` to the `AttentionSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opnenig_hours` to the `AttentionSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `AttentionSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `AttentionSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Diner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attention_schedule_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diner_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people_quantity` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ReservationStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AttentionSchedule" DROP CONSTRAINT "AttentionSchedule_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_attentionScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_dinerId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_statusId_fkey";

-- AlterTable
ALTER TABLE "AttentionSchedule" DROP COLUMN "createdAt",
DROP COLUMN "dayName",
DROP COLUMN "dayNumber",
DROP COLUMN "endingHours",
DROP COLUMN "openingHours",
DROP COLUMN "restaurantId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "day_name" TEXT NOT NULL,
ADD COLUMN     "day_number" INTEGER NOT NULL,
ADD COLUMN     "ending_hours" TEXT NOT NULL,
ADD COLUMN     "opnenig_hours" TEXT NOT NULL,
ADD COLUMN     "restaurant_id" UUID NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Diner" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "attentionScheduleId",
DROP COLUMN "createdAt",
DROP COLUMN "dinerId",
DROP COLUMN "peopleQuantity",
DROP COLUMN "statusId",
DROP COLUMN "updatedAt",
ADD COLUMN     "attention_schedule_id" UUID NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "diner_id" TEXT NOT NULL,
ADD COLUMN     "people_quantity" INTEGER NOT NULL,
ADD COLUMN     "status_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ReservationStatus" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "AttentionSchedule" ADD CONSTRAINT "AttentionSchedule_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_attention_schedule_id_fkey" FOREIGN KEY ("attention_schedule_id") REFERENCES "AttentionSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_diner_id_fkey" FOREIGN KEY ("diner_id") REFERENCES "Diner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "ReservationStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

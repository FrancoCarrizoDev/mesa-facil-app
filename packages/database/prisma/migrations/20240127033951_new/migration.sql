/*
  Warnings:

  - You are about to drop the column `userId` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_userId_fkey";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "userId",
ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "_RestaurantToUser" (
    "A" UUID NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RestaurantToUser_AB_unique" ON "_RestaurantToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RestaurantToUser_B_index" ON "_RestaurantToUser"("B");

-- AddForeignKey
ALTER TABLE "_RestaurantToUser" ADD CONSTRAINT "_RestaurantToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantToUser" ADD CONSTRAINT "_RestaurantToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

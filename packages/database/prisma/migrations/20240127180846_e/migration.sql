/*
  Warnings:

  - You are about to drop the column `userRootId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "userRootId",
ADD COLUMN     "user_root_id" TEXT;

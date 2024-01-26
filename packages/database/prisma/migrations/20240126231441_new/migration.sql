/*
  Warnings:

  - You are about to drop the column `user_role_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_role_id",
ADD COLUMN     "user_role" TEXT NOT NULL DEFAULT 'USER';

/*
  Warnings:

  - You are about to drop the column `sub` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_sub_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sub",
ADD COLUMN     "provider" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_provider_key" ON "User"("provider");
